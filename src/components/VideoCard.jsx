import { useVideoContext } from "../context/VideoDataContext";
import { useNavigate } from "react-router-dom";

export default function VideoCard({ video }) {
  const navigate = useNavigate();
  const { videos, channelVideos, setSelectedVideo } = useVideoContext();

  if (!video) return null;

  const { snippet, id } = video;

  const videoId = typeof id === "string" ? id : id?.videoId;

  const thumbnail =
    snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url;

  const videoItem = typeof id === "string" ? channelVideos : videos;

  function handleVideoDetail(videoId) {
    const videoDetail = videoItem.find((item) => {
      return videoId === item.id;
    });
    console.log(videoDetail);
    if (videoDetail) {
      setSelectedVideo?.(videoDetail);
    } else {
      console.error("找不到影片詳情");
    }

    navigate(`/video/${videoId}`);
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer">
      <div onClick={() => handleVideoDetail(videoId)}>
        <img
          src={thumbnail}
          alt={snippet.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <p className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {snippet.title}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {snippet.channelTitle}
          </p>
          <time className="text-xs text-gray-500 dark:text-gray-500">
            {new Date(snippet.publishedAt).toLocaleDateString("zh-TW")}
          </time>
        </div>
      </div>
    </div>
  );
}
