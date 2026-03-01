import { useState, useCallback, useEffect, useRef } from "react";
import { MOODS } from "./constants/moods";
import { WEATHER_MAP, WEATHER_KEYS } from "./constants/weather";
import { CATEGORIES } from "./constants/categories";
import { getMenusByCategory } from "./data/menus";
import BunnyFace from "./components/BunnyFace";
import "./App.css";

// 공감형 추천 이유 생성기
function buildReason(menu, selectedMoods, weatherKeys, matched) {
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // 1. 오프닝 (기분 공감)
  const moodOpeners = {
    happy: ["기분 좋은 날이구나!", "오늘 뭔가 좋은 일 있었어?", "기분 좋을 때가 제일 좋지~"],
    excited: ["오 신났네 신났어!", "오늘 뭔가 기대되는 일 있어?", "에너지 넘치는 날이네!"],
    lovely: ["설레는 거 있어?", "두근두근한 날이네~", "뭔가 좋은 일이 생길 것 같은 느낌!"],
    cozy: ["포근한 하루를 보내고 싶구나~", "오늘은 따뜻하게 보내자", "힐링이 필요한 날이야~"],
    chill: ["여유로운 하루 보내고 있구나", "이런 날이 진짜 행복한 거야", "느긋한 하루 좋지~"],
    meh: ["그냥 그런 날도 있는 거지 뭐", "특별할 것 없는 날, 근데 그게 또 편하잖아", "이런 날은 뭘 먹느냐가 하루를 바꿔!"],
    bored: ["심심해? 그럼 맛있는 걸로 기분 전환하자!", "지루한 날엔 새로운 메뉴가 답이야", "심심할 때 맛있는 거 먹으면 세상 달라져~"],
    hungry: ["배고프구나... 일단 먹자 먹어!", "배고플 때 참으면 안 돼!", "공복이 최고의 양념이래, 지금이 찬스야!"],
    snacky: ["입이 심심해? 뭔가 자꾸 씹고 싶지~", "이럴 때 뭐 하나 딱 먹어야 해", "입이 심심한 건 몸이 보내는 신호야!"],
    tired: ["피곤하구나... 오늘 하루 수고 많았어", "이런 날은 맛있는 거 먹고 충전해야 해", "지친 하루, 밥 한 끼가 보약이야"],
    sad: ["우울한 날이구나... 괜찮아 다 지나가", "기분이 안 좋을 때 맛있는 거 먹으면 좀 나아져", "슬플 때는 혼자 삭이지 말고 맛있는 거 먹자"],
    lonely: ["외로운 날이야? 그럴 때 따뜻한 한 끼가 위로가 돼", "혼자인 게 좀 쓸쓸하지... 맛있는 거 먹으면 마음이 좀 괜찮아져", "외로울 땐 위로되는 음식이 최고야"],
    angry: ["짜증나는 일 있었구나?", "화날 때는 매운 거 먹고 풀자!", "스트레스를 음식으로 풀어버리자!"],
    stressed: ["스트레스 받았구나... 그럴 때 있어", "머리 좀 식히고 맛있는 거 먹자", "이런 날은 자극적인 게 딱이야"],
    sick: ["아프구나... 무리하지 마", "몸이 안 좋을 때는 잘 먹어야 빨리 나아", "든든하게 먹고 푹 쉬어야 해"],
    drinking: ["오~ 한잔 하고 싶은 날이네!", "술 한잔에 안주 한 점, 이게 행복이지", "오늘은 가볍게 한잔 하자~"],
    healthy: ["건강 챙기는 거 좋아~!", "몸에 좋은 거 먹고 싶구나", "건강한 한 끼가 내일의 나를 만들어!"],
    diet: ["다이어트 중이구나, 대단해!", "다이어트도 맛있게 해야 지속돼", "가볍지만 맛있는 거 찾아볼게!"],
  };

  // 2. 날씨 한마디
  const weatherComments = {
    scorching: ["이 찜통더위에 살 수가 없다...", "밖에 나가면 녹을 것 같은 날이야"],
    hot: ["진짜 더운 날이네...", "더워서 입맛이 없을 수 있는데"],
    warm2: ["좀 덥긴 하지?", "약간 더운 날씨에는"],
    warm: ["따뜻한 날이네~", "날씨가 포근하니까"],
    perfect: ["날씨 진짜 좋다!", "이런 날씨엔 뭘 먹어도 맛있어"],
    cool: ["선선해서 좋은 날이야~", "이런 날씨엔 뜨끈한 게 당기지"],
    chilly: ["좀 쌀쌀하네~", "이런 날은 따뜻한 게 최고야"],
    cold: ["밖에 진짜 춥다...", "이 추위에는 뜨거운 게 필수야"],
    freezing: ["어 미친 진짜 추워!!", "얼어 죽겠는 날이네..."],
    breezy: ["바람이 살랑살랑 불어서 기분 좋다~", "산들바람 부는 날이네"],
    windy: ["바람이 진짜 짜증나게 분다...", "바람 때문에 밖에 나가기 싫을 때"],
    drizzle: ["비가 살짝 오네~", "이슬비 내리는 날이야"],
    rainy: ["비가 꽤 많이 오네", "비 오는 날 특유의 감성 있잖아~"],
    storm: ["밖에 폭우라 나가기도 싫지?", "이런 날은 집에서 맛있는 거 시켜 먹자"],
    snowy: ["눈 온다! 예쁘다~", "눈 오는 날엔 따뜻한 게 최고지"],
    cloudy: ["하늘이 좀 흐리네", "이런 날은 뭔가 든든한 게 당겨"],
  };

  // 3. 음식 연결 (왜 이 음식인지)
  const foodLinks = [];
  if (matched.includes("뜨거운") && matched.includes("국물")) {
    foodLinks.push(pick(["뜨끈한 국물 한 숟갈이면 온몸이 녹을 거야", "후후 불면서 먹는 국물, 상상만 해도 좋지 않아?", "속까지 따뜻해지는 국물이 딱 필요한 때야"]));
  } else if (matched.includes("차가운")) {
    foodLinks.push(pick(["시원하게 입안을 식혀줄 거야", "차갑게 먹으면 더위가 싹 날아가", "시원한 한 입이면 기분 전환 확실해"]));
  } else if (matched.includes("뜨거운")) {
    foodLinks.push(pick(["따끈하게 먹으면 마음까지 녹아", "뜨거운 음식이 주는 위로가 있잖아"]));
  }
  if (matched.includes("매운") || matched.includes("자극적")) {
    foodLinks.push(pick(["매콤하게 땀 흘리면서 먹으면 스트레스가 싹!", "얼얼하고 매운 그 맛, 생각만 해도 침 고이지?", "매운맛이 모든 걸 잊게 해줄 거야"]));
  }
  if (matched.includes("달콤한")) {
    foodLinks.push(pick(["달달한 게 기분을 확 올려줘", "당 충전하면 행복 호르몬이 나온다더라~"]));
  }
  if (matched.includes("바삭한")) {
    foodLinks.push(pick(["바삭바삭 씹는 소리만으로도 힐링이야", "바삭한 식감이 중독성 있잖아~"]));
  }
  if (matched.includes("든든한")) {
    foodLinks.push(pick(["든든하게 배 채우면 세상 다 가진 기분이야", "속이 꽉 차는 그 만족감!"]));
  }
  if (matched.includes("가벼운")) {
    foodLinks.push(pick(["가볍게 먹으면 몸도 마음도 가벼워져", "부담 없이 먹기 딱 좋아"]));
  }
  if (matched.includes("위로")) {
    foodLinks.push(pick(["이런 날 먹으면 위로가 되는 음식이야", "한 입 먹으면 마음이 좀 풀릴 거야"]));
  }
  if (matched.includes("고소한")) {
    foodLinks.push(pick(["고소한 향이 입안 가득 퍼질 거야~", "고소한 맛이 기분을 좋게 해줘"]));
  }

  // 4. 클로징
  const closings = [
    `${menu.name} 먹고 오늘 하루도 파이팅!`,
    `${menu.name} 한 입이면 걱정은 잠시 잊어~`,
    `오늘의 정답은 ${menu.name}이야!`,
    `${menu.name}, 후회 안 할 선택이야!`,
    `${menu.name} 먹으면 기분 200% 업될 거야!`,
    `지아의 오늘 한 끼, ${menu.name}으로 결정!`,
  ];

  // 조합
  const parts = [];

  // 기분 오프닝
  if (selectedMoods.length > 0) {
    const firstMood = selectedMoods[0];
    const openers = moodOpeners[firstMood.id] || ["오늘 하루 어때?"];
    parts.push("지아야, " + pick(openers));
  } else {
    parts.push("지아야!");
  }

  // 날씨 한마디
  if (weatherKeys.length > 0) {
    const comments = weatherComments[weatherKeys[0]] || [];
    if (comments.length > 0) parts.push(pick(comments));
  }

  // 음식 연결 (최대 2개)
  if (foodLinks.length > 0) {
    parts.push(foodLinks.slice(0, 2).join(" "));
  }

  // 메뉴 설명
  if (menu.desc) {
    parts.push(`\n${menu.emoji} ${menu.name} — ${menu.desc}`);
  }

  // 클로징
  parts.push(pick(closings));

  return parts.join("\n");
}

