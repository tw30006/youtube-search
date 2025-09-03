import VideoCard from '../components/VideoCard';
import SearchBar from '../components/SearchBar';
// import { useState, useEffect } from 'react';
import { useVideoContext } from '../context/VideoDataContext';

export default function SearchResults() {
  const { searchResults, query, setQuery } = useVideoContext();

  function handleQuery(searchQuery) {
    setQuery(searchQuery); // 接收並設置查詢參數
  }

  return (
    <>
      <SearchBar onSearch={handleQuery} />
      <h1 className="text-yellow-700">搜尋結果:{query || ''}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResults.map((video) => (
          <VideoCard key={video.id.videoId} video={video} />
        ))}
      </div>
    </>
  );
}
