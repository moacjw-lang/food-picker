import { MOODS } from "../constants/moods";
import "../styles/MoodSelector.css";

// 기분 이모지 선택 컴포넌트
function MoodSelector({ selectedMood, onMoodChange }) {
  return (
    <div className="mood-selector">
      <p className="mood-label">지금 기분은?</p>
      <div className="mood-buttons">
        {MOODS.map((mood) => (
          <button
            key={mood.id}
            className={`mood-button ${selectedMood === mood.id ? "active" : ""}`}
            onClick={() => onMoodChange(mood.id)}
            title={mood.label}
          >
            <span className="mood-emoji">{mood.emoji}</span>
            <span className="mood-text">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default MoodSelector;
