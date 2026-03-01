import "../styles/MatchReason.css";

// 추천 이유 표시 컴포넌트
function MatchReason({ reason }) {
  if (!reason) return null;

  return (
    <div className="match-reason">
      <p className="match-reason-text">{reason}</p>
    </div>
  );
}

export default MatchReason;
