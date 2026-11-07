#!/usr/bin/env python3
"""One-off authoring aid for Stage 6 words (Units 32-37). Row: 'spelling[~morph+parts]|pic|ja'.
 In the spelling: '.' closed syllable boundary (VC/CV), '/' open boundary (V/CV), '+' compound boundary, '_' chunk break with no syllable mark.
 Codes inside a chunk: A E I O = a_open e_open i_open o_open, @ = schwa.  'word=ids . / + ids|pic|ja' gives explicit GPC ids."""
import re, json, subprocess, sys, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); os.chdir(ROOT)
MS = sorted(['qu','sh','ch','th','ng','nk','ck','ff','ll','ss','zz','ee','oo','ai','oa','igh','oi','ar','or','ur','er','air','ear','ay','ea','ey','oe','ie','ow','ew','ue','ir','wor','ou','oy','aw','au','ph','wh','tch','dge','kn','wr','mb'], key=lambda x: -len(x))
DEFAULT = {'ea':'ea_i','ow':'ow_ou'}
SPLIT = {'a':'a_e','i':'i_e','o':'o_e','u':'u_e','e':'e_e'}
CODE = {'A':'a_open','E':'e_open','I':'i_open','O':'o_open','@':'schwa'}
MULTI_V = {'ou','ee','ea_i','oo','oa','ai','igh','oi','ar','or','ur','er','ir','air','ear','au','aw','ow_ou','ew','ue','oy','ie','ay','ey','oe','y','a_open','e_open','i_open','o_open','schwa'}
def tok(s, tail=''):
    out=[]; i=0; full=s+tail
    while i < len(s):
        if s[i] in CODE: out.append(CODE[s[i]]); i+=1; continue
        for m in MS:
            if s.startswith(m, i): out.append(DEFAULT.get(m, m)); i+=len(m); break
        else:
            c=s[i]
            if c=='c' and i+1 < len(full) and full[i+1] in 'eiy': c='c_soft'
            out.append(c); i+=1
    return out
def chunk(s):
    for end in ('tion','sion','ture'):
        if s.endswith(end):
            return (chunk(s[:-len(end)]) if len(s)>len(end) else []) + [end]
    if s.endswith('dge') and len(s)>3: return tok(s[:-3]) + ['dge']
    if s.endswith('le') and len(s)>=3 and s[-3] not in 'aeiouAEIO@y':
        return tok(s[:-2],'le')+['le']
    if s.endswith('e') and not s.endswith(('ee','ue','ie','oe')) and len(s)>=2:
        body=tok(s[:-1],'e')
        idx=[i for i,t in enumerate(body) if (len(t)==1 and t in 'aeiou') or t in MULTI_V]
        if idx and len(body[idx[-1]])==1 and body[idx[-1]] in 'aeiou':
            v=body[idx[-1]]; body[idx[-1]]=SPLIT[v]
            if body[-1]=='s' and idx[-1]!=len(body)-1 and v!='a': body[-1]='sz'
        return body+['e_s']
    t=tok(s)
    if len(t)>1 and t[-1]=='y': t[-1]='y_i'
    return t
U={}
def add(unit, spec, tag='C'):
    for item in re.split(r'[;\n]', spec):
        if item.strip(): U.setdefault(unit,[]).append((item.strip(),tag))
def sil(unit, spec):
    for w in spec.split(): U.setdefault(unit,[]).append((w,'S'))
