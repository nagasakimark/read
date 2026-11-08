import { chromium } from '/home/claude/read/node_modules/playwright/index.mjs';
import { spawn } from 'child_process';
const srv = spawn('python3',['-m','http.server','8124'],{cwd:'/home/claude/read',stdio:'ignore'}); await new Promise(r=>setTimeout(r,700));
const b = await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
const p = await b.newPage({viewport:{width:1366,height:598}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('http://localhost:8124/'); await p.waitForTimeout(1500);
await p.screenshot({path:'/tmp/shots/n_boot.png'});
console.log(errs.slice(0,5));
await b.close(); srv.kill();
