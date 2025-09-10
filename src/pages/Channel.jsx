import { useVideoContext } from "../context/VideoDataContext";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchApi } from "../utils/api";
import VideoCard from "../components/VideoCard";

export default function Channel() {
  const { channel, channelVideos, error, setChannel, setChannelVideos } =
    useVideoContext();
  const { id: channelId } = useParams();
  // 當直接從 URL 訪問頻道頁面時，載入頻道資料
  useEffect(() => {
    const loadChannelData = async () => {
      if (!channelId) return;

      // 如果已經有相同的頻道資料，就不重新載入
      if (channel && channel.id === channelId) return;

      try {
        console.log("正在載入頻道資料:", channelId);

        // 取得頻道詳細資訊
        const channelData = await fetchApi("channels", {
          part: "snippet,contentDetails,statistics",
          id: channelId,
        });

        // console.log(channelData);

        if (channelData.items && channelData.items.length > 0) {
          setChannel(channelData.items[0]);

          // 取得頻道影片
          const searchData = await fetchApi("search", {
            part: "snippet",
            channelId: channelId,
            maxResults: 20,
            order: "date",
            type: "video",
          });

          if (searchData.items && searchData.items.length > 0) {
            const videoIds = searchData.items
              .map((item) => item.id.videoId)
              .join(",");

            const videoDetails = await fetchApi("videos", {
              part: "snippet,statistics,contentDetails",
              id: videoIds,
            });

            setChannelVideos(videoDetails.items || []);
          } else {
            setChannelVideos([]);
          }
        }
      } catch (err) {
        console.error("載入頻道資料失敗:", err);
        setChannel(null);
        setChannelVideos([]);
      }
    };

    loadChannelData();
  }, [channelId, channel, setChannel, setChannelVideos]);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">錯誤</h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">
            沒有選擇頻道
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            請先選擇一個影片以查看頻道資訊
          </p>
        </div>
      </div>
    );
  }

  const formatSubscriberCount = (count) => {
    if (!count) return "未知";
    const num = parseInt(count);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}萬`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatVideoCount = (count) => {
    if (!count) return "0";
    return parseInt(count).toLocaleString();
  };

  const formatViewCount = (count) => {
    if (!count) return "0";
    const num = parseInt(count);
    if (num >= 100000000) {
      return `${(num / 100000000).toFixed(1)}億`;
    } else if (num >= 10000) {
      return `${(num / 10000).toFixed(1)}萬`;
    }
    return num.toLocaleString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 頻道資訊區塊 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* 頻道頭像 */}
          <div className="flex-shrink-0">
            <img
              src={
                channel.snippet?.thumbnails?.high?.url ||
                channel.snippet?.thumbnails?.default?.url
              }
              alt={channel.snippet?.title}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
            />
          </div>

          {/* 頻道資訊 */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {channel.snippet?.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              {channel.snippet?.description}
            </p>

            {/* 統計資料 */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                <span className="text-gray-600 dark:text-gray-400">
                  訂閱者數：
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatSubscriberCount(channel.statistics?.subscriberCount)}
                </span>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                <span className="text-gray-600 dark:text-gray-400">
                  影片數量：
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatVideoCount(channel.statistics?.videoCount)}
                </span>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                <span className="text-gray-600 dark:text-gray-400">
                  總觀看次數：
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatViewCount(channel.statistics?.viewCount)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mb-5">
        <Link
          to="/channelanalytics"
          className="p-2 border rounded-md cursor-pointer hover:bg-gray-600 hover:border-gray-600"
        >
          頻道影片數據分析
        </Link>
      </div>

      {/* 影片列表 */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          最新影片 ({channelVideos.length})
        </h2>

        {channelVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {channelVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              這個頻道目前沒有公開的影片
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
