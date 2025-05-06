import { useState } from "react";
import { useParams, Link } from "@remix-run/react";
import { FaYoutube, FaTiktok, FaInstagram, FaFacebook, FaTwitter, FaCalendarAlt, FaGlobe, FaCheck, FaArrowLeft } from "react-icons/fa";

export default function PublishVideo() {
  const { id } = useParams();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['tiktok', 'instagram']);
  const [publishMode, setPublishMode] = useState<'now' | 'schedule'>('now');
  const [scheduleDate, setScheduleDate] = useState<string>('');
  const [scheduleTime, setScheduleTime] = useState<string>('');
  const [isGeneratingDescriptions, setIsGeneratingDescriptions] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const handlePlatformToggle = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const handleGenerateDescriptions = () => {
    setIsGeneratingDescriptions(true);
    // Simulate API call
    setTimeout(() => {
      setIsGeneratingDescriptions(false);
    }, 2000);
  };

  const handlePublish = () => {
    setIsPublishing(true);
    // Simulate API call
    setTimeout(() => {
      setIsPublishing(false);
      setPublishSuccess(true);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 overflow-auto">
      <div className="container mx-auto px-4 py-6">
        <Link to="/dashboard" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6">
          <FaArrowLeft className="mr-2" />
          <span>Back to Dashboard</span>
        </Link>

        {publishSuccess ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheck className="text-white text-3xl" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Successfully Published!</h2>
            <p className="text-gray-400 mb-6">
              Your video has been {publishMode === 'schedule' ? 'scheduled' : 'published'} to {selectedPlatforms.length} platforms.
              You can track its performance in the Analytics section.
            </p>
            <div className="flex space-x-4 justify-center">
              <Link 
                to="/dashboard/analytics" 
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 transition rounded-lg"
              >
                View Analytics
              </Link>
              <Link 
                to="/dashboard" 
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 transition rounded-lg"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Preview */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="aspect-video bg-black relative">
                <video 
                  src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                  className="w-full h-full" 
                  controls
                ></video>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">Travel Vlog #12</h2>
                <p className="text-gray-400 text-sm">
                  Duration: 2:45 • Edited 2 hours ago
                </p>
              </div>
            </div>

            {/* Publish Settings */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Publish Settings</h2>
              
              <div className="mb-6">
                <h3 className="font-medium mb-3">Select Platforms</h3>
                <div className="grid grid-cols-2 gap-3">
                  {platforms.map((platform) => (
                    <button
                      key={platform.id}
                      className={`p-3 rounded-lg border flex items-center ${
                        selectedPlatforms.includes(platform.id)
                          ? 'border-blue-500 bg-blue-500/20'
                          : 'border-gray-700 hover:border-gray-500'
                      }`}
                      onClick={() => handlePlatformToggle(platform.id)}
                    >
                      <platform.icon className={`text-2xl mr-3 ${platform.color}`} />
                      <span>{platform.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-3">When to Publish</h3>
                <div className="flex space-x-3 mb-4">
                  <button
                    className={`flex-1 p-3 rounded-lg border flex items-center justify-center ${
                      publishMode === 'now'
                        ? 'border-blue-500 bg-blue-500/20'
                        : 'border-gray-700 hover:border-gray-500'
                    }`}
                    onClick={() => setPublishMode('now')}
                  >
                    <FaGlobe className="mr-2" />
                    <span>Publish Now</span>
                  </button>
                  <button
                    className={`flex-1 p-3 rounded-lg border flex items-center justify-center ${
                      publishMode === 'schedule'
                        ? 'border-blue-500 bg-blue-500/20'
                        : 'border-gray-700 hover:border-gray-500'
                    }`}
                    onClick={() => setPublishMode('schedule')}
                  >
                    <FaCalendarAlt className="mr-2" />
                    <span>Schedule</span>
                  </button>
                </div>
                
                {publishMode === 'schedule' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Date</label>
                      <input 
                        type="date" 
                        className="w-full bg-gray-700 rounded px-3 py-2"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Time</label>
                      <input 
                        type="time" 
                        className="w-full bg-gray-700 rounded px-3 py-2"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <button
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 transition rounded-lg font-medium"
                onClick={handlePublish}
                disabled={isPublishing || selectedPlatforms.length === 0}
              >
                {isPublishing ? 'Publishing...' : publishMode === 'schedule' ? 'Schedule Publish' : 'Publish Now'}
              </button>
            </div>

            {/* Content Settings */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Content Settings</h2>
                <button 
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                  onClick={handleGenerateDescriptions}
                  disabled={isGeneratingDescriptions}
                >
                  {isGeneratingDescriptions ? 'Generating...' : 'Generate with AI'}
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Title</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-700 rounded px-3 py-2"
                    placeholder="Enter video title"
                    defaultValue="Travel Vlog #12 - Amazing Mountain Views"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Description</label>
                  <textarea 
                    className="w-full bg-gray-700 rounded px-3 py-2 h-24"
                    placeholder="Enter video description"
                    defaultValue="Join me on my latest adventure exploring the beautiful mountain trails! Don't forget to like and subscribe for more travel content."
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Tags</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-700 rounded px-3 py-2"
                    placeholder="Enter tags separated by commas"
                    defaultValue="travel, mountains, vlog, adventure, hiking"
                  />
                </div>
                
                <div>
                  <label className="flex items-center text-sm text-gray-400 mb-1">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span>Optimize content for each platform</span>
                  </label>
                  <p className="text-xs text-gray-500">
                    AI will automatically adjust your content to match the best practices for each platform
                  </p>
                </div>
                
                <div>
                  <label className="flex items-center text-sm text-gray-400 mb-1">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span>Add auto-generated hashtags</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const platforms = [
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: FaTiktok,
    color: 'text-pink-500'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: FaInstagram,
    color: 'text-purple-500'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: FaYoutube,
    color: 'text-red-500'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: FaFacebook,
    color: 'text-blue-500'
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    icon: FaTwitter,
    color: 'text-gray-400'
  }
];
