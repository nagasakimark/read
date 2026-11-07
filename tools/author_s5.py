#!/usr/bin/env python3
"""One-off authoring aid for Stage 5 words (Units 23-31): turns plain spellings into GPC-tokenised rows and appends them to
curriculum/src/words.mjs. Row syntax: 'word|pic|ja' ; 'word=tok tok tok|pic|ja' for explicit tokens ; tier suffix '#L' loanword, '#N' name."""
import re, json, subprocess, sys, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
base = ['qu','sh','ch','th','ng','nk','ck','ff','ll','ss','zz','ee','oo','ai','oa','igh','oi','ar','or','ur','er','air','ear']
new = {25:['ay'],26:['ea','ey'],27:['oe','ie','ow'],28:['ew','ue','ir','wor'],29:['ou','oy','aw','au'],31:['ph','wh','tch','dge','kn','wr','mb']}
VOWEL_L = set('aeiou')
def multis(unit):
    ms = set(base)
    for u, l in new.items():
        if u <= unit: ms |= set(l)
    return sorted(ms, key=lambda x: -len(x))
DEFAULT = {'ea':'ea_i','ow':'ow_ou','ie':'ie','ey':'ey'}
def tok(word, unit, tail=''):
    w = word.lower(); out = []; i = 0; ms = multis(unit); full = w + tail
    while i < len(w):
        # word-final ve / dge are one GPC
        if unit >= 31 and w.startswith('ve', i) and i + 2 == len(w) and out and out[-1] and any(out[-1].startswith(v) for v in 'aeiou'):
            out.append('ve'); i += 2; continue
        for m in ms:
            if w.startswith(m, i):
                out.append(DEFAULT.get(m, m)); i += len(m); break
        else:
            c = w[i]
            if c == 'c' and unit >= 30 and i + 1 < len(full) and full[i+1] in 'eiy': c = 'c_soft'
            out.append(c); i += 1
    return out
U = {}
def add(unit, kind, rows, v=None):
    for r in rows.strip().split('\n'):
        for item in [x for x in r.split(';') if x.strip()]:
            U.setdefault(unit, []).append((item.strip(), kind, v))
def spl(unit, v, spec): add(unit, 'split', spec, v)
def opn(unit, letter, gid, spec): add(unit, 'open', spec, (letter, gid))
def reg(unit, spec): add(unit, 'reg', spec)
def sil(unit, spec):
    for w in spec.split(): U.setdefault(unit, []).append((w, 'silly', None))

