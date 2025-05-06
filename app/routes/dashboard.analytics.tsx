import { useState } from "react";
import { FaChartLine, FaEye, FaThumbsUp, FaComment, FaShare, FaCalendarAlt, FaFilter } from "react-icons/fa<boltAction type="file" filePath="app/routes/dashboard.analytics.tsx">
import { useState } from "react";
import { FaChartLine, FaEye, FaThumbsUp, FaComment, FaShare, FaCalendarAlt, FaFilter } from "react-icons/fa";

export default function Analytics() {
  const [dateRange, setDateRange] = useState('last7days');
  const [platform, setPlatform] = useState('all');
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>
      
      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Date Range</label>
          <div className="relative">
            <select 
              className="bg-gray-700 rounded px-4 py-2 pr-8 appearance-none w-40"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="custom">Custom Range</option>
            </select>
            <FaCalendarAlt className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm text-gray-400 mb-1">Platform</label>
          <div className="relative">
            <select 
              className="bg-gray-700 rounded px-4 py-2 pr-8 appearance-none w-40"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="all">All Platforms</option>
              <option value="tiktok">TikTok</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
              <option value="facebook">Facebook</option>
              <option value="twitter">X (Twitter)</option>
            </select>
            <FaFilter className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {overviewMetrics.map((metric, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">{metric.name}</p>
                <h3 className="text-2xl font-bold">{metric.value}</h3>
                <p className={`text-sm flex items-center mt-1 ${metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change >= 0 ? '↑' : '↓'} {Math.abs(metric.change)}% from previous period
                </p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg">
                <metric.icon className="text-blue-500 text-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Performance Chart */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold mb-4">Performance Over Time</h3>
        <div className="h-80 w-full">
          {/* This would be replaced with an actual chart component */}
          <div className="bg-gray-700 h-full w-full rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FaChartLine className="text-blue-500 text-4xl mx-auto mb-4" />
              <p className="text-gray-400">Performance chart would be rendered here</p>
              <p className="text-sm text-gray-500 mt-2">Using a library like Chart.js or Recharts</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Top Performing Videos */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold mb-4">Top Performing Videos</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4">Video</th>
                <th className="text-right py-3 px-4">Views</th>
                <th className="text-right py-3 px-4">Likes</th>
                <th className="text-right py-3 px-4">Comments</th>
                <th className="text-right py-3 px-4">Shares</th>
                <th className="text-right py-3 px-4">Platforms</th>
              </tr>
            </thead>
            <tbody>
              {topVideos.map((video, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded overflow-hidden mr-3">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{video.title}</p>
                        <p className="text-sm text-gray-400">{video.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-right py-3 px-4">{video.views}</td>
                  <td className="text-right py-3 px-4">{video.likes}</td>
                  <td className="text-right py-3 px-4">{video.comments}</td>
                  <td className="text-right py-3 px-4">{video.shares}</td>
                  <td className="text-right py-3 px-4">
                    <div className="flex justify-end space-x-1">
                      {video.platforms.map((platform, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center">
                          {getPlatformIcon(platform)}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Platform Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Platform Breakdown</h3>
          <div className="h-64">
            {/* This would be replaced with an actual chart component */}
            <div className="bg-gray-700 h-full w-full rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-400">Platform distribution chart</p>
                <p className="text-sm text-gray-500 mt-2">Pie or donut chart</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {platformBreakdown.map((platform, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${platform.color}`}></div>
                <span className="text-sm">{platform.name}: {platform.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Audience Demographics</h3>
          <div className="h-64">
            {/* This would be replaced with an actual chart component */}
            <div className="bg-gray-700 h-full w-full rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-400">Demographics chart</p>
                <p className="text-sm text-gray-500 mt-2">Bar or column chart</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h4 className="font-medium mb-2">Age Groups</h4>
              <div className="space-y-2">
                {ageGroups.map((group, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-sm w-16">{group.age}</span>
                    <div className="flex-1 bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-500 h-full" 
                        style={{ width: `${group.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm ml-2">{group.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Gender</h4>
              <div className="space-y-2">
                {genderData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-sm w-16">{item.gender}</span>
                    <div className="flex-1 bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color}`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm ml-2">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getPlatformIcon(platform: string) {
  switch (platform) {
    case 'tiktok':
      return <FaShare className="text-pink-500 text-xs" />;
    case 'instagram':
      return <FaShare className="text-purple-500 text-xs" />;
    case 'youtube':
      return <FaShare className="text-red-500 text-xs" />;
    case 'facebook':
      return <FaShare className="text-blue-500 text-xs" />;
    case 'twitter':
      return <FaShare className="text-gray-400 text-xs" />;
    default:
      return null;
  }
}

const overviewMetrics = [
  {
    name: 'Total Views',
    value: '1.2M',
    change: 12.5,
    icon: FaEye
  },
  {
    name: 'Total Likes',
    value: '87.4K',
    change: 8.3,
    icon: FaThumbsUp
  },
  {
    name: 'Total Comments',
    value: '5.2K',
    change: -2.1,
    icon: FaComment
  },
  {
    name: 'Total Shares',
    value: '12.8K',
    change: 24.7,
    icon: FaShare
  }
];

const topVideos = [
  {
    title: 'Top 10 Travel Tips for 2023',
    thumbnail: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    date: '2 days ago',
    views: '245K',
    likes: '18.2K',
    comments: '1.2K',
    shares: '3.5K',
    platforms: ['tiktok', 'instagram', 'youtube']
  },
  {
    title: 'Easy Cooking Recipe: Pasta Carbonara',
    thumbnail: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFzdGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    date: '5 days ago',
    views: '189K',
    likes: '15.7K',
    comments: '876',
    shares: '2.1K',
    platforms: ['tiktok', 'instagram', 'facebook']
  },
  {
    title: 'Morning Routine for Productivity',
    thumbnail: 'https://images.unsplash.com/photo-1484627147104-f5197bcd6651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vcm5pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    date: '1 week ago',
    views: '156K',
    likes: '12.3K',
    comments: '743',
    shares: '1.8K',
    platforms: ['youtube', 'facebook', 'twitter']
  },
  {
    title: 'Home Workout - No Equipment Needed',
    thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29ya291dHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    date: '2 weeks ago',
    views: '132K',
    likes: '9.8K',
    comments: '512',
    shares: '1.2K',
    platforms: ['tiktok', 'instagram']
  }
];

const platformBreakdown = [
  { name: 'TikTok', percentage: 42, color: 'bg-pink-500' },
  { name: 'Instagram', percentage: 28, color: 'bg-purple-500' },
  { name: 'YouTube', percentage: 18, color: 'bg-red-500' },
  { name: 'Facebook', percentage: 8, color: 'bg-blue-500' },
  { name: 'X (Twitter)', percentage: 4, color: 'bg-gray-400' }
];

const ageGroups = [
  { age: '13-17', percentage: 12 },
  { age: '18-24', percentage: 38 },
  { age: '25-34', percentage: 27 },
  { age: '35-44', percentage: 15 },
  { age: '45+', percentage: 8 }
];

const genderData = [
  { gender: 'Female', percentage: 58, color: 'bg-pink-500' },
  { gender: 'Male', percentage: 40, color: 'bg-blue-500' },
  { gender: 'Other', percentage: 2, color: 'bg-purple-500' }
];
