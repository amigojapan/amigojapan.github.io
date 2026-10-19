const fs = require('fs'), vm = require('vm');
const src = fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
const ctx = {document:{getElementById:()=>({innerHTML:''})},window:{addEventListener:()=>{}},location:{search:''},Date};
vm.createContext(ctx); vm.runInContext(src,ctx);
ctx.time_from_arrival=()=>'<span data-i18n-years>approximately 24 years</span> (calculated relatively from October 2002)';
ctx.load();
fs.writeFileSync('/tmp/home-fragments.json',JSON.stringify(Object.fromEntries(Object.entries(ctx).filter(([k,v])=>typeof v==='string' && v.includes('<')))));
