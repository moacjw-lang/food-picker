// Hello Kitty 스타일 얼굴 SVG - 표정별 눈 변화
// expression prop으로 18가지 기분 표현

const EYES = {
  // 기분 좋아 ^^
  happy: (
    <>
      <path d="M15 19 Q17 16 19 19" stroke="#333" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M29 19 Q31 16 33 19" stroke="#333" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </>
  ),
  // 신나 ★★
  excited: (
    <>
      <polygon points="17,15 18,18 21,18 18.5,20 19.5,23 17,21 14.5,23 15.5,20 13,18 16,18" fill="#FFD700" stroke="#333" strokeWidth="0.5" />
      <polygon points="31,15 32,18 35,18 32.5,20 33.5,23 31,21 28.5,23 29.5,20 27,18 30,18" fill="#FFD700" stroke="#333" strokeWidth="0.5" />
    </>
  ),
  // 설레어 ♡♡
  lovely: (
    <>
      <path d="M14,18 C14,16 16,15 17,17 C18,15 20,16 20,18 C20,20 17,22 17,22 C17,22 14,20 14,18Z" fill="#FF6B8A" />
      <path d="M28,18 C28,16 30,15 31,17 C32,15 34,16 34,18 C34,20 31,22 31,22 C31,22 28,20 28,18Z" fill="#FF6B8A" />
    </>
  ),
  // 포근해 UU
  cozy: (
    <>
      <path d="M14 20 Q17 17 20 20" stroke="#333" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M28 20 Q31 17 34 20" stroke="#333" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </>
  ),
  // 여유 반개
  chill: (
    <>
      <line x1="14" y1="19" x2="20" y2="19" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="17" cy="19" r="1" fill="#333" />
      <line x1="28" y1="19" x2="34" y2="19" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="31" cy="19" r="1" fill="#333" />
    </>
  ),
  // 그냥그래 ·  ·
  meh: (
    <>
      <circle cx="17" cy="19" r="2" fill="#333" />
      <circle cx="31" cy="19" r="2" fill="#333" />
    </>
  ),
  // 심심해 (옆 보는 눈)
  bored: (
    <>
      <circle cx="18" cy="19" r="2.2" fill="#333" />
      <circle cx="32" cy="19" r="2.2" fill="#333" />
      <circle cx="19" cy="18.5" r="0.8" fill="white" />
      <circle cx="33" cy="18.5" r="0.8" fill="white" />
    </>
  ),
  // 배고파 (큰 눈)
  hungry: (
    <>
      <circle cx="17" cy="19" r="3" fill="#333" />
      <circle cx="31" cy="19" r="3" fill="#333" />
      <circle cx="18" cy="17.5" r="1.2" fill="white" />
      <circle cx="32" cy="17.5" r="1.2" fill="white" />
    </>
  ),
  // 입이심심 (><)
  snacky: (
    <>
      <path d="M14,17 L17,20 L20,17" stroke="#333" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28,17 L31,20 L34,17" stroke="#333" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  // 피곤해 --
  tired: (
    <>
      <line x1="14" y1="19" x2="20" y2="19" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="19" x2="34" y2="19" stroke="#333" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  // 우울해 (처진 눈 + 눈물)
  sad: (
    <>
      <path d="M14,18 Q17,21 20,18" stroke="#333" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M28,18 Q31,21 34,18" stroke="#333" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="20" cy="22" r="1" fill="#87CEEB" />
    </>
  ),
  // 외로워 (눈물 양쪽)
  lonely: (
    <>
      <circle cx="17" cy="18" r="2" fill="#333" />
      <circle cx="31" cy="18" r="2" fill="#333" />
      <path d="M20,20 Q20.5,23 20,24" stroke="#87CEEB" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M28,20 Q27.5,23 28,24" stroke="#87CEEB" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </>
  ),
  // 짜증나 (V자 눈썹)
  angry: (
    <>
      <line x1="13" y1="16" x2="20" y2="14" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      <line x1="35" y1="16" x2="28" y2="14" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      <circle cx="17" cy="20" r="2" fill="#333" />
      <circle cx="31" cy="20" r="2" fill="#333" />
    </>
  ),
  // 스트레스 (@@ 소용돌이)
  stressed: (
    <>
      <path d="M17,16 Q19,17 18,19 Q16,20 17,21 Q19,22 17,19" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M31,16 Q33,17 32,19 Q30,20 31,21 Q33,22 31,19" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </>
  ),
  // 아파 (xx)
  sick: (
    <>
      <line x1="14" y1="16" x2="20" y2="22" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="20" y1="16" x2="14" y2="22" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="28" y1="16" x2="34" y2="22" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="34" y1="16" x2="28" y2="22" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  // 한잔할까 (~ 흐릿)
  drinking: (
    <>
      <path d="M14,19 Q15.5,17 17,19 Q18.5,21 20,19" stroke="#333" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M28,19 Q29.5,17 31,19 Q32.5,21 34,19" stroke="#333" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="13" cy="22" r="2.5" fill="rgba(255,107,138,0.3)" />
      <circle cx="35" cy="22" r="2.5" fill="rgba(255,107,138,0.3)" />
    </>
  ),
  // 건강하게 (반짝)
  healthy: (
    <>
      <circle cx="17" cy="19" r="2" fill="#333" />
      <circle cx="31" cy="19" r="2" fill="#333" />
      <circle cx="18" cy="18" r="0.7" fill="white" />
      <circle cx="32" cy="18" r="0.7" fill="white" />
      <path d="M21,15 L22,13 L23,15" stroke="#FFD700" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M25,14 L26,12 L27,14" stroke="#FFD700" strokeWidth="1" fill="none" strokeLinecap="round" />
    </>
  ),
  // 다이어트 (결심한 눈)
  diet: (
    <>
      <line x1="14" y1="16" x2="20" y2="17" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="28" y1="17" x2="34" y2="16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="17" cy="20" r="1.8" fill="#333" />
      <circle cx="31" cy="20" r="1.8" fill="#333" />
    </>
  ),
};

export default function KittyFace({ expression = "meh", size = 40 }) {
  const eyes = EYES[expression] || EYES.meh;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 왼쪽 귀 */}
      <polygon points="8,18 12,4 20,16" fill="white" stroke="#333" strokeWidth="1" />
      <polygon points="10,16 13,8 18,15" fill="rgba(255,107,157,0.35)" />

      {/* 오른쪽 귀 */}
      <polygon points="40,18 36,4 28,16" fill="white" stroke="#333" strokeWidth="1" />
      <polygon points="38,16 35,8 30,15" fill="rgba(255,107,157,0.35)" />

      {/* 리본 (왼쪽 귀 위) */}
      <ellipse cx="8" cy="8" rx="5" ry="3.5" fill="#FF6B8A" transform="rotate(-20 8 8)" />
      <ellipse cx="8" cy="8" rx="3.5" ry="5" fill="#FF6B8A" transform="rotate(-20 8 8)" />
      <circle cx="8" cy="8" r="2" fill="#FF4571" />

      {/* 얼굴 */}
      <ellipse cx="24" cy="26" rx="18" ry="16" fill="white" stroke="#333" strokeWidth="1" />

      {/* 표정 (눈) */}
      {eyes}

      {/* 코 */}
      <ellipse cx="24" cy="25" rx="2" ry="1.5" fill="#FFD700" />

      {/* 수염 */}
      <line x1="2" y1="23" x2="14" y2="25" stroke="#333" strokeWidth="0.8" />
      <line x1="2" y1="26" x2="14" y2="27" stroke="#333" strokeWidth="0.8" />
      <line x1="3" y1="29" x2="14" y2="29" stroke="#333" strokeWidth="0.8" />

      <line x1="46" y1="23" x2="34" y2="25" stroke="#333" strokeWidth="0.8" />
      <line x1="46" y1="26" x2="34" y2="27" stroke="#333" strokeWidth="0.8" />
      <line x1="45" y1="29" x2="34" y2="29" stroke="#333" strokeWidth="0.8" />
    </svg>
  );
}