# ---- Unit 23: a_e i_e
spl(23,'a',"""cake|🍰|ケーキ;make||つくる;take||とる;bake|🧁|やく;lake|🏞️|みずうみ;wake||おきる;name|📛|なまえ;game|🎮|ゲーム;came||きた;same||おなじ;tame||なれた;late||おそい
gate|🚪|もん;date|📅|ひづけ;hate||きらい;mate||なかま;plate|🍽️|さら;skate|⛸️|スケート;snake|🐍|へび;shake||ふる;grape|🍇|ぶどう;cave|🕳️|ほらあな;wave|🌊|なみ;save||すくう
safe||あんぜん;gave||あげた;made||つくった;wade||あるいてわたる;fade||きえる;shade||かげ;blame||せめる;flame|🔥|ほのお;frame|🖼️|わく;chase||おう;base|⚾|ベース;crane|🏗️|クレーン""")
spl(23,'i',"""five|5️⃣|5;nine|9️⃣|9;bike|🚲|じてんしゃ;like||すき;time|⏰|じかん;line||せん;mine||わたしの;fine||げんき;dive||もぐる;hide||かくれる;ride||のる;side||よこ;wide||ひろい
slide|🛝|すべりだい;smile|😊|えがお;kite|🪁|たこ;bite||かむ;site||ばしょ;mile||マイル;pile||やま;tile||タイル;drive|🚗|うんてんする;shine|✨|かがやく;slime||ねばねば;spine||せぼね;wife|👩|つま""")
sil(23,"zake vame gabe shane chale blape pame bive zine jibe kipe shide chime nile fipe")
# ---- Unit 24
spl(24,'o',"""home|🏠|いえ;nose|👃|はな;rose|🌹|バラ;bone|🦴|ほね;cone|🍦|コーン;hope||のぞむ;rope|🪢|ロープ;note|📝|メモ;vote||とうひょう;joke||じょうだん;woke||おきた;poke||つつく;smoke||けむり
stone|🪨|いし;stove||コンロ;drove||うんてんした;globe|🌐|ちきゅうぎ;hole|🕳️|あな;pole||ぼう;mole||もぐら;role||やく;stole||ぬすんだ;code||コード;mode||モード;robe||ローブ;those=thv+o_e+sz+e_s||あれら;hose||ホース;chose||えらんだ;lone||ひとりの""")
spl(24,'u',"""cute|🥰|かわいい;cube|🧊|さいころ;mule|🫏|ラバ;mute|🔇|ミュート;fuse||ヒューズ""")
add(24,'split',"""tube|🧪|くだ;tune|🎵|きょく;dune|🏜️|さきゅう;rule|📏|ルール;June|📅|6がつ#N;flute|🪈|フルート;prune||プルーン;rude||ぶれい""",'u_oo')
spl(24,'e',"""these=thv+e_e+sz+e_s||これら;theme|🎨|テーマ;Pete|👦|(なまえ)#N;Steve|👦|(なまえ)#N""")
sil(24,"zome vope bote shole glone zute fube yule bleme zeme speme nobe chope drote")
# ---- Unit 25 ay
reg(25,"""day|🌞|ひ;play|🎮|あそぶ;say||いう;stay||とまる;way||みち;may||かもしれない;pay||はらう;lay||おく;hay|🌾|ほしくさ;ray||ひかり;gray|🩶|はいいろ;tray||おぼん;clay|🏺|ねんど;spray||スプレー;stray||のらの;pray||いのる
playing||あそんでいる;staying||とまっている;saying||いっている;played||あそんだ;stayed||とまった;display||ひょうじ;Sunday|☀️|にちようび#N""")
sil(25,"zay vay nay shay chay blay pray gway")
# ---- Unit 26
reg(26,"""eat|🍽️|たべる;sea|🌊|うみ;tea|🍵|おちゃ;pea|🫛|えんどう;read|📖|よむ;leaf|🍃|は;beat||うつ;seat|💺|せき;meat|🥩|にく;heat||あつさ;team||チーム;beach|🏖️|ビーチ;peach|🍑|もも;teach||おしえる;each||それぞれ;bean|🫘|まめ;clean|🧹|きれいな;dream|💭|ゆめ;cream|🍦|クリーム;steam||じょうき;stream||ながれ;leap||とぶ
speak||はなす;weak||よわい;beak||くちばし;meal||しょくじ;deal||とりひき;real||ほんとうの;treat||ごちそう;cheap||やすい;sheep|🐑|ひつじ;leash||リード;seal|🦭|アザラシ;dear||だいすきな
he=h e_open||かれ;she=sh e_open||かのじょ;we=w e_open||わたしたち;me=m e_open||わたしを;be=b e_open||～です
key|🔑|かぎ;donkey|🫏|ろば;hockey|🏑|ホッケー;turkey|🦃|しちめんちょう;valley|🏞️|たに;alley||ろじ""")
sil(26,"zeap beam keat zeet peeb sheab chead jeam zey vey bley fe=f+e_open ne=n+e_open ve=v+e_open ze=z+e_open")
# ---- Unit 27
reg(27,"""snow|⛄|ゆき;grow|🌱|そだつ;show||みせる;slow|🐌|おそい;low||ひくい;row||れつ;flow||ながれ;blow|💨|ふく;glow||かがやく;throw||なげる;crow|🐦‍⬛|からす;window|🪟|まど;yellow|💛|きいろ;pillow||まくら;elbow||ひじ;rainbow|🌈|にじ;shadow||かげ;follow||ついていく;bowl|🥣|ボウル;grown||せいちょうした;blown||ふいた;shown||みせた;own||じぶんの
go=g o_open|🚶|いく;no=n o_open|🚫|いいえ;so=s o_open||とても;
toe|🦶|つまさき;foe||てき;hoe||くわ;Joe||(なまえ)#N;doe|🦌|めじか;goes=g oe sz||いく
pie|🥧|パイ;tie|👔|ネクタイ;die||しぬ;lie||うそ;tied||むすんだ;died||しんだ;lied||うそをついた;cried|😢|ないた;tried||やってみた;fried|🍳|いためた;flies=f+l+ie+sz|🪰|とぶ;cries=c+r+ie+sz||なく;tries=t+r+ie+sz||やってみる;dries=d+r+ie+sz||かわく
hi=h i_open|👋|やあ;tiger=t i_open g er|🐯|とら;spider=s p i_open d er|🕷️|くも;pilot=p i_open l o t|🧑‍✈️|パイロット""")
opn(27,'o','o_open',"""old||ふるい;cold|🥶|さむい;gold|🥇|きん;hold||もつ;told||いった;sold||うった;fold||おる;bold||たいたんな;most||いちばん;post||ゆうびん;host||しゅじん;both||りょうほう;roll|🎲|ころがる;toll||つうこうりょう;colt|🐴|こうま;bolt||ボルト""")
opn(27,'i','i_open',"""find||みつける;kind|💗|やさしい;mind||こころ;wild||やせいの;child|🧒|こども;mild||おだやかな;blind||もうもくの;grind||ひく;bind||しばる;rind||かわ""")
sil(27,"zow vowp blow=b+l+ow_ou shoe=sh+oe zo=z+o_open bo=b+o_open fro=f+r+o_open noe=n+oe joe=j+oe nie=n+ie vie=v+ie zie=z+ie zind=z+i_open+n+d chind=ch+i_open+n+d vild=v+i_open+l+d blold=b+l+o_open+l+d")
# ---- Unit 28
reg(28,"""new|🆕|あたらしい;few||すこし;grew||そだった;blew||ふいた;flew|🕊️|とんだ;chew||かむ;drew||かいた;crew||いんいん;stew|🍲|シチュー;threw||なげた;brew||いれる
blue|🟦|あお;clue|🔍|てがかり;glue|🧴|のり;true|✅|ほんとう;Sue||(なまえ)#N;due||きげん;cue||きっかけ
bird|🐦|とり;girl|👧|おんなのこ;shirt|👕|シャツ;skirt||スカート;first|🥇|さいしょ;third|🥉|さんばんめ;dirt|🟫|どろ;stir||かきまぜる;sir||さま;fir||もみのき;squirt||ふきだす;twirl||くるくる;swirl||うずまき;birth||たんじょう;birthday|🎂|たんじょうび;thirsty=th ir s t y_i||のどがかわいた
word|📝|ことば;work|💼|しごと;world|🌍|せかい;worm|🪱|みみず;worse=wor+s+e_s||もっとわるい;worst||さいあく;worth||かち""")
sil(28,"zew bew vew zue=z+ue vue=v+ue gue=g+ue dlue=d+l+ue zune=z+u_e_oo+n+e_s bule=b+u_e_oo+l+e_s jupe=j+u_e_oo+p+e_s zirt shirm zird vird chirp worb worf vork blirt")
# ---- Unit 29
reg(29,"""out||そと;house=h ou s e_s|🏠|いえ;mouse=m ou s e_s|🐭|ねずみ;loud||うるさい;cloud|☁️|くも;round||まるい;sound||おと;found||みつけた;ground||じめん;count||かぞえる;mouth|👄|くち;south||みなみ;shout||さけぶ;trout|🐟|ます;scout||ぼうけんか;proud||ほこらしい;pound||ポンド;hound|🐕|りょうけん;couch|🛋️|ソファ;pouch||ふくろ;ouch||いたい;sour|🍋|すっぱい;flour||こむぎこ
toy|🧸|おもちゃ;boy|👦|おとこのこ;joy|😄|よろこび;soy||だいず;Roy||(なまえ)#N;cowboy=c+ow_au+b+oy|🤠|カウボーイ;enjoy||たのしむ
saw|🪚|のこぎり;paw|🐾|あしあと;law|⚖️|ほうりつ;jaw||あご;raw||なまの;claw|🦞|つめ;draw|✏️|かく;straw|🥤|ストロー;crawl||はう;shawl||ショール;lawn||しばふ;yawn|🥱|あくび;dawn|🌅|よあけ;hawk|🦅|たか;drawn||かいた;brawl||けんか
haul|🚛|はこぶ;Paul||(なまえ)#N;fault||せきにん;vault|🏦|きんこ;launch|🚀|はっしゃ;haunt|👻|とりつく""")
sil(29,"zout bloud shoud voy zoy chaw zawp blaw zaul vaut zouch noup dowd")
# ---- Unit 30
reg(30,"""weather=w ea_e thv er|🌦️|てんき;feather=f ea_e thv er|🪶|はね
piece=p ie_i c_soft e_s|🧩|ひときれ
city=c_soft+i+t+y_i|🏙️|まち;cent|🪙|セント;cell||さいぼう;dance|💃|おどる;fence||フェンス;pencil|✏️|えんぴつ;circus=c_soft ir c u s|🎪|サーカス;princess||おひめさま
gym=g_soft y_i m|🏋️|たいいくかん;gem=g_soft e m|💎|ほうせき;page=p a_e g_soft e_s|📄|ページ;cage=c a_e g_soft e_s|🐦|かご;huge=h u_e g_soft e_s||おおきい;age=a_e g_soft e_s||ねんれい;stage=s t a_e g_soft e_s||ぶたい;giraffe=g_soft i r a ff e_s|🦒|キリン;large=l ar g_soft e_s||おおきい;magic=m a g_soft i c|🪄|まほう
school=s ch_k oo l|🏫|がっこう;chorus=ch_k or u s|🎶|がっしょう;echo=e ch_k o|📢|こだま;Chris=ch_k r i s|👦|(なまえ)#N;chemist=ch_k e m i s t||かがくしゃ;chrome=ch_k r o_e m e_s||クローム""")
opn(30,'ea','ea_e',"""bread|🍞|パン;head|🗣️|あたま;dead||しんだ;sweat||あせ;breath||いき;health||けんこう;wealth||ざいさん;deaf||ろう;thread|🧵|いと;spread||ひろげる;meant||いみした""")
add(30,'open',"ready=r+ea_e+d+y_i||じゅんび;heavy=h+ea_e+v+y_i||おもい",('ea','ea_e'))
opn(30,'ie','ie_i',"""field|🌾|はたけ;chief||ちょう;thief|🦹|どろぼう;brief||みじかい;shield|🛡️|たて;yield||ゆずる""")
spl(30,'i',"""ice|🧊|こおり;nice||すてき;rice|🍚|ごはん;mice||ねずみたち""")
spl(30,'a',"""face|🙂|かお;race|🏁|レース;space|🚀|うちゅう;place||ばしょ""")
sil(30,"cem cide cimp chorp cack zace cenk gep=g_soft+e+p gim=g_soft+i+m gug=g_soft+u+g zead=z+ea_e+d bead=b+ea_e+d lead=l+ea_e+d zief=z+ie_i+f nief=n+ie_i+f chib=ch_k+i+b chen=ch_k+e+n chud=ch_k+u+d")
# ---- Unit 31
reg(31,"""phone|📱|けいたい;photo|📷|しゃしん;phonics|🔤|フォニックス;dolphin|🐬|イルカ;elephant|🐘|ぞう;graph|📊|グラフ;Phil||(なまえ)#N;orphan||みなしご
which||どれ;wheel|🛞|くるま;wheat|🌾|こむぎ;whip||むち;whisper||ささやく;why=wh+y_ai||なぜ;when=wh e n||いつ
catch|🥎|つかまえる;match|🔥|マッチ;patch||つぎはぎ;hatch||かえる;latch||かけがね;scratch||ひっかく;fetch||とってくる;sketch|🖊️|スケッチ;stretch||のばす;ditch||みぞ;witch|🧙|まじょ;pitch||なげる;stitch|🪡|ぬう;switch|🔀|スイッチ;itch||かゆみ;kitchen|🍳|だいどころ;clutch||にぎる
bridge|🌉|はし;edge||はし;fudge|🍫|ファッジ;badge|🏅|バッジ;judge|👩‍⚖️|さいばんかん;ledge||だな;pledge||ちかい;hedge||かきね;wedge||くさび;ridge||みね;lodge||ロッジ;dodge||よける;budge||うごく
knee|🦵|ひざ;knit|🧶|あむ;knock|🚪|ノック;knot|🪢|むすびめ;knob||とって;knight|🛡️|きし;kneel||ひざまずく;know||しっている;knew||しっていた
wrap|🎁|つつむ;wrong||まちがい;wrist|⌚|てくび;wreck||はかい;wren|🐦|みそさざい;wrench|🔧|レンチ
lamb|🐑|こひつじ;comb=c o_open mb|🪮|くし;climb=c l i_open mb|🧗|のぼる;thumb|👍|おやゆび;crumb||パンくず;limb||てあし;bomb|💣|ばくだん;numb||しびれた;dumb||ばか
give|🎁|あげる;have||もつ;live=l i ve|❤️|すむ;olive|🫒|オリーブ""")
spl(31,'i',"""white|🤍|しろ;while||～のあいだ;write|✍️|かく;knife|🔪|ナイフ""")
spl(31,'a',"""whale|🐋|くじら""")
spl(31,'o',"""wrote||かいた""")
sil(31,"phob whop zatch vitch dlidge=d+l+i+dge knab wrep zamb kneb wrup phin whem zedge=z+e+dge zodge=z+o+dge zuve=z+u+ve shive=sh+i+ve jomb=j+o+mb nimb=n+i+mb")

