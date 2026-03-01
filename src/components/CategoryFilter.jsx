import { CATEGORIES } from "../constants/categories";
import "../styles/CategoryFilter.css";

// 카테고리 필터 컴포넌트
function CategoryFilter({ selectedCategory, onCategoryChange, menuCount }) {
  return (
    <div className="category-filter">
      <div className="category-buttons">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            className={`category-button ${
              selectedCategory === category.name ? "active" : ""
            }`}
            onClick={() => onCategoryChange(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <p className="menu-count">{menuCount}개의 메뉴</p>
    </div>
  );
}

export default CategoryFilter;
