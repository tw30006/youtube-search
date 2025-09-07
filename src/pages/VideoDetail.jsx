import { useVideoContext } from "../context/VideoDataContext";
import { useParams, Link } from "react-router-dom";

export default function VideoDetail() {
  const { selectedVideo } = useVideoContext();
  const { id } = useParams();

  if (selectedVideo === null) return;
  const { snippet } = selectedVideo;
  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div
          className="relative w-full mb-6"
          style={{ paddingBottom: "56.25%" }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={snippet.title}
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            allowFullScreen
            allow="accelerometer; autoplay;clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            {snippet.title}
          </h1>
          <div className="flex items-center mb-4">
            <Link
              to={`/channel/${snippet.channelId}`}
              className="text-lg text-blue-600 dark:text-blue-400 font-semibold"
            >
              {snippet.channelTitle}
            </Link>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-4">
              {new Date(snippet.publishedAt).toLocaleDateString("zh-TW")}
            </span>
          </div>
          <div className="text-gray-700 dark:text-gray-300">
            <h3 className="text-lg font-semibold mb-2">影片描述</h3>
            <p className="whitespace-pre-wrap">{snippet.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