JS = "import('./curriculum/src/gpcs.mjs').then(m=>console.log(JSON.stringify(m.GPCS.map(g=>[g.id,g.unit,g.g]))))"
gp = json.loads(subprocess.check_output(['node','-e',JS]))
gunit = {i:u for i,u,_ in gp}; gg = {i:g for i,_,g in gp}
src = open('curriculum/src/words.mjs').read()
existing = set(x.lower() for x in re.findall(r"^\s*\['([^']+)','", src, re.M)) | set(x.lower() for x in re.findall(r"\], \['([^']+)','", src))
tm = {'':'C','L':'L','N':'N'}
SPLIT = {'a':'a_e','i':'i_e','o':'o_e','u':'u_e','e':'e_e','u_oo':'u_e_oo'}
out=[]; seen=set(); counts={}
for unit, rows in sorted(U.items()):
    lines=[]
    for item, kind, v in rows:
        parts = item.split('|'); head = parts[0]; pic = parts[1] if len(parts) > 1 else ''; ja = parts[2] if len(parts) > 2 else ''
        tier = 'S' if kind == 'silly' else 'C'
        if ja.endswith('#N'): ja=ja[:-2]; tier='N'
        if ja.endswith('#L'): ja=ja[:-2]; tier='L'
        if ja == 'x': ja=''
        if '=' in head: word, ex = head.split('=',1); ids = ex.replace('+',' ').split()
        else:
            word = head
            if kind == 'split':
                body = word.lower()[:-1]
                ids = tok(body, unit, 'e')
                letter = {'u_oo':'u'}.get(v, v)
                idx = max(i for i,t in enumerate(ids) if t == letter)
                ids[idx] = SPLIT[v]
                if v != 'a' and ids[-1] == 's' and idx == len(ids) - 2: ids[-1] = 'sz'
                ids.append('e_s')
            elif kind == 'silly' and unit >= 23 and word.lower().endswith('e') and not word.lower().endswith('ee'):
                ids = tok(word.lower()[:-1], unit, 'e')
                idx = max(i for i,t in enumerate(ids) if t in 'aeiou')
                ids[idx] = SPLIT[ids[idx]]; ids.append('e_s')
            elif kind == 'open':
                ids = tok(word, unit); ids[ids.index(DEFAULT.get(v[0], v[0]))] = v[1]
            else:
                ids = tok(word, unit)
                if kind != 'silly' and word.lower().endswith('e') and ids[-1] == 'e' and unit >= 29: ids[-1] = 'e_s'
        for t in ids:
            assert t in gunit, (word, t)
            assert gunit[t] <= unit, (word, t, gunit[t], unit)
        letters = ''.join(gg[t] for t in ids)
        assert letters == word.lower(), (word, ids, letters)
        w = word.lower()
        if w in existing or w in seen: print('dup skipped:', word); continue
        seen.add(w)
        lines.append("['%s','%s','%s','%s',%s]" % (word, ' '.join(ids), pic, ja, tier))
        counts[unit] = counts.get(unit,0)+1
    out.append("\n  // ---- Unit %d: Stage 5" % unit)
    out.append("\n".join("  " + ", ".join(lines[i:i+3]) + "," for i in range(0, len(lines), 3)))
if '--write' in sys.argv:
    i = src.rindex("];"); src = src[:i] + "\n".join(out) + "\n" + src[i:]
    open('curriculum/src/words.mjs','w').write(src)
print(counts)
