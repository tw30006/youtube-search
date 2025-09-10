import { useVideoContext } from "../context/VideoDataContext";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#729dddff",
  "#d84d99ff",
  "#ffd877ff",
  "#23a7a7ff",
  "#b49ae7ff",
  "#FF9F40",
  "#df9292ff",
  "#1575c4ff",
  "#81C784",
  "#ac8401ff",
];

export default function ChannelAnalytics() {
  const { channelVideos } = useVideoContext();

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
        ? video.snippet.title.slice(0, 10) + "..."
        : video.snippet.title,
    value: Number(video.statistics.viewCount),
  }));

  return (
    <>
      <div className="h-[100vh] pt-10">
        <h1 className="text-center text-2xl">TOP10影片的數據分析</h1>
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
                iconSize={12}
                wrapperStyle={{
                  paddingLeft: "20px",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
