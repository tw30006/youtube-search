import { createContext, useState, useEffect, useContext } from 'react';
import { fetchApi } from '../utils/api';
export const VideoContext = createContext();

//Provider組件
export const VideoContextProvider = ({ children }) => {
  const [searchResults, setSarchResults] = useState([]);
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //根據query的變動去打search api
  useEffect(() => {
    if (!query) {
      setSarchResults([]);
      return;
    }

    const searchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchApi('search', {
          part: 'snippet',
          maxResults: 12,
          q: query,
          type: 'video',
        });

        console.log(data);
        setSarchResults(data.items || []);
      } catch (err) {
        setError('搜尋失敗');
        console.error('API請求失敗', err);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    searchVideos();
  }, [query]);

  console.log(searchResults);

  useEffect(() => {
    if (!searchResults.length === 0) {
      setVideos([]);
      return;
    }
    const getVideoDetail = async () => {
      setLoading(true);
      try {
        const videoIds = searchResults
          .map((item) => {
            return item.id.videoId;
          })
          .join(',');
        console.log(videoIds);

        const detailData = await fetchApi('videos', {
          part: 'snippet,statistics,contentDetails',
          id: videoIds,
        });
        setVideos(detailData.items || []);
      } catch (err) {
        setError('獲取影片詳情失敗');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getVideoDetail();
    // console.log(videos);
  }, [searchResults]);

  const value = {
    searchResults,
    videos,
    query,
    selectedVideo,
    setQuery,
    setSarchResults,
    setSelectedVideo,
  };

  return <VideoContext value={value}>{children}</VideoContext>;
};

//自定義hook方便使用
export const useVideoContext = () => {
  const context = useContext(VideoContext);

  if (!context) {
    throw new Error('useVideoContext 必須在VideoContextProvider 內部使用');
  }
  return context;
};
