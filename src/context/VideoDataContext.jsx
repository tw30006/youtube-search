import { createContext, useState, useEffect, useContext } from 'react';
import { fetchApi } from '../utils/api';
export const VideoContext = createContext();

//Provider組件
export const VideoContextProvider = ({ children }) => {
  const [searchResults, setSarchResults] = useState([]);
  const [videos, setVideos] = useState([]);
  const [channel, setChannel] = useState(null);
  const [channelVideos, setChannelVideos] = useState([]);
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

  //我要取得頻道的詳細資料
  useEffect(() => {
    if (!selectedVideo || !selectedVideo.snippet?.channelId) {
      setChannel(null);
      setChannelVideos([]);
      return;
    }

    const getChannelDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const channelId = selectedVideo.snippet.channelId;
        console.log('正在取得頻道資料:', channelId);

        const channelData = await fetchApi('channels', {
          part: 'snippet,contentDetails,statistics',
          id: channelId,
        });
        // console.log('頻道詳細資料:', channelData.items);
        // console.log('頻道詳細資料:', channelData.items[0]);
        // setChannel(channelData.items[0] || null);
        const uploadsPlaylistId =
          channelData.items[0].contentDetails.relatedPlaylists.uploads;

        const playlistData = await fetchApi('playlistItems', {
          part: 'snippet,contentDetails',
          playlistId: uploadsPlaylistId,
          maxResults: 20, // 一次最多 50，可以分頁抓
        });
        setChannelVideos(playlistData.items || []);
      } catch (err) {
        setError('取得頻道詳細資料失敗');
        console.error('頻道詳細資料取得失敗:', err);
        // setChannel(null);
      } finally {
        setLoading(false);
      }
    };
    getChannelDetail();
  }, [selectedVideo]);

  //取得頻道的影片列表
  // useEffect(() => {
  //   if (!channel || !channel.id) {
  //     setChannelVideos([]);
  //     return;
  //   }

  //   const getChannelVideos = async () => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const channelId = channel.id;
  //       console.log('正在取得頻道影片:', channelId);

  //       // 搜尋該頻道的影片
  //       const searchData = await fetchApi('search', {
  //         part: 'snippet',
  //         channelId: channelId,
  //         maxResults: 20,
  //         order: 'date',
  //         type: 'video',
  //       });

  //       if (searchData.items && searchData.items.length > 0) {
  //         // 取得影片的詳細資訊
  //         const videoIds = searchData.items
  //           .map((item) => item.id.videoId)
  //           .join(',');

  //         const videoDetails = await fetchApi('videos', {
  //           part: 'snippet,statistics,contentDetails',
  //           id: videoIds,
  //         });

  //         setChannelVideos(videoDetails.items || []);
  //         console.log('頻道影片列表:', videoDetails.items);
  //       } else {
  //         setChannelVideos([]);
  //       }
  //     } catch (err) {
  //       setError('取得頻道影片失敗');
  //       console.error('頻道影片取得失敗:', err);
  //       setChannelVideos([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getChannelVideos();
  // }, [channel]);

  const value = {
    searchResults,
    videos,
    channel,
    channelVideos,
    query,
    selectedVideo,
    loading,
    error,
    setQuery,
    setSarchResults,
    setSelectedVideo,
    setChannel,
    setChannelVideos,
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
