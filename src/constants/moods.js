// 기분 상수 (18종 - 3×6 그리드 꽉 채움)
// kittyEyes: KittyFace 컴포넌트 표정용

export const MOODS = [
  { id: "happy",    kittyEyes: "happy",    label: "기분 좋아",  matchTags: ["파티", "특별한", "달콤한"],                   desc: "기분 좋은 날엔" },
  { id: "excited",  kittyEyes: "excited",  label: "신나!",      matchTags: ["파티", "특별한", "매운", "고기"],             desc: "신나는 날엔" },
  { id: "lovely",   kittyEyes: "lovely",   label: "설레어",     matchTags: ["특별한", "달콤한", "가벼운"],                 desc: "설레는 날엔" },
  { id: "cozy",     kittyEyes: "cozy",     label: "포근해",     matchTags: ["뜨거운", "국물", "든든한", "위로"],           desc: "포근한 날엔" },
  { id: "chill",    kittyEyes: "chill",    label: "여유로워",   matchTags: ["담백한", "가벼운", "건강한"],                 desc: "여유로운 날엔" },
  { id: "meh",      kittyEyes: "meh",      label: "그냥 그래",  matchTags: ["간편", "상온", "담백한"],                     desc: "그냥 그런 날엔" },
  { id: "bored",    kittyEyes: "bored",    label: "심심해",     matchTags: ["간식", "바삭한", "자극적", "특별한"],         desc: "심심할 땐" },
  { id: "hungry",   kittyEyes: "hungry",   label: "배고파",     matchTags: ["든든한", "고기", "밥", "국물"],               desc: "배고플 땐" },
  { id: "snacky",   kittyEyes: "snacky",   label: "입이 심심",  matchTags: ["간식", "바삭한", "달콤한", "간편"],           desc: "입이 심심할 땐" },
  { id: "tired",    kittyEyes: "tired",    label: "피곤해",     matchTags: ["간편", "든든한", "국물", "위로"],             desc: "피곤할 땐" },
  { id: "sad",      kittyEyes: "sad",      label: "우울해",     matchTags: ["위로", "든든한", "뜨거운", "달콤한"],         desc: "우울할 땐" },
  { id: "lonely",   kittyEyes: "lonely",   label: "외로워",     matchTags: ["위로", "뜨거운", "국물", "든든한"],           desc: "외로울 땐" },
  { id: "angry",    kittyEyes: "angry",    label: "짜증나",     matchTags: ["매운", "바삭한", "고기", "자극적"],           desc: "짜증날 땐" },
  { id: "stressed", kittyEyes: "stressed", label: "스트레스",   matchTags: ["매운", "자극적", "고기", "바삭한"],           desc: "스트레스 받을 땐" },
  { id: "sick",     kittyEyes: "sick",     label: "아파...",    matchTags: ["국물", "담백한", "영양", "뜨거운"],           desc: "몸이 안 좋을 땐" },
  { id: "drinking", kittyEyes: "drinking", label: "한잔 할까",  matchTags: ["안주", "바삭한", "매운", "고기"],             desc: "한잔 하고 싶을 땐" },
  { id: "healthy",  kittyEyes: "healthy",  label: "건강하게",   matchTags: ["건강한", "담백한", "영양", "가벼운"],         desc: "건강을 챙기고 싶을 땐" },
  { id: "diet",     kittyEyes: "diet",     label: "다이어트",   matchTags: ["가벼운", "건강한", "담백한", "새콤한"],       desc: "다이어트 중엔" },
];
