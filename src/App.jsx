import { useEffect, useMemo, useState } from "react";

const makeWords = (unit, entries) =>
  entries.map(([en, zh]) => ({ id: `${unit}-${en}`, en, zh }));

const UNIT_WORDS = {
  U9: makeWords("u9", [
    ["group", "组；群；乐队"], ["open", "打开；开着的"], ["page", "页；页码"],
    ["painting", "绘画；油画"], ["paper", "纸；试卷；论文"], ["part", "部分；局部"],
    ["pen", "钢笔"], ["pencil", "铅笔"], ["poster", "海报；招贴画"],
    ["pupil", "小学生"], ["question", "问题；疑问"], ["read", "读；阅读"],
    ["ruler", "尺子；直尺"], ["school", "学校"], ["sentence", "句子"],
    ["sit", "坐；坐下"], ["spell", "拼写"], ["stand", "站立；直立"],
    ["story", "故事；小说"], ["talk", "谈话；交谈"], ["teach", "教；教授"],
    ["teacher", "教师；老师"], ["tell", "告诉；讲述"], ["tick", "对号；打钩"],
    ["understand", "理解；明白"], ["word", "单词；话语"], ["write", "书写；写作"],
    ["a piece / sheet of paper", "一张纸"], ["headteacher", "中小学校长"],
    ["history", "历史；历史学"], ["improve", "改进；提高"], ["instruction", "指令；说明"],
    ["international", "国际的"], ["language", "语言"], ["level", "水平；级别"],
    ["mark", "成绩；分数"], ["mathematics / maths", "数学"], ["minus", "减；减去"],
    ["physics", "物理学"], ["practice", "练习；训练（名词）"], ["practise", "练习；训练（动词）"],
    ["remember", "记得；想起"], ["repeat", "重复"], ["science", "科学；自然科学"],
    ["scissors", "剪刀"], ["sharpener", "卷笔刀"], ["student", "学生"],
    ["study", "学习；研究"], ["subject", "学科；主题"], ["success", "成功"],
    ["successful", "成功的"], ["term", "学期"], ["test", "测验"],
    ["timetable", "时间表；时刻表"], ["university", "大学"],
    ["information technology / IT", "信息技术"], ["pencil case", "文具盒"],
  ]),
  U10: makeWords("u10", [
    ["address", "地址；住址"], ["app", "应用程序；应用软件"], ["bottom", "底部"],
    ["call", "通话；打电话"], ["email", "电子邮件；发邮件"], ["Internet", "互联网"],
    ["keyboard", "键盘；电子琴"], ["website", "网站"], ["advice", "建议（名词）"],
    ["advise", "建议；劝告（动词）"], ["at", "在某处；在某时"], ["blog", "博客；网络日志"],
    ["bother", "使某人烦恼"], ["certainly", "当然；必定"], ["chat", "聊天；闲谈"],
    ["click", "点击；咔嗒声"], ["conversation", "交谈；谈话"], ["digital", "数码的；数字式的"],
    ["dot", "点；小圆点"], ["download", "下载"], ["enter", "进入；加入"],
    ["envelope", "信封"], ["equipment", "设备；装备"], ["especially", "尤其；特别"],
    ["exactly", "准确地；确切地"], ["experience", "经验；经历"], ["explore", "探索；探究"],
    ["extra", "额外的"], ["file", "文件；档案"], ["information", "信息；资料"],
    ["memory", "存储器；内存"], ["net", "网；网状物；球网"], ["online", "在线的；联网的"],
    ["password", "密码；口令"], ["photograph", "照片"], ["photography", "摄影"],
    ["printer", "打印机"], ["screen", "屏幕"], ["software", "软件"],
    ["tablet", "平板电脑；药片"], ["type", "种类；打字"], ["upload", "上传；上载"],
    ["web", "网络"], ["by post", "邮寄；以邮件方式"], ["chat room", "聊天室"],
    ["text message", "短信"], ["web page", "网页"],
  ]),
  U11: makeWords("u11", [
    ["bike", "自行车（常用口语）"], ["bounce", "使……弹起"], ["chess", "国际象棋"],
    ["club", "俱乐部"], ["hobby", "爱好"], ["holiday", "假期"],
    ["hop", "单脚跳行"], ["jump", "跳；跳跃"], ["kick", "踢；踢腿"],
    ["kite", "风筝"], ["outside", "在外面；在……之外"], ["party", "聚会"],
    ["picnic", "野餐"], ["present", "礼物"], ["sail", "乘船航行"],
    ["score", "分数"], ["skip", "蹦跳；跳绳"], ["throw", "扔"],
    ["ice skate", "冰鞋；溜冰鞋"], ["ice skating", "滑冰运动"],
    ["bicycle", "自行车（正式用词）"], ["camp", "营地；露营"], ["campsite", "露营地点；营地"],
    ["camping", "露营活动"], ["collect", "收集"], ["cycling", "骑自行车运动"],
    ["diving", "跳水；潜水运动"], ["flashlight", "手电筒（美式英语）"], ["indoor", "室内的"],
    ["indoors", "在室内"], ["inside", "在里面；在……里面"], ["invitation", "邀请"],
    ["join", "参加；加入；连接"], ["leisure", "闲暇；休闲"], ["member", "成员；会员"],
    ["outdoor", "户外的；室外的"], ["outdoors", "在户外；在室外"], ["pyramid", "金字塔"],
    ["scooter", "小型摩托车；滑板车"], ["ski", "滑雪"], ["skiing", "滑雪运动"],
    ["sledge", "雪橇；乘雪橇（英式）"], ["swing", "秋千；摆动"], ["tent", "帐篷"],
    ["torch", "手电筒；火炬（英式）"], ["wake", "醒来；弄醒"], ["get up", "起床"],
    ["out of", "在……外；不在某处"], ["wake up", "醒来；唤醒"],
  ]),
};

