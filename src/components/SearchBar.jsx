import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  //處理輸入變更
  function handleInputChange(e) {
    console.log(e.target.value);
    setInput(e.target.value);
  }

  //我按enter之後再發送api
  function handleKeyDown(e) {
    if (e.code === 'Enter') {
      performSearch(input);
    }
  }
  const performSearch = (searchTerm) => {
    // console.log(searchTerm);
    if (searchTerm.trim() && onSearch) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="搜尋 youtube 影片..."
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
      />
    </div>
  );
}
