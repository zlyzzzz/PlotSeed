import test from 'node:test';
import assert from 'node:assert/strict';
import { scenarios, questionsFor, candidates, drawThree, createDraft, setAnswer } from '../src/questions.js';
import { validateBrief, handleApi } from '../server/api.js';

test('three settings each expose 20 questions and eight distinct candidates',()=>{
 for(const s of scenarios){const qs=questionsFor(s.id);assert.equal(qs.length,20);assert.equal(new Set(qs.map(q=>q.id)).size,20);for(const q of qs){assert.equal(q.options.length,8);assert.equal(new Set(q.options).size,8);}}
});
test('random draws are distinct and come only from the pool',()=>{
 const pool=questionsFor('park')[0].options;const draws=new Set();
 for(let n=0;n<200;n++){const draw=drawThree(pool);assert.equal(new Set(draw).size,3);assert.ok(draw.every(x=>pool.includes(x)));draws.add(draw.join('|'));}
 assert.ok(draws.size>5);
});
test('changing supporting character invalidates relationship and preserves other answers',()=>{
 let d=createDraft('park');d.answers={supporting:'old',relationship:'old relation',goal:'goal'};d.shown={relationship:['old'],goal:['goal']};
 d=setAnswer(d,'supporting','new');assert.equal(d.answers.relationship,undefined);assert.equal(d.shown.relationship,undefined);assert.equal(d.answers.goal,'goal');
});
test('strangers and old friends receive compatible relationship options',()=>{
 const qs=questionsFor('park'),q=qs[5];
 const stranger=candidates(q,{supporting:qs[4].options[1]});assert.equal(stranger.length,4);assert.ok(!stranger.includes(q.options[2]));
 const friend=candidates(q,{supporting:qs[4].options[0]});assert.ok(!friend.includes(q.options[1]));
});
test('backend accepts skips and rejects missing, invented, and incompatible answers',()=>{
 const answers=Object.fromEntries(questionsFor('park').map(q=>[q.id,null]));
 assert.ok(validateBrief({scenario:'park',mode:'guided',answers}));
 assert.throws(()=>validateBrief({scenario:'park',mode:'guided',answers:{}}));
 assert.throws(()=>validateBrief({scenario:'park',mode:'guided',answers:{...answers,goal:'invented'}}));
 const qs=questionsFor('park');assert.throws(()=>validateBrief({scenario:'park',mode:'guided',answers:{...answers,supporting:qs[4].options[1],relationship:qs[5].options[2]}}));
 assert.throws(()=>validateBrief({scenario:'park',mode:'free',prompt:''}));
});
test('unconfigured service honestly reports unavailable generation',async()=>{
 const health=await handleApi(new Request('http://local/api/health'));assert.equal((await health.json()).generationReady,false);
 const answers=Object.fromEntries(questionsFor('park').map(q=>[q.id,null]));
 const response=await handleApi(new Request('http://local/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({scenario:'park',mode:'guided',answers})}));
 assert.equal(response.status,503);
});

test('upstream busy response is reported honestly without losing the saved brief',async()=>{
 const original=globalThis.fetch;
 globalThis.fetch=async()=>new Response('{}',{status:503});
 try{
  const response=await handleApi(new Request('https://local/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({scenario:'park',mode:'free',prompt:'A hopeful story.'})}),{LLM_PROVIDER:'deepseek',DEEPSEEK_API_KEY:'test-only'});
  assert.equal(response.status,503);
  assert.match((await response.json()).error,/temporarily busy/);
 }finally{globalThis.fetch=original;}
});
