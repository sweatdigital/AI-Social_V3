import { Link, Outlet } from "@remix-run/react";
import { FaVideo, FaUpload, FaHistory, FaCalendarAlt, FaChartLine, FaCog, FaSignOutAlt, FaPlus } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 hidden md:block">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center">
            <FaVideo className="text-blue-500 text-2xl mr-2" />
            <h1 className="text-xl font-bold">VideoAI</h1>
          </div>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/dashboard" className="flex items-center p-3 rounded-lg bg-blue-500 text-white">
                <FaVideo className="mr-3" />
                <span>My Videos</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/upload" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition">
                <FaUpload className="mr-3" />
                <span>Upload</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/history" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition">
                <FaHistory className="mr-3" />
                <span>History</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/schedule" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition">
                <FaCalendarAlt className="mr-3" />
                <span>Schedule</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/analytics" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition">
                <FaChartLine className="mr-3" />
                <span>Analytics</span>
              </Link>
            </li>
            <li className="border-t border-gray-700 mt-6 pt-4">
              <Link to="/dashboard/settings" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition">
                <FaCog className="mr-3" />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link to="/logout" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition">
                <FaSignOutAlt className="mr-3" />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="bg-gray-800 p-4 border-b border-gray-700 md:hidden">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FaVideo className="text-blue-500 text-xl mr-2" />
              <h1 className="text-lg font-bold">VideoAI</h1>
            </div>
            <button className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Videos</h2>
            <Link 
              to="/dashboard/create" 
              className="flex items-center bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded-lg"
            >
              <FaPlus className="mr-2" />
              <span>Create New</span>
            </Link>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          {/* Outlet for nested routes */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function VideoCard({ video }: { video: any }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition">
      <div className="relative">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full aspect-video object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded text-xs">
          {video.duration}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold mb-1 truncate">{video.title}</h3>
        <div className="flex justify-between text-sm text-gray-400">
          <span>{video.date}</span>
          <span className="flex items-center">
            <span className={`w-2 h-2 rounded-full mr-1 ${getStatusColor(video.status)}`}></span>
            {video.status}
          </span>
        </div>
        <div className="flex mt-3 space-x-2">
          <Link 
            to={`/dashboard/edit/${video.id}`}
            className="flex-1 text-center py-1 bg-blue-500 hover:bg-blue-600 transition rounded text-sm"
          >
            Edit
          </Link>
          <Link 
            to={`/dashboard/publish/${video.id}`}
            className="flex-1 text-center py-1 bg-gray-700 hover:bg-gray-600 transition rounded text-sm"
          >
            Publish
          </Link>
        </div>
      </div>
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'Published':
      return 'bg-green-500';
    case 'Scheduled':
      return 'bg-yellow-500';
    case 'Draft':
      return 'bg-gray-500';
    case 'Processing':
      return 'bg-blue-500';
    default:
      return 'bg-gray-500';
  }
}

// Sample data
const videos = [
  {
    id: 1,
    title: "Top 10 Travel Tips for 2023",
    thumbnail: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    duration: "2:45",
    date: "2 days ago",
    status: "Published"
  },
  {
    id: 2,
    title: "Easy Cooking Recipe: Pasta Carbonara",
    thumbnail: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFzdGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    duration: "3:12",
    date: "5 days ago",
    status: "Published"
  },
  {
    id: 3,
    title: "Morning Routine for Productivity",
    thumbnail: "https://images.unsplash.com/photo-1484627147104-f5197bcd6651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vcm5pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    duration: "4:30",
    date: "1 week ago",
    status: "Scheduled"
  },
  {
    id: 4,
    title: "Home Workout - No Equipment Needed",
    thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29ya291dHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    duration: "5:15",
    date: "2 weeks ago",
    status: "Draft"
  },
  {
    id: 5,
    title: "Tech Review: Latest Smartphone",
    thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGhvbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    duration: "8:22",
    date: "3 days ago",
    status: "Processing"
  },
  {
    id: 6,
    title: "5 Minute Meditation for Beginners",
    thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaXRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    duration: "5:05",
    date: "1 day ago",
    status: "Draft"
  }
];
