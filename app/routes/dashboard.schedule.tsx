import { useState } from "react";
import { FaCalendarAlt, FaPlus, FaEllipsisH, FaTiktok, FaInstagram, FaYoutube, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Schedule() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };
  
  // Format date to display month and year
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };
  
  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Check if a date has scheduled posts
  const hasScheduledPosts = (date: Date) => {
    return scheduledPosts.some(post => {
      const postDate = new Date(post.scheduledDate);
      return postDate.getDate() === date.getDate() && 
             postDate.getMonth() === date.getMonth() && 
             postDate.getFullYear() === date.getFullYear();
    });
  };
  
  // Get posts for a specific date
  const getPostsForDate = (date: Date) => {
    if (!date) return [];
    
    return scheduledPosts.filter(post => {
      const postDate = new Date(post.scheduledDate);
      return postDate.getDate() === date.getDate() && 
             postDate.getMonth() === date.getMonth() && 
             postDate.getFullYear() === date.getFullYear();
    });
  };
  
  // Handle date click
  const handleDateClick = (date: Date | null) => {
    if (!date) return;
    setSelectedDate(date);
  };
  
  // Get platform icon
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'tiktok':
        return <FaTiktok className="text-pink-500" />;
      case 'instagram':
        return <FaInstagram className="text-purple-500" />;
      case 'youtube':
        return <FaYoutube className="text-red-500" />;
      case 'facebook':
        return <FaFacebook className="text-blue-500" />;
      case 'twitter':
        return <FaTwitter className="text-gray-400" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Content Schedule</h2>
        <button 
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 transition rounded-lg flex items-center"
          onClick={() => setShowModal(true)}
        >
          <FaPlus className="mr-2" />
          <span>Schedule New</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">{formatMonthYear(currentMonth)}</h3>
            <div className="flex space-x-2">
              <button 
                className="p-2 bg-gray-700 hover:bg-gray-600 transition rounded-lg"
                onClick={prevMonth}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                className="p-2 bg-gray-700 hover:bg-gray-600 transition rounded-lg"
                onClick={nextMonth}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div key={index} className="text-center text-gray-400 font-medium py-2">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {getDaysInMonth(currentMonth).map((date, index) => (
              <div 
                key={index} 
                className={`aspect-square p-1 rounded-lg border ${
                  !date ? 'border-transparent' : 
                  selectedDate && date && 
                  selectedDate.getDate() === date.getDate() && 
                  selectedDate.getMonth() === date.getMonth() && 
                  selectedDate.getFullYear() === date.getFullYear() 
                    ? 'border-blue-500 bg-blue-500/20' 
                    : 'border-gray-700 hover:border-gray-500 cursor-pointer'
                }`}
                onClick={() => handleDateClick(date)}
              >
                {date && (
                  <>
                    <div className="text-right mb-1">
                      <span className={`text-sm ${
                        new Date().toDateString() === date.toDateString() 
                          ? 'bg-blue-500 text-white rounded-full w-6 h-6 inline-flex items-center justify-center' 
                          : ''
                      }`}>
                        {date.getDate()}
                      </span>
                    </div>
                    {hasScheduledPosts(date) && (
                      <div className="flex flex-wrap gap-1">
                        {getPostsForDate(date).slice(0, 3).map((post, i) => (
                          <div 
                            key={i} 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: getPlatformColor(post.platforms[0]) }}
                          ></div>
                        ))}
                        {getPostsForDate(date).length > 3 && (
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Scheduled Posts for Selected Date */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">
            {selectedDate 
              ? `Posts for ${selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` 
              : 'Upcoming Posts'
            }
          </h3>
          
          <div className="space-y-4">
            {selectedDate 
              ? getPostsForDate(selectedDate).length > 0 
                ? getPostsForDate(selectedDate).map((post, index) => (
                    <ScheduledPostCard key={index} post={post} />
                  ))
                : <p className="text-gray-400">No posts scheduled for this date.</p>
              : upcomingPosts.map((post, index) => (
                  <ScheduledPostCard key={index} post={post} />
                ))
            }
          </div>
        </div>
      </div>
      
      {/* Upcoming Week Overview */}
      <div className="mt-8 bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Weekly Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {getWeekDays().map((day, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <h4 className="font-medium text-center mb-2">
                {day.toLocaleDateString('en-US', { weekday: 'short' })}
                <span className="block text-sm text-gray-400">
                  {day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </h4>
              
              <div className="space-y-2">
                {getPostsForDate(day).map((post, i) => (
                  <div key={i} className="bg-gray-800 rounded p-2 text-sm">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded overflow-hidden mr-2">
                        <img 
                          src={post.thumbnail} 
                          alt={post.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="truncate">{post.title}</div>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <div className="text-gray-400">{formatTime(post.scheduledDate)}</div>
                      <div className="flex space-x-1">
                        {post.platforms.slice(0, 2).map((platform, j) => (
                          <span key={j} className="text-xs">
                            {getPlatformIcon(platform)}
                          </span>
                        ))}
                        {post.platforms.length > 2 && (
                          <span className="text-xs text-gray-400">+{post.platforms.length - 2}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {getPostsForDate(day).length === 0 && (
                  <div className="text-center text-sm text-gray-500 py-2">
                    No posts
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Schedule Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Schedule New Post</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Select Video</label>
                <select className="w-full bg-gray-700 rounded px-3 py-2">
                  <option value="">-- Select a video --</option>
                  <option value="1">Travel Vlog #12</option>
                  <option value="2">Cooking Recipe: Pasta</option>
                  <option value="3">Morning Routine</option>
                  <option value="4">Home Workout</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Platforms</label>
                <div className="grid grid-cols-3 gap-2">
                  {['tiktok', 'instagram', 'youtube', 'facebook', 'twitter'].map((platform) => (
                    <div key={platform} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={platform} 
                        className="mr-2"
                      />
                      <label htmlFor={platform} className="text-sm flex items-center">
                        {getPlatformIcon(platform)}
                        <span className="ml-1">{getPlatformName(platform)}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Date</label>
                  <input 
                    type="date" 
                    className="w-full bg-gray-700 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb<boltAction type="file" filePath="app/routes/dashboard.schedule.tsx">
                  <label className="block text-sm text-gray-400 mb-1">Time</label>
                  <input 
                    type="time" 
                    className="w-full bg-gray-700 rounded px-3 py-2"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Caption/Description</label>
                <textarea 
                  className="w-full bg-gray-700 rounded px-3 py-2 h-24"
                  placeholder="Enter caption or description..."
                ></textarea>
              </div>
              
              <div className="flex justify-between pt-4">
                <button 
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 transition rounded-lg"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 transition rounded-lg"
                  onClick={() => setShowModal(false)}
                >
                  Schedule Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ScheduledPostCard({ post }: { post: any }) {
  return (
    <div className="bg-gray-700 rounded-lg p-3">
      <div className="flex">
        <div className="w-16 h-16 rounded overflow-hidden mr-3">
          <img 
            src={post.thumbnail} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-medium">{post.title}</h4>
          <p className="text-sm text-gray-400 mb-1">
            {formatDateTime(post.scheduledDate)}
          </p>
          <div className="flex space-x-1">
            {post.platforms.map((platform: string, index: number) => (
              <div 
                key={index} 
                className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center"
                title={getPlatformName(platform)}
              >
                {getPlatformIcon(platform)}
              </div>
            ))}
          </div>
        </div>
        <div>
          <button className="p-2 text-gray-400 hover:text-white">
            <FaEllipsisH />
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: '2-digit'
  });
}

function formatTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit'
  });
}

function getPlatformName(platform: string) {
  switch (platform) {
    case 'tiktok':
      return 'TikTok';
    case 'instagram':
      return 'Instagram';
    case 'youtube':
      return 'YouTube';
    case 'facebook':
      return 'Facebook';
    case 'twitter':
      return 'X';
    default:
      return platform;
  }
}

function getPlatformColor(platform: string) {
  switch (platform) {
    case 'tiktok':
      return '#ff0050';
    case 'instagram':
      return '#c13584';
    case 'youtube':
      return '#ff0000';
    case 'facebook':
      return '#1877f2';
    case 'twitter':
      return '#657786';
    default:
      return '#888888';
  }
}

function getWeekDays() {
  const today = new Date();
  const days = [];
  
  // Start with today
  days.push(today);
  
  // Add the next 6 days
  for (let i = 1; i < 7; i++) {
    const nextDay = new Date();
    nextDay.setDate(today.getDate() + i);
    days.push(nextDay);
  }
  
  return days;
}

// Sample data
const scheduledPosts = [
  {
    id: 1,
    title: 'Travel Vlog #12',
    thumbnail: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    scheduledDate: '2023-08-15T09:30:00',
    platforms: ['tiktok', 'instagram', 'youtube']
  },
  {
    id: 2,
    title: 'Cooking Recipe: Pasta Carbonara',
    thumbnail: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFzdGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    scheduledDate: '2023-08-16T12:00:00',
    platforms: ['tiktok', 'instagram', 'facebook']
  },
  {
    id: 3,
    title: 'Morning Routine for Productivity',
    thumbnail: 'https://images.unsplash.com/photo-1484627147104-f5197bcd6651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vcm5pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    scheduledDate: '2023-08-18T08:00:00',
    platforms: ['youtube', 'facebook']
  },
  {
    id: 4,
    title: 'Home Workout - No Equipment Needed',
    thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29ya291dHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    scheduledDate: '2023-08-20T16:30:00',
    platforms: ['tiktok', 'instagram']
  },
  {
    id: 5,
    title: 'Tech Review: Latest Smartphone',
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGhvbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    scheduledDate: '2023-08-22T14:00:00',
    platforms: ['youtube', 'twitter']
  },
  {
    id: 6,
    title: '5 Minute Meditation for Beginners',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaXRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    scheduledDate: '2023-08-25T07:30:00',
    platforms: ['instagram', 'facebook', 'youtube']
  }
];

// Get upcoming posts (next 3 days)
const upcomingPosts = scheduledPosts
  .filter(post => {
    const postDate = new Date(post.scheduledDate);
    const today = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setDate(today.getDate() + 3);
    
    return postDate >= today && postDate <= threeDaysLater;
  })
  .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());
