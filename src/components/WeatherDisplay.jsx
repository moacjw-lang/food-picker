import { WEATHER_MAP, WEATHER_KEYS } from "../constants/weather";
import "../styles/WeatherDisplay.css";

// 날씨 표시 컴포넌트
function WeatherDisplay({
  weatherKey,
  temperature,
  description,
  icon,
  loading,
  error,
  isManual,
  onManualSelect,
}) {
  // 로딩 중
  if (loading) {
    return (
      <div className="weather-display">
        <div className="weather-loading">날씨 확인 중...</div>
      </div>
    );
  }

  // 에러 (위치 거부 등) → 수동 선택 표시
  if (error && !weatherKey) {
    return (
      <div className="weather-display">
        <p className="weather-manual-label">오늘 날씨를 골라주세요</p>
        <div className="weather-manual-buttons">
          {WEATHER_KEYS.map((key) => (
            <button
              key={key}
              className="weather-manual-button"
              onClick={() => onManualSelect(key)}
            >
              {WEATHER_MAP[key].label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 날씨 정보 표시
  const weatherInfo = weatherKey ? WEATHER_MAP[weatherKey] : null;

  return (
    <div className="weather-display">
      <div className="weather-info">
        {icon && !isManual && (
          <img
            className="weather-icon"
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
          />
        )}
        <div className="weather-text">
          {temperature !== null && !isManual && (
            <span className="weather-temp">{temperature}°C</span>
          )}
          <span className="weather-desc">
            {weatherInfo ? weatherInfo.label : description}
          </span>
        </div>
      </div>
      {/* 수동 변경 버튼들 */}
      <div className="weather-change-buttons">
        {WEATHER_KEYS.map((key) => (
          <button
            key={key}
            className={`weather-change-button ${weatherKey === key ? "active" : ""}`}
            onClick={() => onManualSelect(key)}
          >
            {WEATHER_MAP[key].label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default WeatherDisplay;
