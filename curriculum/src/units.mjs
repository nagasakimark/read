// Unit spec -> lessons. Blueprint: units are 3-6 short lessons gated by MASTERY, not the calendar.
// groups: new GPCs per teach-lesson (2-3 each); tricky: new tricky words per teach-lesson.
// After the teach lessons come a consolidation lesson and (where stories exist) a story lesson.
// Units are reorderable: the order of this array is the order of introduction; the validator
// re-certifies prerequisites, words and stories after any reorder.
export const UNITS = [
  { id:0, stage:0, name:'Listening', ja:'きいてみよう', blurb:'Same or different? First sounds. Syllables.', oral:true },
  { id:1, stage:1, name:'s a m t', ja:'s a m t', groups:[['s','a'],['m','t']], tricky:[[],[]] },
  { id:2, stage:1, name:'i n p', ja:'i n p', groups:[['i','n'],['p']], tricky:[[],['i']] },
  { id:3, stage:1, name:'o d g c', ja:'o d g c', groups:[['o','d'],['g','c']], tricky:[['a'],['the']] },
  { id:4, stage:1, name:'k e u r h', ja:'k e u r h', groups:[['k','e'],['u','r'],['h']], tricky:[['to'],['no','go'],[]] },
  { id:5, stage:1, name:'b f l  ff ll ss ck', ja:'b f l  ff ll ss ck', groups:[['b','f'],['l','ll'],['ff','ss'],['ck']], tricky:[['is'],[],[],['of']] },
  { id:6, stage:1, name:'j v w x y z qu', ja:'j v w x y z qu', groups:[['j','v'],['w','x'],['y','z'],['zz','qu']], tricky:[['he','we'],['me','be'],['you'],[]] },
  { id:7, stage:1, name:'s says /z/', ja:'s が「ズ」', groups:[['sz']], tricky:[['like','do','said']] },
  { id:8, stage:2, name:'sh ch', ja:'sh ch', groups:[['sh'],['ch']], tricky:[['she'],['have']] },
  { id:9, stage:2, name:'th (two sounds)', ja:'th（2つの おと）', groups:[['th'],['thv']], tricky:[['they','are'],['was']] },
  { id:10, stage:2, name:'ng nk', ja:'ng nk', groups:[['ng'],['nk']], tricky:[['what','my'],['all']] },
  { id:11, stage:3, name:'Final clusters', ja:'おわりの ならぶ しいん', patterns:[['n d$','n t$','m p$'],['s t$','s k$'],['l k$','f t$','n ch$']], tricky:[['come'],['some'],[]] },
  { id:12, stage:3, name:'s-clusters', ja:'s ではじまる ならび', patterns:[['^s t','^s p'],['^s n','^s m'],['^s w','^s k']], tricky:[['one'],['there'],[]] },
  { id:13, stage:3, name:'l-clusters', ja:'l の ならび', patterns:[['^b l','^c l'],['^f l','^g l'],['^p l','^s l']], tricky:[['here'],['when'],[]] },
  { id:14, stage:3, name:'r-clusters', ja:'r の ならび', patterns:[['^b r','^c r'],['^d r','^f r'],['^g r','^t r','^p r']], tricky:[['out'],['little'],[]] },
  { id:15, stage:3, name:'Three-letter starts and -ing', ja:'3つの しいん と -ing', patterns:[['^s t r','^s p l'],['^s c r','^sh r','^th r'],['i ng$']], tricky:[['were'],['your'],[]] },
];
