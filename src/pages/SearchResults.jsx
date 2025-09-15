import VideoCard from '../components/VideoCard';
import SearchBar from '../components/SearchBar';

// import { useState, useEffect } from 'react';
import { useVideoContext } from '../context/VideoDataContext';

export default function SearchResults() {
  const { searchResults, setQuery } = useVideoContext();

  function handleQuery(searchQuery) {
    setQuery(searchQuery); // 接收並設置查詢參數
  }

  return (
    <>
      <SearchBar onSearch={handleQuery} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-5">
        {searchResults.map((video) => (
          <VideoCard key={video.id.videoId} video={video} />
        ))}
      </div>
    </>
  );
}
