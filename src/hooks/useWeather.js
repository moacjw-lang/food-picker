import { useState, useEffect } from "react";
import { mapToWeatherKey } from "../constants/weather";

// OpenWeatherMap 날씨 API 연동 훅
export const useWeather = () => {
  const [weatherKey, setWeatherKey] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    if (!apiKey) {
      setError("API 키가 설정되지 않았어요");
      setLoading(false);
      return;
    }

    // 위치 권한 요청 → 날씨 가져오기
    if (!navigator.geolocation) {
      setError("위치 서비스를 지원하지 않아요");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=kr&appid=${apiKey}`;
          const res = await fetch(url);

          if (!res.ok) throw new Error("날씨 정보를 가져올 수 없어요");

          const data = await res.json();
          const temp = Math.round(data.main.temp);
          const weatherId = data.weather[0].id;
          const key = mapToWeatherKey(temp, weatherId);

          setTemperature(temp);
          setDescription(data.weather[0].description);
          setIcon(data.weather[0].icon);
          setWeatherKey(key);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      () => {
        // 위치 권한 거부
        setError("위치 권한이 필요해요");
        setLoading(false);
      }
    );
  }, []);

  // 수동으로 날씨 선택
  const setManualWeather = (key) => {
    setWeatherKey(key);
    setIsManual(true);
    setError(null);
    setLoading(false);
  };

  return {
    weatherKey,
    temperature,
    description,
    icon,
    loading,
    error,
    isManual,
    setManualWeather,
  };
};
