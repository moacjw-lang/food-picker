// 날씨 상수 (16종 - 2×8 그리드 꽉 채움)

export const WEATHER_MAP = {
  scorching:  { label: "찜통더위 🔥",   matchTags: ["차가운", "가벼운", "새콤한"],           desc: "찜통더위엔" },
  hot:        { label: "진짜 더워 ☀️",   matchTags: ["차가운", "가벼운", "새콤한"],           desc: "더운 날엔" },
  warm2:      { label: "좀 더워 🌡️",    matchTags: ["차가운", "가벼운", "상온"],             desc: "좀 더운 날엔" },
  warm:       { label: "따뜻해 🌤️",     matchTags: ["상온", "가벼운", "담백한"],             desc: "따뜻한 날엔" },
  perfect:    { label: "딱 좋아 😊",     matchTags: ["상온", "가벼운", "건강한"],             desc: "날씨 좋은 날엔" },
  cool:       { label: "선선해 🍂",      matchTags: ["든든한", "고소한", "면"],               desc: "선선한 날엔" },
  chilly:     { label: "쌀쌀해 🧥",      matchTags: ["뜨거운", "든든한", "고소한"],           desc: "쌀쌀한 날엔" },
  cold:       { label: "추워 🥶",        matchTags: ["뜨거운", "국물", "든든한"],             desc: "추운 날엔" },
  freezing:   { label: "얼어죽겠어 ⛄",  matchTags: ["뜨거운", "국물", "매운", "든든한", "위로"], desc: "얼어붙는 날엔" },
  breezy:     { label: "바람 솔솔 🍃",   matchTags: ["상온", "가벼운", "담백한"],             desc: "바람 솔솔 불면" },
  windy:      { label: "바람 짜증 💨",   matchTags: ["뜨거운", "국물", "든든한"],             desc: "바람 짜증날 땐" },
  drizzle:    { label: "비 살짝 🌦️",    matchTags: ["뜨거운", "국물", "바삭한"],             desc: "비 살짝 올 땐" },
  rainy:      { label: "비 많이 🌧️",    matchTags: ["뜨거운", "국물", "바삭한", "위로"],     desc: "비 많이 오면" },
  storm:      { label: "폭우 ⛈️",       matchTags: ["뜨거운", "국물", "든든한", "위로"],     desc: "폭우 치면" },
  snowy:      { label: "눈 와 ❄️",      matchTags: ["뜨거운", "국물", "든든한", "위로"],     desc: "눈 오는 날엔" },
  cloudy:     { label: "흐려 🌥️",       matchTags: ["뜨거운", "든든한", "위로"],             desc: "흐린 날엔" },
};

export const WEATHER_KEYS = Object.keys(WEATHER_MAP);

export function mapToWeatherKey(tempCelsius, weatherId) {
  if (weatherId >= 600 && weatherId < 700) return "snowy";
  if (weatherId >= 500 && weatherId < 600) return weatherId >= 502 ? "storm" : "rainy";
  if (weatherId >= 300 && weatherId < 400) return "drizzle";
  if (weatherId >= 200 && weatherId < 300) return "storm";
  if (weatherId >= 802 && weatherId <= 804) return "cloudy";

  if (tempCelsius >= 35) return "scorching";
  if (tempCelsius >= 30) return "hot";
  if (tempCelsius >= 26) return "warm2";
  if (tempCelsius >= 20) return "warm";
  if (tempCelsius >= 15) return "cool";
  if (tempCelsius >= 8) return "chilly";
  if (tempCelsius >= 0) return "cold";
  return "freezing";
}
