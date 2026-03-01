import { useState, useCallback } from "react";
import { getMenusByCategory } from "../data/menus";
import { MOODS } from "../constants/moods";
import { WEATHER_MAP } from "../constants/weather";

// 매칭된 태그를 자연스러운 형용사 표현으로 변환
function buildTagPhrase(matched) {
  const phrases = [];

  // 뜨거운+국물 조합 우선 처리
  if (matched.includes("뜨거운") && matched.includes("국물")) {
    phrases.push("뜨끈한 국물");
  } else if (matched.includes("차가운")) {
    phrases.push("시원한");
  } else if (matched.includes("뜨거운")) {
    phrases.push("따끈한");
  }

  if (matched.includes("매운") || matched.includes("자극적")) phrases.push("매콤한");
  if (matched.includes("달콤한")) phrases.push("달달한");
  if (matched.includes("바삭한")) phrases.push("바삭한");
  if (matched.includes("고소한")) phrases.push("고소한");
  if (matched.includes("담백한")) phrases.push("담백한");
  if (matched.includes("새콤한")) phrases.push("새콤한");
  if (matched.includes("쫄깃한")) phrases.push("쫄깃한");
  if (matched.includes("든든한")) phrases.push("든든한");
  if (matched.includes("가벼운")) phrases.push("가벼운");
  if (matched.includes("건강한") || matched.includes("영양")) phrases.push("건강한");
  if (matched.includes("안주")) phrases.push("안주로 딱인");
  if (matched.includes("간식")) phrases.push("간식으로 좋은");
  if (matched.includes("위로")) phrases.push("위로가 되는");

  return phrases.slice(0, 3).join(" ");
}

// 추천 이유 엔딩 문구 (랜덤)
const ENDINGS = [
  "어때요?",
  "딱이에요!",
  "추천해요!",
  "어떨까요?",
  "생각나지 않아요?",
  "한 번 어때요?",
];

function randomEnding() {
  return ENDINGS[Math.floor(Math.random() * ENDINGS.length)];
}

// 추천 이유 자연스러운 문장 생성
function buildMatchReason(menu, matchTags, selectedMood, weatherKey) {
  const mood = MOODS.find((m) => m.id === selectedMood);
  const weather = weatherKey ? WEATHER_MAP[weatherKey] : null;
  const matched = menu.tags.filter((t) => matchTags.includes(t));

  if (matched.length === 0 && !mood && !weather) return null;
  if (matched.length === 0) return `오늘은 색다르게! ${menu.name} 깜짝 추천~`;

  const tagPhrase = buildTagPhrase(matched);
  const ending = randomEnding();

  // 기분 + 날씨 둘 다 있을 때
  if (mood && weather) {
    return `${mood.desc} ${weather.desc.replace("엔", "")}까지 하면... ${tagPhrase} ${menu.name} ${ending}`;
  }

  // 기분만 있을 때
  if (mood) {
    return `${mood.desc} ${tagPhrase} ${menu.name} ${ending}`;
  }

  // 날씨만 있을 때
  if (weather) {
    return `${weather.desc} ${tagPhrase} ${menu.name} ${ending}`;
  }

  return `${tagPhrase} ${menu.name}, 오늘 ${ending}`;
}

// 메뉴 선택 로직을 담당하는 커스텀 훅
export const useMenuPicker = (weatherKey) => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedMood, setSelectedMood] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [matchReason, setMatchReason] = useState(null);

  // 카테고리 변경
  const changeCategory = useCallback((categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedMenu(null);
    setMatchReason(null);
  }, []);

  // 기분 변경 (같은 기분 다시 누르면 해제)
  const changeMood = useCallback((moodId) => {
    setSelectedMood((prev) => (prev === moodId ? null : moodId));
    setSelectedMenu(null);
    setMatchReason(null);
  }, []);

  // 랜덤 메뉴 선택 (기분 + 날씨 기반 가중 추천)
  const pickRandomMenu = useCallback(() => {
    const filteredMenus = getMenusByCategory(selectedCategory);
    if (filteredMenus.length === 0) return;

    setIsSpinning(true);

    // 매칭 태그 수집
    const matchTags = [];
    const mood = MOODS.find((m) => m.id === selectedMood);
    if (mood) matchTags.push(...mood.matchTags);
    if (weatherKey && WEATHER_MAP[weatherKey]) {
      matchTags.push(...WEATHER_MAP[weatherKey].matchTags);
    }

    // 메뉴별 매칭 점수 계산
    const scored = filteredMenus.map((menu) => {
      const score =
        matchTags.length === 0
          ? 0
          : menu.tags.filter((t) => matchTags.includes(t)).length;
      return { menu, score };
    });

    // 가중 랜덤 선택 (점수 0인 메뉴도 최소 가중치 1)
    const weighted = scored.map((s) => ({
      ...s,
      weight: matchTags.length === 0 ? 1 : Math.max(1, s.score * 3),
    }));

    const totalWeight = weighted.reduce((sum, w) => sum + w.weight, 0);
    let random = Math.random() * totalWeight;
    let finalMenu = weighted[weighted.length - 1].menu;
    for (const item of weighted) {
      random -= item.weight;
      if (random <= 0) {
        finalMenu = item.menu;
        break;
      }
    }

    // 스핀 애니메이션
    let count = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * filteredMenus.length);
      setSelectedMenu(filteredMenus[randomIndex]);
      count++;

      if (count >= 10) {
        clearInterval(interval);
        setSelectedMenu(finalMenu);
        setMatchReason(
          buildMatchReason(finalMenu, matchTags, selectedMood, weatherKey)
        );
        setIsSpinning(false);
      }
    }, 100);
  }, [selectedCategory, selectedMood, weatherKey]);

  // 선택 초기화
  const resetSelection = useCallback(() => {
    setSelectedMenu(null);
    setMatchReason(null);
  }, []);

  // 현재 카테고리의 메뉴 개수
  const menuCount = getMenusByCategory(selectedCategory).length;

  return {
    selectedMenu,
    selectedCategory,
    selectedMood,
    isSpinning,
    menuCount,
    matchReason,
    changeCategory,
    changeMood,
    pickRandomMenu,
    resetSelection,
  };
};
