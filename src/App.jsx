import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import SearchResults from "./pages/SearchResults";
import TrendingVideos from "./pages/TrendingVideos";
import VideoDetail from "./pages/VideoDetail";
import Channel from "./pages/Channel";
import ChannelAnalytics from "./pages/ChannelAnalytics";
import "./App.css";
import { VideoContextProvider } from "./context/VideoDataContext";

function App() {
  return (
    <VideoContextProvider>
      <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">
        <Navbar />
        <main className="container mx-auto">
          <Routes>
            <Route path="/" element={<SearchResults />} />
            <Route path="/trending" element={<TrendingVideos />} />
            <Route path="/video/:id" element={<VideoDetail />}></Route>
            <Route path="/channel/:id" element={<Channel />}></Route>
            <Route
              path="/channelanalytics"
              element={<ChannelAnalytics />}
            ></Route>
          </Routes>
        </main>
      </div>
    </VideoContextProvider>
  );
}

export default App;
