import "../styles/MenuDisplay.css";

// 선택된 메뉴 표시 컴포넌트
function MenuDisplay({ menu }) {
  if (!menu) {
    return (
      <div className="menu-display empty">
        <span className="question-mark">?</span>
      </div>
    );
  }

  return (
    <div className="menu-display selected">
      <span className="menu-emoji">{menu.emoji}</span>
      <span className="menu-name">{menu.name}</span>
      <span className="menu-category">{menu.category}</span>
    </div>
  );
}

export default MenuDisplay;
