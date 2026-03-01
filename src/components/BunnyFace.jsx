// 토끼 얼굴 SVG - 표정별 눈 변화
// expression prop으로 18가지 기분 표현

const EYES = {
  happy: (
    <>
      <path d="M15 21 Q17 18 19 21" stroke="#333" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M29 21 Q31 18 33 21" stroke="#333" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </>
  ),
  excited: (
    <>
      <polygon points="17,17 18,20 21,20 18.5,22 19.5,25 17,23 14.5,25 15.5,22 13,20 16,20" fill="#FFD700" stroke="#333" strokeWidth="0.5" />
      <polygon points="31,17 32,20 35,20 32.5,22 33.5,25 31,23 28.5,25 29.5,22 27,20 30,20" fill="#FFD700" stroke="#333" strokeWidth="0.5" />
    </>
  ),
  lovely: (
    <>
      <path d="M14,20 C14,18 16,17 17,19 C18,17 20,18 20,20 C20,22 17,24 17,24 C17,24 14,22 14,20Z" fill="#FF6B8A" />
      <path d="M28,20 C28,18 30,17 31,19 C32,17 34,18 34,20 C34,22 31,24 31,24 C31,24 28,22 28,20Z" fill="#FF6B8A" />
    </>
  ),
  cozy: (
    <>
      <path d="M14 22 Q17 19 20 22" stroke="#333" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M28 22 Q31 19 34 22" stroke="#333" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </>
  ),
  chill: (
    <>
      <line x1="14" y1="21" x2="20" y2="21" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="17" cy="21" r="1" fill="#333" />
      <line x1="28" y1="21" x2="34" y2="21" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="31" cy="21" r="1" fill="#333" />
    </>
  ),
  meh: (
    <>
      <circle cx="17" cy="21" r="2" fill="#333" />
      <circle cx="31" cy="21" r="2" fill="#333" />
    </>
  ),
  bored: (
    <>
      <circle cx="18" cy="21" r="2.2" fill="#333" />
      <circle cx="32" cy="21" r="2.2" fill="#333" />
      <circle cx="19" cy="20.5" r="0.8" fill="white" />
      <circle cx="33" cy="20.5" r="0.8" fill="white" />
    </>
  ),
  hungry: (
    <>
      <circle cx="17" cy="21" r="3" fill="#333" />
      <circle cx="31" cy="21" r="3" fill="#333" />
      <circle cx="18" cy="19.5" r="1.2" fill="white" />
      <circle cx="32" cy="19.5" r="1.2" fill="white" />
    </>
  ),
  snacky: (
    <>
      <path d="M14,19 L17,22 L20,19" stroke="#333" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28,19 L31,22 L34,19" stroke="#333" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  tired: (
    <>
      <line x1="14" y1="21" x2="20" y2="21" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="21" x2="34" y2="21" stroke="#333" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  sad: (
    <>
      <path d="M14,20 Q17,23 20,20" stroke="#333" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M28,20 Q31,23 34,20" stroke="#333" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="20" cy="24" r="1" fill="#87CEEB" />
    </>
  ),
  lonely: (
    <>
      <circle cx="17" cy="20" r="2" fill="#333" />
      <circle cx="31" cy="20" r="2" fill="#333" />
      <path d="M20,22 Q20.5,25 20,26" stroke="#87CEEB" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M28,22 Q27.5,25 28,26" stroke="#87CEEB" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </>
  ),
  angry: (
    <>
      <line x1="13" y1="18" x2="20" y2="16" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      <line x1="35" y1="18" x2="28" y2="16" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      <circle cx="17" cy="22" r="2" fill="#333" />
      <circle cx="31" cy="22" r="2" fill="#333" />
    </>
  ),
  stressed: (
    <>
      <path d="M17,18 Q19,19 18,21 Q16,22 17,23 Q19,24 17,21" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M31,18 Q33,19 32,21 Q30,22 31,23 Q33,24 31,21" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </>
  ),
  sick: (
    <>
      <line x1="14" y1="18" x2="20" y2="24" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="20" y1="18" x2="14" y2="24" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="28" y1="18" x2="34" y2="24" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="34" y1="18" x2="28" y2="24" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  drinking: (
    <>
      <path d="M14,21 Q15.5,19 17,21 Q18.5,23 20,21" stroke="#333" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M28,21 Q29.5,19 31,21 Q32.5,23 34,21" stroke="#333" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="13" cy="24" r="2.5" fill="rgba(255,107,138,0.3)" />
      <circle cx="35" cy="24" r="2.5" fill="rgba(255,107,138,0.3)" />
    </>
  ),
  healthy: (
    <>
      <circle cx="17" cy="21" r="2" fill="#333" />
      <circle cx="31" cy="21" r="2" fill="#333" />
      <circle cx="18" cy="20" r="0.7" fill="white" />
      <circle cx="32" cy="20" r="0.7" fill="white" />
      <path d="M21,17 L22,15 L23,17" stroke="#FFD700" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M25,16 L26,14 L27,16" stroke="#FFD700" strokeWidth="1" fill="none" strokeLinecap="round" />
    </>
  ),
  diet: (
    <>
      <line x1="14" y1="18" x2="20" y2="19" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="28" y1="19" x2="34" y2="18" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="17" cy="22" r="1.8" fill="#333" />
      <circle cx="31" cy="22" r="1.8" fill="#333" />
    </>
  ),
};

export default function BunnyFace({ expression = "meh", size = 40 }) {
  const eyes = EYES[expression] || EYES.meh;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 왼쪽 귀 - 길고 둥근 토끼 귀 */}
      <ellipse cx="16" cy="12" rx="5" ry="13" fill="white" stroke="#333" strokeWidth="1" />
      <ellipse cx="16" cy="12" rx="3" ry="10" fill="rgba(255,107,157,0.3)" />

      {/* 오른쪽 귀 */}
      <ellipse cx="32" cy="12" rx="5" ry="13" fill="white" stroke="#333" strokeWidth="1" />
      <ellipse cx="32" cy="12" rx="3" ry="10" fill="rgba(255,107,157,0.3)" />

      {/* 리본 (왼쪽 귀) */}
      <ellipse cx="10" cy="8" rx="4" ry="2.8" fill="#FF6B8A" transform="rotate(-15 10 8)" />
      <ellipse cx="10" cy="8" rx="2.8" ry="4" fill="#FF6B8A" transform="rotate(-15 10 8)" />
      <circle cx="10" cy="8" r="1.5" fill="#FF4571" />

      {/* 얼굴 */}
      <ellipse cx="24" cy="32" rx="17" ry="14" fill="white" stroke="#333" strokeWidth="1" />

      {/* 볼터치 */}
      <circle cx="10" cy="30" r="3.5" fill="rgba(255,107,157,0.15)" />
      <circle cx="38" cy="30" r="3.5" fill="rgba(255,107,157,0.15)" />

      {/* 표정 (눈) */}
      {eyes}

      {/* 코 - 작은 역삼각 핑크 */}
      <path d="M22.5,27 L24,29 L25.5,27 Z" fill="#FF8FAB" />

      {/* 입 - w 모양 */}
      <path d="M21,31 Q22.5,29.5 24,31 Q25.5,29.5 27,31" stroke="#333" strokeWidth="0.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}
