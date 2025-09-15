import { useVideoContext } from '../context/VideoDataContext';
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const COLORS = [
  '#729dddff',
  '#d84d99ff',
  '#ffd877ff',
  '#23a7a7ff',
  '#b49ae7ff',
  '#FF9F40',
  '#df9292ff',
  '#1575c4ff',
  '#81C784',
  '#ac8401ff',
];

export default function ChannelAnalytics() {
  const { channelVideos } = useVideoContext();
  const navigate = useNavigate();
  // 獲取觀看數最多的前10個影片
  const Top10Videos = channelVideos
    .toSorted((a, b) => {
      return Number(b.statistics.viewCount) - Number(a.statistics.viewCount);
    })
    .slice(0, 10);

  console.log(Top10Videos);
  
  // 使用前10個影片生成圖表數據
  const chartData = Top10Videos.map((video) => ({
    name:
      video.snippet.title.length > 20
        ? video.snippet.title.slice(0, 10) + '...'
        : video.snippet.title,
    value: Number(video.statistics.viewCount),
    id:video.id,
  }));
  console.log(chartData.map((item) => item.id));

  const handleVideoDetail = (videoId) => {
    console.log(videoId);
    navigate(`/video/${videoId}`);
  };

  return (
    <>
      <div className="h-[100vh] pt-10">
        <h1 className="text-center text-3xl mb-1 font-semibold">TOP10影片的數據分析</h1>
        <p className='text-center text-sm text-gray-500 font-semibold'>點擊圖表查看影片詳情</p>
        <div className="flex items-center">
          <ResponsiveContainer width="100%" height={600}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}
                labelOffset={25}
                onClick={(data) => handleVideoDetail(data.id)}
                className='cursor-pointer'
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => new Intl.NumberFormat().format(value)}
              />
              <Legend
                iconSize={12} // 圖例圖標大小
                wrapperStyle={{
                  paddingLeft: '20px', // 圖例與饼图的距離
                  fontSize: '16px', // 圖例字體大小
                  lineHeight: '24px', // 行高
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
      </div>
    </>
  );
}
