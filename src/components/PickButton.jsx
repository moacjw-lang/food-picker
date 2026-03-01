import "../styles/PickButton.css";

// 랜덤 선택 버튼 컴포넌트
function PickButton({ onClick, isSpinning }) {
  return (
    <button
      className={`pick-button ${isSpinning ? "spinning" : ""}`}
      onClick={onClick}
      disabled={isSpinning}
    >
      {isSpinning ? "고르는 중..." : "메뉴 뽑기!"}
    </button>
  );
}

export default PickButton;