# ---- Unit 32
add(32,"""rab.bit|🐰|うさぎ;nap.kin|🧻|ナプキン;bas.ket|🧺|かご;pic.nic|🧺|ピクニック;in.sect|🐛|こんちゅう;kit.ten|🐱|こねこ;mit.ten|🧤|ミトン;mag.net|🧲|じしゃく;rock.et|🚀|ロケット;pock.et||ポケット;jack.et|🧥|ジャケット;buck.et|🪣|バケツ;den.tist|🦷|はいしゃ;cac.tus|🌵|サボテン;tun.nel||トンネル;fin.ger|☝️|ゆび;pup.pet||にんぎょう;hap.pen||おこる;sud.den||とつぜん;un.der||～のした;af.ter||～のあと
rO/bot|🤖|ロボット;hO/tel|🏨|ホテル;O/pen|🔓|あける;tI/ger|🐯|とら;spI/der|🕷️|くも;pI/lot|🧑‍✈️|パイロット;sI/lent|🤫|しずか;frO/zen|🧊|こおった;mO/ment||しゅんかん;sO/lo||ソロ;pO/lo|👕|ポロ;bO/nus||ボーナス;tI/ny||ちいさい
cup+cake|🧁|カップケーキ;pan+cake|🥞|パンケーキ;sun+shine|☀️|ひざし;bed+room|🛏️|しんしつ;pop+corn|🍿|ポップコーン;snow+man|⛄|ゆきだるま;rain+coat|🧥|レインコート;light+house|🗼|とうだい;bed+time||ねるじかん;gold+fish|🐠|きんぎょ;mail+box|📮|ポスト;hand+bag|👜|ハンドバッグ;sand+box||すなば;air+plane|✈️|ひこうき;sea+shell|🐚|かいがら;star+fish|⭐|ヒトデ;lip+stick|💄|くちべに;hair+brush|💇|ヘアブラシ;tooth+brush=t oo th + b r u sh|🪥|はブラシ;cow+boy=c ow_au + b oy|🤠|カウボーイ
gar.den|🌳|にわ;far.mer|🧑‍🌾|のうふ;car.pet||カーペット;mar.ket|🏪|いちば;cor.ner||かど;mor.ning|🌅|あさ;for.get||わすれる;mon.ster|👹|モンスター;pep.per||こしょう;flow.er=f l ow_au . er|🌸|はな""")
# ---- Unit 33
add(33,"""ap.ple|🍎|りんご;tA/ble|🍽️|テーブル;can.dle|🕯️|ろうそく;puz.zle|🧩|パズル;bub.ble|🫧|あわ;lit.tle||ちいさい;mid.dle||まんなか;bot.tle|🍼|びん;ket.tle||やかん;pud.dle||みずたまり;gig.gle||くすくす;wig.gle||ゆれる;jun.gle|🌴|ジャングル;un.cle|👨|おじさん;pur.ple|🟣|むらさき;tur.tle|🐢|かめ;cir.cle|⭕|まる;sim.ple||かんたん;han.dle||とって;an.kle||あしくび;bun.dle||たば;nee.dle||はり;ea.gle|🦅|わし;tick.le||くすぐる;beet.le|🪲|かぶとむし;tI/tle||だいめい;crA/dle||ゆりかご;mA/ple|🍁|かえで;spar.kle|✨|きらきら;twin.kle|⭐|きらめく;wrin.kle||しわ;stum.ble||つまずく;tum.ble||ころぶ;strug.gle||もがく
@/bout||～について;sO/f@|🛋️|ソファ;b@.na.n@|🍌|バナナ;zeb.r@|🦓|しまうま;piz.z@|🍕|ピザ;pan.d@|🐼|パンダ;@/long||～にそって;@/gO||まえ;@/way||はなれて;@/live||いきている;@/sleep||ねむって;@/round||まわりに;@/cross||よこぎって;@/fraid||こわがって;@/lone||ひとりで;@/wake||おきて
pA/per|📄|かみ;bA/by|👶|あかちゃん;lA/dy|👩|レディ;crA/zy|🤪|くるった;lA/zy||なまけもの;cA/ble||ケーブル;stA/ple||ホチキスのはり""")
sil(33,"zuggle nibble dopple tazzle mimple bazzle zeb@ blim@ zat@ dub@ zAby pAzy mAtle tAdy lAbo")
# ---- Unit 34
add(34,"""box_es~box+es|📦|はこ;dish_es~dish+es|🍽️|さら;wish_es~wish+es||ねがい;bus_es~bus+es|🚌|バス;kiss_es~kiss+es|💋|キス;fox_es~fox+es|🦊|きつね;brush_es~brush+es|🖌️|ブラシ;church_es~church+es|⛪|きょうかい;match_es~match+es|🔥|マッチ;bench_es~bench+es||ベンチ
tent_s~tent+s|⛺|テント;lamp_s~lamp+s|💡|ランプ;nest_s~nest+s|🪺|す;desk_s~desk+s||つくえ;hand_s~hand+s|✋|て;ant_s~ant+s|🐜|あり
fast_er~fast+er||はやい;slow_er~slow+er||おそい;tall_er~tall+er||たかい;small_er~small+er||ちいさい;long_er~long+er||ながい;strong_er~strong+er||つよい;cOld_er~cold+er||さむい;Old_er~old+er||としうえ;dark_er~dark+er||くらい;hard_er~hard+er||かたい;loud_er~loud+er||うるさい;kInd_er~kind+er||やさしい;jump_er~jump+er||とぶひと;sing_er~sing+er|🎤|かしゅ;teach_er~teach+er|👩‍🏫|せんせい;paint_er~paint+er|🎨|がか
fast_est~fast+est||いちばんはやい;slow_est~slow+est||いちばんおそい;tall_est~tall+est||いちばんたかい;small_est~small+est||いちばんちいさい;long_est~long+est||いちばんながい;strong_est~strong+est||いちばんつよい;cOld_est~cold+est||いちばんさむい;Old_est~old+est||いちばんふるい;dark_est~dark+est||いちばんくらい;hard_est~hard+est||いちばんかたい;loud_est~loud+est||いちばんうるさい;kInd_est~kind+est||いちばんやさしい
slow_ly~slow+ly||ゆっくり;quick_ly~quick+ly||はやく;soft_ly~soft+ly||やわらかく;bad_ly~bad+ly||わるく;sad_ly~sad+ly||かなしく;glad_ly~glad+ly||よろこんで;kInd_ly~kind+ly||しんせつに;loud_ly~loud+ly||おおきなこえで;nice_ly~nice+ly||すてきに;safe_ly~safe+ly||あんぜんに;last_ly~last+ly||さいごに
help_ful~help+ful||やくにたつ;play_ful~play+ful||あそびごのき;hope_ful~hope+ful||きぼうのある;joy_ful~joy+ful||うれしい;pain_ful~pain+ful||いたい;thank_ful~thank+ful||かんしゃして;hand_ful~hand+ful||ひとにぎり;rest_ful~rest+ful||くつろげる
hope_less~hope+less||のぞみがない;help_less~help+less||むりょくな;home_less~home+less||いえのない;end_less~end+less||おわりのない;harm_less~harm+less||むがいな;pain_less~pain+less||いたくない;point_less~point+less||むいみな;rest_less~rest+less||おちつかない;sleep_less~sleep+less||ねむれない""")
# ---- Unit 35
add(35,"""un_lock~un+lock|🔓|あける;un_fair~un+fair||ふこうへい;un_fit~un+fit||ふてき;un_happy~un+happy|😢|ふしあわせ;un_kInd~un+kind||ふしんせつ;un_safe~un+safe||あぶない;un_clear~un+clear||はっきりしない;un_pack~un+pack|🧳|にもつをだす;un_tie~un+tie||ほどく;un_wrap~un+wrap|🎁|つつみをあける;un_zip~un+zip||ファスナーをあける;un_plug~un+plug|🔌|プラグをぬく;un_fOld~un+fold||ひろげる;un_true~un+true||ほんとうでない;un_well~un+well||ぐあいがわるい
rE_play~re+play|🔁|もういちどあそぶ;rE_read~re+read||よみなおす;rE_write~re+write||かきなおす;rE_fill~re+fill||つめかえる;rE_pack~re+pack||つめなおす;rE_place~re+place||とりかえる;rE_run~re+run||さいじっこう;rE_heat~re+heat||あたためなおす;rE_set~re+set||リセット;rE_start~re+start|🔄|さいかいする;rE_load~re+load||ふたたびのせる;rE_paint~re+paint||ぬりなおす;rE_tell~re+tell||いいなおす
prE_heat~pre+heat||あらかじめあたためる;prE_pay~pre+pay||まえばらい;prE_fix~pre+fix||せっとうじ;prE_set~pre+set||あらかじめセット;prE_test~pre+test||じぜんテスト;prE_game~pre+game||しあいまえ
dis_like~dis+like||きらい;dis_count~dis+count||ねびき;dis_trust~dis+trust||しんじない;dis_arm~dis+arm||ぶそうかいじょ;dis_band~dis+band||かいさんする;dis_lodge~dis+lodge||はずす""")
# ---- Unit 36
add(36,"""run_ning~run+ing|🏃|はしる;sit_ting~sit+ing||すわる;hop_ping~hop+ing|🐇|はねる;stop_ping~stop+ing|🛑|とまる;swim_ming~swim+ing|🏊|およぐ;get_ting~get+ing||える;dig_ging~dig+ing||ほる;jog_ging~jog+ing|🏃|ジョギング;hug_ging~hug+ing|🤗|だきしめる;clap_ping~clap+ing|👏|はくしゅ;plan_ning~plan+ing||けいかく;big_ger~big+er||おおきい;sad_der~sad+er||かなしい;hot_ter~hot+er||あつい;run_ner~run+er||はしるひと
mA_king~make+ing||つくる;hO_ping~hope+ing||のぞむ;rI_ding~ride+ing|🚴|のる;bA_king~bake+ing|🧁|やく;tA_king~take+ing||とる;bI_king~bike+ing|🚲|じてんしゃ;smI_ling~smile+ing|😊|えがお;hI_ding~hide+ing||かくれる;slI_ding~slide+ing|🛝|すべる;wA_ving~wave+ing|👋|てをふる;rA_cing~race+ing|🏁|きょうそう;chA_sing~chase+ing||おいかける;skA_ting~skate+ing|⛸️|スケート;shA_king~shake+ing||ふる;dI_ving~dive+ing||もぐる
happi_er~happy+er||もっとうれしい;happi_est~happy+est||いちばんうれしい;funni_er~funny+er||もっとおもしろい;funni_est~funny+est||いちばんおもしろい;dr_ied~dry+ed||かわかした;hurri_ed~hurry+ed||いそいだ;bunni_es~bunny+es|🐰|うさぎたち;puppi_es~puppy+es|🐶|こいぬたち;bAbi_es~baby+es|👶|あかちゃんたち;lAdi_es~lady+es|👩|じょせいたち""")
# ---- Unit 37
add(37,"""stA/tion|🚉|えき;nA/tion|🏳️|くに;lO/tion|🧴|ローション;mO/tion||うごき;ac.tion||こうどう;men.tion||ふれる;frac.tion||ぶんすう;vA/cA/tion|🏖️|やすみ;fic.tion||フィクション;sec.tion||くかく
vi.sion|👓|しりょく;tel.e.vi.sion|📺|テレビ;di.vi.sion|➗|わりざん
pic.ture|🖼️|え;nA/ture|🌿|しぜん;crea.ture|🦎|いきもの;cap.ture||とらえる;mix.ture||まぜたもの;tex.ture||さわりごこち;mois.ture||しめりけ;cul.ture||ぶんか;pas.ture||ぼくじょう;ges.ture||みぶり;lec.ture||こうぎ;fea.ture||とくちょう""")
sil(37,"plation dation zation vation bision zision pision zapture bicture cuzture nasture")

