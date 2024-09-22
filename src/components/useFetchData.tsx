import { useState, useEffect } from "react";

interface AudioClip {
  urls: {
    high_mp3: string;
  };
  id: number;
  title: string;
  channel: {
    title: string;
    urls: {
      logo_image: {
        original: string;
      };
    };
  };
  episode_number?: number;
}

function useFetchData(url: string) {
  const [data, setData] = useState<AudioClip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.body.audio_clips); // Asegúrate de que esto coincida con la estructura de tu API
      } catch (err) {
        const error = err as Error; // Type assertion
        setError("Hubo un error: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {
    data,
    isLoading,
    error,
  };
}

export default useFetchData;
