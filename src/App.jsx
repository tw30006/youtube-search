import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchResults from './pages/SearchResults';
import TrendingVideos from './pages/TrendingVideos';
import VideoDetail from './pages/VideoDetail';
import './App.css';
import { VideoContextProvider } from './context/VideoDataContext';

function App() {
  return (
    <VideoContextProvider>
      <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar />
        <main className="container mx-auto">
          <Routes>
            <Route path="/" element={<SearchResults />} />
            <Route path="/trending" element={<TrendingVideos />} />
            <Route path="/video/:id" element={<VideoDetail />}></Route>
          </Routes>
        </main>
      </div>
    </VideoContextProvider>
  );
}

export default App;
