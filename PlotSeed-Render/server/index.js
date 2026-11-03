import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { parseEnv } from 'node:util';
import { handleApi } from './api.js';

async function runtimeEnvironment() {
 try { return {...process.env,...parseEnv(await readFile('.env','utf8'))}; }
 catch(error) { if(error.code==='ENOENT')return process.env; throw error; }
}
const root = resolve('dist');
const mime = { '.html':'text/html; charset=utf-8', '.js':'application/javascript', '.css':'text/css', '.svg':'image/svg+xml' };
const server = http.createServer(async(req,res) => {
  try {
    const url = new URL(req.url,'http://127.0.0.1');
    if (url.pathname.startsWith('/api/')) {
      const chunks=[]; let size=0;
      for await (const chunk of req) { size+=chunk.length; if(size>24000){res.writeHead(413);res.end('Request too large');return;} chunks.push(chunk); }
      const response=await handleApi(new Request(url,{method:req.method,headers:req.headers,...(req.method==='GET'||req.method==='HEAD'?{}:{body:Buffer.concat(chunks)})}),await runtimeEnvironment());
      res.writeHead(response.status,Object.fromEntries(response.headers));res.end(await response.text());return;
    }
    if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);res.end();return;}
    const file = resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));
    if(!file.startsWith(root+sep)){res.writeHead(403);res.end();return;}
    try{const content=await readFile(file);res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream'});res.end(req.method==='HEAD'?undefined:content);}
    catch{res.writeHead(404);res.end('Not found');}
  }catch{res.writeHead(500);res.end('Server error');}
});
server.listen(Number(process.env.PORT||3001),process.env.HOST||'127.0.0.1',()=>console.log(`PlotSeed: http://${process.env.HOST||'127.0.0.1'}:${process.env.PORT||3001}`));
