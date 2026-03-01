// 카테고리 상수 정의
// 새로운 카테고리 추가 시 이 배열에 추가하면 됩니다
export const CATEGORIES = [
  { id: "all", name: "전체" },
  { id: "korean", name: "한식" },
  { id: "chinese", name: "중식" },
  { id: "japanese", name: "일식" },
  { id: "western", name: "양식" },
  { id: "snack", name: "분식" },
  { id: "asian", name: "아시안" },
  { id: "mexican", name: "멕시칸" },
];

// 카테고리 이름으로 ID 찾기
export const getCategoryId = (name) => {
  const category = CATEGORIES.find((cat) => cat.name === name);
  return category ? category.id : null;
};

// 카테고리 ID로 이름 찾기
export const getCategoryName = (id) => {
  const category = CATEGORIES.find((cat) => cat.id === id);
  return category ? category.name : null;
};