const UNIT_META = {
  U9: { label: "U9", subtitle: "教育 · 57项", emoji: "✏️" },
  U10: { label: "U10", subtitle: "科技 · 47项", emoji: "💻" },
  U11: { label: "U11", subtitle: "休闲 · 49项", emoji: "🪁" },
  MIX: { label: "综合", subtitle: "全部 · 153项", emoji: "⚡" },
};

const ROUND_SIZE = 8;

function seededShuffle(items, seed) {
  const list = [...items];
  let state = seed >>> 0;
  const random = () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

function getWordBank(unit) {
  return unit === "MIX" ? Object.values(UNIT_WORDS).flat() : UNIT_WORDS[unit];
}

function makeSession(unit, seed) {
  return seededShuffle(getWordBank(unit), seed);
}

export default function Home() {
  const [unit, setUnit] = useState("U9");
  const [seed, setSeed] = useState(911);
  const [sessionWords, setSessionWords] = useState(() => makeSession("U9", 911));
  const [roundIndex, setRoundIndex] = useState(0);
  const [selectedEn, setSelectedEn] = useState(null);
  const [selectedZh, setSelectedZh] = useState(null);
  const [matched, setMatched] = useState(new Set());
  const [attempts, setAttempts] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [feedback, setFeedback] = useState("idle");

  const wordBankSize = sessionWords.length;
  const totalRounds = Math.ceil(wordBankSize / ROUND_SIZE);
  const roundWords = useMemo(
    () => sessionWords.slice(roundIndex * ROUND_SIZE, (roundIndex + 1) * ROUND_SIZE),
    [sessionWords, roundIndex],
  );
  const englishCards = useMemo(() => seededShuffle(roundWords, seed + roundIndex * 101 + 31), [roundWords, seed, roundIndex]);
  const chineseCards = useMemo(() => seededShuffle(roundWords, seed + roundIndex * 101 + 79), [roundWords, seed, roundIndex]);
  const roundComplete = matched.size === roundWords.length && roundWords.length > 0;
  const sessionComplete = roundComplete && roundIndex === totalRounds - 1;
  const coveredCount = Math.min(roundIndex * ROUND_SIZE + matched.size, wordBankSize);
  const nextUnit = unit === "U9" ? "U10" : unit === "U10" ? "U11" : unit === "U11" ? "MIX" : "U9";
  const starCount = mistakes === 0 ? 3 : mistakes <= Math.ceil(wordBankSize / 20) ? 2 : 1;

  useEffect(() => {
    if (roundComplete) return;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [roundComplete, seed, roundIndex]);

  useEffect(() => {
    if (!selectedEn || !selectedZh) return;
    setAttempts((value) => value + 1);
    if (selectedEn === selectedZh) {
      setMatched((current) => new Set(current).add(selectedEn));
      setFeedback("correct");
      const timer = window.setTimeout(() => {
        setSelectedEn(null);
        setSelectedZh(null);
        setFeedback("idle");
      }, 320);
      return () => window.clearTimeout(timer);
    }
    setMistakes((value) => value + 1);
    setFeedback("wrong");
    const timer = window.setTimeout(() => {
      setSelectedEn(null);
      setSelectedZh(null);
      setFeedback("idle");
    }, 520);
    return () => window.clearTimeout(timer);
  }, [selectedEn, selectedZh]);

  const clearRound = () => {
    setSelectedEn(null);
    setSelectedZh(null);
    setMatched(new Set());
    setFeedback("idle");
  };

  const startSession = (next = unit) => {
    const nextSeed = Date.now() % 2147483647;
    setUnit(next);
    setSeed(nextSeed);
    setSessionWords(makeSession(next, nextSeed));
    setRoundIndex(0);
    setAttempts(0);
    setMistakes(0);
    setSeconds(0);
    clearRound();
  };

  const continueSession = () => {
    setRoundIndex((value) => value + 1);
    clearRound();
  };

  const formatTime = (value) => `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
  const speakWord = (word) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word.replaceAll(" / ", ", "));
    utterance.lang = "en-GB";
    utterance.rate = 0.82;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <main className="game-shell">
      <div className="background-grid" aria-hidden="true" />
      <section className="game-card" aria-label="KET单词中英文连连看">
        <header className="topbar">
          <div className="title-wrap">
            <span className="title-mark" aria-hidden="true">Aa</span>
            <div><p className="eyebrow">KET 核心词汇 · U9–U11</p><h1>中英文连连看</h1></div>
          </div>
          <button className="shuffle-button" onClick={() => startSession()} aria-label="重新开始本单元"><span aria-hidden="true">↻</span> 重新开始</button>
        </header>

        <nav className="unit-tabs" aria-label="选择练习单元">
          {Object.keys(UNIT_META).map((key) => (
            <button key={key} className={unit === key ? "unit-tab active" : "unit-tab"} onClick={() => startSession(key)} aria-pressed={unit === key}>
              <span className="unit-emoji" aria-hidden="true">{UNIT_META[key].emoji}</span>
              <span><strong>{UNIT_META[key].label}</strong><small>{UNIT_META[key].subtitle}</small></span>
            </button>
          ))}
        </nav>

        <div className="status-strip" aria-live="polite">
          <div className="progress-copy"><span className="status-label">全部进度</span><strong>{coveredCount}<span> / {wordBankSize}</span></strong></div>
          <div className="progress-track" aria-hidden="true"><div className="progress-fill" style={{ width: `${(coveredCount / wordBankSize) * 100}%` }} /></div>
          <div className="metric"><span>计时</span><strong>{formatTime(seconds)}</strong></div>
          <div className="metric"><span>失误</span><strong>{mistakes}</strong></div>
        </div>

        <div className="instruction-row">
          <p><span aria-hidden="true">☝</span> 先点英文，再点对应的中文</p>
          <span className={`feedback ${feedback}`}>{feedback === "correct" ? "配对成功！" : feedback === "wrong" ? "再想一想" : `第 ${roundIndex + 1} / ${totalRounds} 关 · 本关 ${roundWords.length} 组`}</span>
        </div>

        <section className={`match-board ${feedback === "wrong" ? "wrong" : ""}`}>
          <div className="word-column">
            <h2><span>A</span> 英文</h2>
            <div className="word-list">
              {englishCards.map((word, index) => (
                <button key={word.id} className={`word-card english ${selectedEn === word.id ? "selected" : ""} ${matched.has(word.id) ? "matched" : ""}`} onClick={() => { if (!matched.has(word.id) && feedback === "idle") { speakWord(word.en); setSelectedEn(word.id); } }} disabled={matched.has(word.id)} title="点击选择并朗读">
                  <span className="card-number">{index + 1}</span><span>{word.en}</span>{matched.has(word.id) && <span className="check" aria-label="已配对">✓</span>}
                </button>
              ))}
            </div>
          </div>
          <div className="word-column">
            <h2><span>中</span> 中文</h2>
            <div className="word-list">
              {chineseCards.map((word, index) => (
                <button key={word.id} className={`word-card chinese ${selectedZh === word.id ? "selected" : ""} ${matched.has(word.id) ? "matched" : ""}`} onClick={() => !matched.has(word.id) && feedback === "idle" && setSelectedZh(word.id)} disabled={matched.has(word.id)}>
                  <span className="card-number">{String.fromCharCode(65 + index)}</span><span>{word.zh}</span>{matched.has(word.id) && <span className="check" aria-label="已配对">✓</span>}
                </button>
              ))}
            </div>
          </div>
        </section>

        {roundComplete && (
          <div className="completion" role="dialog" aria-modal="true" aria-label={sessionComplete ? "全部词汇完成" : "本关完成"}>
            <div className="completion-card">
              <div className="trophy" aria-hidden="true">{sessionComplete ? "★" : "✓"}</div><p className="eyebrow">{sessionComplete ? "UNIT COMPLETE" : `STAGE ${roundIndex + 1} COMPLETE`}</p>
              <h2>{sessionComplete ? `${UNIT_META[unit].label} 核心词全部考完！` : `第 ${roundIndex + 1} 关完成！`}</h2>
              {sessionComplete ? (
                <div className="star-score" aria-label={`${starCount}颗星`}>
                  {[0, 1, 2].map((star) => <span key={star} className={star < starCount ? "earned" : ""}>★</span>)}
                </div>
              ) : <p className="coverage-note">已完成 <strong>{coveredCount}</strong> / {wordBankSize} 项核心词汇，继续下一关即可全部覆盖。</p>}
              <p>累计用时 <strong>{formatTime(seconds)}</strong> · 尝试 <strong>{attempts}</strong> 次 · 失误 <strong>{mistakes}</strong> 次</p>
              <div className="completion-actions">
                <button className="secondary-button" onClick={() => startSession(unit)}>重新开始本单元</button>
                {sessionComplete ? (
                  <button className="primary-button" onClick={() => startSession(nextUnit)}>继续 {UNIT_META[nextUnit].label} <span>→</span></button>
                ) : (
                  <button className="primary-button" onClick={continueSession}>进入第 {roundIndex + 2} 关 <span>→</span></button>
                )}
              </div>
            </div>
          </div>
        )}

        <footer><span>词汇来源：《一本练会 KET词汇》U9–U11</span><span>逐关覆盖全部核心词 · 不重复 · 不漏题</span></footer>
      </section>
    </main>
  );
}
