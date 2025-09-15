import { Link,useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useVideoContext } from '../context/VideoDataContext';


export default function Navbar() {
  const { setSarchResults } = useVideoContext();
  const location = useLocation();
  useEffect(()=>{
    if(location.pathname === '/'){
      setSarchResults([]);
    }
  },[location.pathname])
  
  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex gap-4">
        <Link to="/" className="font-bold text-lg">
          YouTube Analytics
        </Link>
       
      </div>
      
    </nav>
  );
}