function App() {
  const [step, setStep] = useState(0);
  const [weatherKeys, setWeatherKeys] = useState([]);
  const [moodIds, setMoodIds] = useState([]);
  const [category, setCategory] = useState(null);
  const [result, setResult] = useState(null);
  const [reason, setReason] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  // 이미 뽑힌 메뉴 ID 기록 (중복 방지)
  const pickedIds = useRef(new Set());

  // 날씨 토글 (다중 선택)
  const toggleWeather = (key) => {
    setWeatherKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  // 기분 토글 (다중 선택)
  const toggleMood = (id) => {
    setMoodIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // 매칭 점수 기반 메뉴 뽑기 (중복 방지)
  const pickMenu = useCallback(() => {
    const catName = category || "전체";
    let filteredMenus = getMenusByCategory(catName);

    // 이미 뽑힌 메뉴 제외
    let available = filteredMenus.filter((m) => !pickedIds.current.has(m.id));
    // 다 뽑았으면 히스토리 초기화
    if (available.length === 0) {
      pickedIds.current.clear();
      available = filteredMenus;
    }

    if (available.length === 0) return;

    setIsSpinning(true);

    // 선택한 모든 날씨/기분의 태그 합산
    const matchTags = [];
    const selectedMoods = MOODS.filter((m) => moodIds.includes(m.id));
    selectedMoods.forEach((m) => matchTags.push(...m.matchTags));
    weatherKeys.forEach((wk) => {
      if (WEATHER_MAP[wk]) matchTags.push(...WEATHER_MAP[wk].matchTags);
    });

    const scored = available.map((menu) => {
      const score = matchTags.length === 0 ? 0 : matchTags.filter((t) => menu.tags.includes(t)).length;
      return { menu, score };
    });

    const weighted = scored.map((s) => ({
      ...s,
      weight: matchTags.length === 0 ? 1 : Math.max(1, s.score * 3),
    }));

    const totalWeight = weighted.reduce((sum, w) => sum + w.weight, 0);
    let rand = Math.random() * totalWeight;
    let finalMenu = weighted[weighted.length - 1].menu;
    for (const item of weighted) {
      rand -= item.weight;
      if (rand <= 0) { finalMenu = item.menu; break; }
    }

    // 뽑힌 메뉴 기록
    pickedIds.current.add(finalMenu.id);

    // 추천 이유
    const uniqueTags = [...new Set(matchTags)];
    const matched = finalMenu.tags.filter((t) => uniqueTags.includes(t));

    const reasonText = buildReason(finalMenu, selectedMoods, weatherKeys, matched);

    // 스핀 애니메이션 후 결과
    let count = 0;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * filteredMenus.length);
      setResult(filteredMenus[randomIdx]);
      count++;
      if (count >= 12) {
        clearInterval(interval);
        setResult(finalMenu);
        setReason(reasonText);
        setIsSpinning(false);
      }
    }, 80);
  }, [weatherKeys, moodIds, category]);

  // 스텝 3 진입 시 자동 뽑기
  useEffect(() => {
    if (step === 3) pickMenu();
  }, [step, pickMenu]);

  const reset = () => {
    setStep(0);
    setWeatherKeys([]);
    setMoodIds([]);
    setCategory(null);
    setResult(null);
    setReason(null);
  };

  const rePick = () => {
    setResult(null);
    setReason(null);
    pickMenu();
  };

  // 선택 요약 텍스트
  const selectedWeatherLabels = weatherKeys.map((k) => WEATHER_MAP[k]?.label).filter(Boolean);
  const selectedMoodLabels = moodIds.map((id) => MOODS.find((m) => m.id === id)?.label).filter(Boolean);

  return (
    <div className="phone-frame">
      <div className="app">
        {/* 상단 진행 표시 */}
        <div className="step-bar">
          {[0, 1, 2, 3].map((s) => (
            <div key={s} className={`step-dot ${step >= s ? "active" : ""} ${step === s ? "current" : ""}`} />
          ))}
        </div>

        {/* Step 0: 날씨 (다중 선택) */}
        {step === 0 && (
          <div className="step-screen">
            <div className="step-header">
              <h1 className="step-title">지아야, 밖에 날씨 어때?</h1>
              <p className="step-subtitle">여러 개 골라도 돼!</p>
            </div>
            <div className="option-grid cols-2 weather-grid">
              {WEATHER_KEYS.map((key) => (
                <button
                  key={key}
                  className={`option-card ${weatherKeys.includes(key) ? "selected" : ""}`}
                  onClick={() => toggleWeather(key)}
                >
                  <span className="option-label">{WEATHER_MAP[key].label}</span>
                </button>
              ))}
            </div>
            {weatherKeys.length > 0 && (
              <button className="next-button" onClick={() => setStep(1)}>
                다음으로 ({weatherKeys.length}개 선택)
              </button>
            )}
          </div>
        )}

        {/* Step 1: 기분 (다중 선택 + 키티 얼굴) */}
        {step === 1 && (
          <div className="step-screen">
            <div className="step-header">
              <h1 className="step-title">지아야, 지금 기분은?</h1>
              <p className="step-subtitle">솔직하게! 여러 개 골라도 돼</p>
            </div>
            <div className="option-grid cols-3 mood-grid">
              {MOODS.map((m) => (
                <button
                  key={m.id}
                  className={`option-card ${moodIds.includes(m.id) ? "selected" : ""}`}
                  onClick={() => toggleMood(m.id)}
                >
                  <span className="option-kitty">
                    <BunnyFace expression={m.kittyEyes} size={32} />
                  </span>
                  <span className="option-label">{m.label}</span>
                </button>
              ))}
            </div>
            {moodIds.length > 0 && (
              <button className="next-button" onClick={() => setStep(2)}>
                다음으로 ({moodIds.length}개 선택)
              </button>
            )}
          </div>
        )}

        {/* Step 2: 카테고리 */}
        {step === 2 && (
          <div className="step-screen">
            <div className="step-header">
              <h1 className="step-title">지아야, 뭐 먹을래?</h1>
              <p className="step-subtitle">
                {selectedWeatherLabels.join(" ")} + {selectedMoodLabels.join(" ")}
              </p>
            </div>
            <div className="option-grid cols-2 category-grid">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`option-card ${category === cat.name ? "selected" : ""}`}
                  onClick={() => { setCategory(cat.name); setTimeout(() => setStep(3), 200); }}
                >
                  <span className="option-label">{cat.name}</span>
                  <span className="option-count">
                    {getMenusByCategory(cat.name).length}개
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: 결과 */}
        {step === 3 && (
          <div className="step-screen result-screen">
            {isSpinning || !result ? (
              <div className="spinning-area">
                <div className="spin-circle">
                  <span className="spin-emoji">{result?.emoji || "?"}</span>
                </div>
                <p className="spinning-text">지아한테 딱 맞는 메뉴 찾는 중...</p>
              </div>
            ) : (
              <div className="result-area">
                <p className="result-for">지아한테 추천!</p>
                <div className="result-context">
                  {selectedWeatherLabels.map((l, i) => (
                    <span key={`w${i}`}>{l}</span>
                  ))}
                  {selectedMoodLabels.map((l, i) => (
                    <span key={`m${i}`}>{l}</span>
                  ))}
                  <span>{category}</span>
                </div>
                <div className="result-circle">
                  <span className="result-emoji">{result.emoji}</span>
                </div>
                <h2 className="result-name">{result.name}</h2>
                <span className="result-category">{result.category}</span>
                {reason && (
                  <p className="result-reason">{reason}</p>
                )}
                <div className="result-actions">
                  <button className="action-button retry" onClick={rePick}>
                    다시 뽑기
                  </button>
                  <button className="action-button restart" onClick={reset}>
                    처음부터
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
