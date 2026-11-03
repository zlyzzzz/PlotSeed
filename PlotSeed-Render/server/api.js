import { scenarios, questionsFor, candidates } from '../src/questions.js';
import { providerConfig, generationRequest, extractStory } from './providers.js';
import { storyParagraphs, validateLinks, markerInstructions } from '../src/story-markers.js';

export function validateBrief(input) {
  if (!input || !scenarios.some(s => s.id === input.scenario)) throw new Error('Choose a valid setting.');
  if (!['guided', 'free'].includes(input.mode)) throw new Error('Choose a valid writing mode.');
  if (input.mode === 'free') {
    if (typeof input.prompt !== 'string' || !input.prompt.trim() || input.prompt.length > 5000) throw new Error('Write between 1 and 5,000 characters.');
    return { setting: scenarios.find(s => s.id === input.scenario).name, instructions: input.prompt.trim() };
  }
  if (!input.answers || typeof input.answers !== 'object' || Array.isArray(input.answers)) throw new Error('Complete your story choices first.');
  const selections = {};
  for (const q of questionsFor(input.scenario)) {
    if (!(q.id in input.answers)) throw new Error('Complete all 20 questions or choose Skip.');
    const answer = input.answers[q.id];
    if (answer !== null && !candidates(q, input.answers).includes(answer)) throw new Error('One of your choices is no longer valid. Please review your answers.');
    selections[q.id] = answer;
  }
  return { setting: scenarios.find(s => s.id === input.scenario).name, selections };
}

const json = (data, status=200) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });
let inFlight = 0;
export async function handleApi(request, env={}) {
  const path = new URL(request.url).pathname;
  const config = providerConfig(env);
  const configured = Boolean(config.key && config.model);
  if (path === '/api/health' && request.method === 'GET') return json({ status:'ok', generationReady:configured, deploymentMode:'server' });
  if (!['/api/generate','/api/annotate'].includes(path)) return json({ error:'Not found' },404);
  if (request.method !== 'POST') return json({ error:'Method not allowed' },405);
  if (!(request.headers.get('content-type') || '').startsWith('application/json')) return json({ error:'Send JSON story choices.' },415);
  let brief,input,paragraphs;
  try {
    const raw = await request.text();
    if (raw.length > 20000) return json({ error:'Your request is too large.' },413);
    input=JSON.parse(raw);
    brief = validateBrief(input);
    if(path==='/api/annotate'){
      if(input.mode!=='guided'||typeof input.story!=='string'||!input.story.trim()||input.story.length>15000)throw new Error();
      paragraphs=storyParagraphs(input.story);
      if(paragraphs.length>100)throw new Error();
    }
  } catch { return json({ error:'Please check that your story choices are complete and valid.' },400); }
  if (!configured) return json({ error:'AI generation is not enabled yet. Your choices are saved. You can download your story brief.' },503);
  if (inFlight >= 3) return json({ error:'The story service is busy. Please try again shortly.' },429);
  inFlight++;
  try {
    const target = path==='/api/annotate' ? generationRequest(config,{selections:brief.selections,paragraphs:paragraphs.map((text,index)=>({index,text}))},markerInstructions) : generationRequest(config, brief);
    const response = await fetch(target.url, {
      method:'POST', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${config.key}` },
      body:JSON.stringify(target.body),
      signal:AbortSignal.timeout(Math.min(90000,Math.max(1000,Number(env.GENERATION_TIMEOUT_MS)||90000)))
    });
    if (!response.ok) return json({ error:[429,503].includes(response.status)?'The AI service is temporarily busy or its usage limit has been reached. Your choices are saved. Please try again later.':response.status===401?'The server API key was not accepted. The site owner needs to check the server configuration.':response.status===402?'The AI account has insufficient balance. The site owner needs to check the account.':'The AI service could not complete this request. Your choices are saved.' },response.status===503?503:502);
    const data = await response.json();
    const story = extractStory(config.provider, data);
    if (!story) return json({ error:'No story was returned. Try a different story brief.' },502);
    if(path==='/api/annotate'){
      try{return json({links:validateLinks(story,brief.selections,paragraphs.length)});}
      catch{return json({error:'Choice markers could not be read. Your story has not changed. Please try again.'},502);}
    }
    return json({ story });
  } catch { return json({ error:'The AI service timed out or could not be reached. Your choices are saved.' },504); }
  finally { inFlight--; }
}