JS="import('./curriculum/src/gpcs.mjs').then(m=>console.log(JSON.stringify(m.GPCS.map(g=>[g.id,g.unit,g.g]))))"
gp=json.loads(subprocess.check_output(['node','-e',JS])); gunit={i:u for i,u,_ in gp}; gg={i:g for i,_,g in gp}
src=open('curriculum/src/words.mjs').read()
REPLACE={'tiger','spider','pilot','cowboy','birthday'}
if '--write' in sys.argv:
    for w in REPLACE: src=re.sub(r"\['%s','[^']*','[^']*','[^']*',[A-Z]\],? ?"%w,'',src,flags=re.I)
existing=set(x.lower() for x in re.findall(r"\['([^']+)','[a-zA-Z_ ]+','",src))
SEP={'.':'|','/':'/','+':'+'}
out=[]; seen=set(); counts={}
for unit,rows in sorted(U.items()):
    lines=[]
    for item,tag in rows:
        f=item.split('|'); head=f[0]; pic=f[1] if len(f)>1 else ''; ja=f[2] if len(f)>2 else ''
        morph=None
        if '=' in head:
            word,ex=head.split('=',1); toks=ex.split(); ids=[t for t in toks if t not in '.+/']
            row=' '.join(ex.split()).replace(' . ','|').replace(' + ','+').replace(' / ','/')
            wclean=re.sub(r'[./+_]','',word)
        else:
            word=head
            if '~' in word: word,morph=word.split('~')
            ids=[]; row=''
            for b in re.split(r'([./+_])',word):
                if b in SEP: row+=SEP[b]
                elif b=='_': row+=' '
                elif b:
                    t=chunk(b); ids+=t; row+=(' ' if row and row[-1] not in '|/+ ' else '')+' '.join(t)
            wclean=re.sub(r'[./+_]','',word)
        disp=''.join(c.lower() if c in 'AEIO' else c for c in wclean).replace('@','a')
        letters=''.join(gg[t] for t in ids)
        if letters!=disp.lower(): print('MISMATCH',word,ids,letters,disp); continue
        nat=max(gunit[t] for t in ids)
        if morph and morph.endswith('+es') and ids[-1]=='s': ids[-1]='sz'; row=row[:-1]+'sz'
        if morph and morph.endswith('_s') and False: pass
        if disp.lower()=='hands': ids[-1]='sz'; row=row[:-1]+'sz'
        uo=max(unit,nat) if unit in (32,34,35,36) else None
        if disp.lower() in existing or disp.lower() in seen: print('dup skipped',disp); continue
        seen.add(disp.lower())
        mo=morph if morph else None
        extra=''
        if uo is not None or mo: extra=','+str(uo if uo is not None else nat)
        if mo: extra+=",'%s'"%mo
        lines.append("['%s','%s','%s','%s',%s%s]"%(disp,row,pic,ja,'S' if tag=='S' else 'C',extra)); counts[unit]=counts.get(unit,0)+1
    out.append("\n  // ---- Unit %d: Stage 6"%unit)
    out.append("\n".join("  "+", ".join(lines[i:i+3])+"," for i in range(0,len(lines),3)))
if '--write' in sys.argv:
    i=src.rindex("];"); src=src[:i]+"\n".join(out)+"\n"+src[i:]; open('curriculum/src/words.mjs','w').write(src)
print(counts)
