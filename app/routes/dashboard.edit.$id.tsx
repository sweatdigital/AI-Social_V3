import { useState } from "react";
import { useParams } from "@remix-run/react";
import { FaSave, FaUndo, FaRedo, FaFont, FaVolumeUp, FaCrop, FaMagic, FaImage, FaEye, FaDownload, FaShareAlt } from "react-icons/fa";

export default function EditVideo() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("edit");
  const [aiProcessing, setAiProcessing] = useState(false);

  // Simulate AI processing
  const handleAIEnhance = () => {
    setAiProcessing(true);
    setTimeout(() => {
      setAiProcessing(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 overflow-hidden flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Edit Video: Travel Vlog #12</h2>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition flex items-center">
              <FaUndo className="mr-2" />
              <span>Undo</span>
            </button>
            <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition flex items-center">
              <FaRedo className="mr-2" />
              <span>Redo</span>
            </button>
            <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition flex items-center">
              <FaSave className="mr-2" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Tools */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">AI Tools</h3>
            <div className="space-y-3">
              <button 
                className="w-full p-3 bg-blue-500 hover:bg-blue-600 transition rounded flex items-center justify-center"
                onClick={handleAIEnhance}
                disabled={aiProcessing}
              >
                <FaMagic className="mr-2" />
                <span>{aiProcessing ? "Processing..." : "AI Enhance"}</span>
              </button>
              
              <div className="p-3 bg-gray-700 rounded">
                <h4 className="font-medium mb-2">Smart Trim</h4>
                <p className="text-sm text-gray-400 mb-2">Automatically remove silent or low-quality segments</p>
                <button className="w-full py-2 bg-gray-600 hover:bg-gray-500 transition rounded text-sm">
                  Apply
                </button>
              </div>
              
              <div className="p-3 bg-gray-700 rounded">
                <h4 className="font-medium mb-2">Auto Subtitles</h4>
                <p className="text-sm text-gray-400 mb-2">Generate accurate subtitles with AI</p>
                <div className="flex space-x-2 mb-2">
                  <select className="bg-gray-600 rounded px-2 py-1 text-sm flex-1">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                  <button className="py-1 px-2 bg-gray-600 hover:bg-gray-500 transition rounded text-sm">
                    Add
                  </button>
                </div>
              </div>
              
              <div className="p-3 bg-gray-700 rounded">
                <h4 className="font-medium mb-2">Face Enhancement</h4>
                <p className="text-sm text-gray-400 mb-2">Improve facial clarity and lighting</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Intensity</span>
                  <input type="range" min="0" max="100" className="w-32" />
                </div>
                <button className="w-full mt-2 py-2 bg-gray-600 hover:bg-gray-500 transition rounded text-sm">
                  Apply
                </button>
              </div>
              
              <div className="p-3 bg-gray-700 rounded">
                <h4 className="font-medium mb-2">Scene Detection</h4>
                <p className="text-sm text-gray-400 mb-2">Automatically detect and mark scene changes</p>
                <button className="w-full py-2 bg-gray-600 hover:bg-gray-500 transition rounded text-sm">
                  Detect Scenes
                </button>
              </div><boltAction type="file" filePath="app/routes/dashboard.edit.$id.tsx">
              <div className="p-3 bg-gray-700 rounded">
                <h4 className="font-medium mb-2">AI Voiceover</h4>
                <p className="text-sm text-gray-400 mb-2">Generate natural-sounding voiceovers</p>
                <div className="flex space-x-2 mb-2">
                  <select className="bg-gray-600 rounded px-2 py-1 text-sm flex-1">
                    <option>Male (Neutral)</option>
                    <option>Female (Neutral)</option>
                    <option>Male (Enthusiastic)</option>
                    <option>Female (Enthusiastic)</option>
                  </select>
                </div>
                <button className="w-full mt-2 py-2 bg-gray-600 hover:bg-gray-500 transition rounded text-sm">
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Editing Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Video Preview */}
          <div className="bg-black aspect-video relative">
            <video 
              src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              className="w-full h-full" 
              controls
            ></video>
            
            {/* Overlay for subtitles preview */}
            <div className="absolute bottom-16 left-0 right-0 flex justify-center">
              <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded text-center">
                This is a sample subtitle text that would appear here
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="h-48 bg-gray-800 border-t border-gray-700 p-4">
            <div className="flex mb-2">
              <button 
                className={`px-4 py-2 rounded-t ${activeTab === 'edit' ? 'bg-gray-700' : 'bg-gray-800'}`}
                onClick={() => setActiveTab('edit')}
              >
                Edit
              </button>
              <button 
                className={`px-4 py-2 rounded-t ${activeTab === 'audio' ? 'bg-gray-700' : 'bg-gray-800'}`}
                onClick={() => setActiveTab('audio')}
              >
                Audio
              </button>
              <button 
                className={`px-4 py-2 rounded-t ${activeTab === 'text' ? 'bg-gray-700' : 'bg-gray-800'}`}
                onClick={() => setActiveTab('text')}
              >
                Text
              </button>
            </div>
            
            <div className="bg-gray-700 rounded p-3 h-32">
              {/* Timeline visualization would go here */}
              <div className="w-full h-full flex flex-col">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>0:00</span>
                  <span>0:30</span>
                  <span>1:00</span>
                  <span>1:30</span>
                  <span>2:00</span>
                  <span>2:30</span>
                </div>
                <div className="flex-1 bg-gray-800 rounded relative">
                  {/* Video track */}
                  <div className="absolute top-1 left-0 right-0 h-6 flex">
                    <div className="bg-blue-900 rounded w-3/4 flex items-center px-2">
                      <span className="text-xs truncate">Main video track</span>
                    </div>
                  </div>
                  
                  {/* Audio track */}
                  <div className="absolute top-10 left-0 right-0 h-4 flex">
                    <div className="bg-green-900 rounded w-full flex items-center px-2">
                      <span className="text-xs truncate">Audio track</span>
                    </div>
                  </div>
                  
                  {/* Subtitle track */}
                  <div className="absolute top-16 left-0 right-0 h-4 flex">
                    <div className="bg-yellow-900 rounded w-1/2 ml-10 flex items-center px-2">
                      <span className="text-xs truncate">Subtitles</span>
                    </div>
                  </div>
                  
                  {/* Playhead */}
                  <div className="absolute top-0 bottom-0 w-px bg-red-500 left-1/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-72 bg-gray-800 border-l border-gray-700 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Properties</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Video Settings</h4>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Resolution</label>
                    <select className="w-full bg-gray-700 rounded px-3 py-2">
                      <option>1080p (1920x1080)</option>
                      <option>720p (1280x720)</option>
                      <option>Square (1080x1080)</option>
                      <option>Portrait (1080x1920)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Frame Rate</label>
                    <select className="w-full bg-gray-700 rounded px-3 py-2">
                      <option>30 fps</option>
                      <option>60 fps</option>
                      <option>24 fps</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Export Settings</h4>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Format</label>
                    <select className="w-full bg-gray-700 rounded px-3 py-2">
                      <option>MP4 (H.264)</option>
                      <option>MOV (ProRes)</option>
                      <option>WebM (VP9)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Quality</label>
                    <select className="w-full bg-gray-700 rounded px-3 py-2">
                      <option>High (Larger file)</option>
                      <option>Medium (Balanced)</option>
                      <option>Low (Smaller file)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-700">
                <div className="flex space-x-2">
                  <button className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 transition rounded flex items-center justify-center">
                    <FaEye className="mr-2" />
                    <span>Preview</span>
                  </button>
                  <button className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 transition rounded flex items-center justify-center">
                    <FaDownload className="mr-2" />
                    <span>Export</span>
                  </button>
                </div>
                <button className="w-full mt-2 py-2 bg-blue-500 hover:bg-blue-600 transition rounded flex items-center justify-center">
                  <FaShareAlt className="mr-2" />
                  <span>Publish</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
