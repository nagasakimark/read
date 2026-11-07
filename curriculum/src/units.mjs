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
  { id:8, stage:2, name:'sh ch th', ja:'sh ch th', groups:[['sh','ch'],['th']], tricky:[['she'],['was']] },
];
