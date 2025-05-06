import { useState } from "react";
import { FaVideo, FaImage, FaVolumeUp, FaFont, FaRobot, FaCheck, FaArrowRight } from "react-icons/fa";

export default function CreateVideo() {
  const [step, setStep] = useState(1);
  const [videoType, setVideoType] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  
  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleGenerate = () => {
    setGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGenerating(false);
      setStep(4); // Move to preview step
    }, 3000);
  };
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Video</h2>
      
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= i ? 'bg-blue-500' : 'bg-gray-700'
                }`}
              >
                {step > i ? (
                  <FaCheck />
                ) : (
                  <span>{i}</span>
                )}
              </div>
              <span className="text-sm mt-2 text-gray-400">
                {i === 1 ? 'Type' : i === 2 ? 'Content' : i === 3 ? 'Generate' : 'Preview'}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-4">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-700"></div>
          <div 
            className="absolute top-0 left-0 h-1 bg-blue-500 transition-all duration-300"
            style={{ width: `${(step - 1) * 33.33}%` }}
          ></div>
        </div>
      </div>
      
      {/* Step 1: Choose Video Type */}
      {step === 1 && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-6">Choose Video Type</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              className={`p-6 rounded-lg border-2 cursor-pointer ${
                videoType === 'faceless' 
                  ? 'border-blue-500 bg-blue-500/10' 
                  : 'border-gray-700 hover:border-blue-500'
              }`}
              onClick={() => setVideoType('faceless')}
            >
              <div className="flex items-start">
                <div className="bg-gray-700 p-4 rounded-lg mr-4">
                  <FaRobot className="text-blue-500 text-2xl" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">Faceless AI Video</h4>
                  <p className="text-gray-400">
                    Create engaging videos with AI-generated voiceovers, text animations, and dynamic visuals.
                    Perfect for informational and educational content.
                  </p>
                </div>
              </div>
            </div>
            
            <div 
              className={`p-6 rounded-lg border-2 cursor-pointer ${
                videoType === 'upload' 
                  ? 'border-blue-500 bg-blue-500/10' 
                  : 'border-gray-700 hover:border-blue-500'
              }`}
              onClick={() => setVideoType('upload')}
            >
              <div className="flex items-start">
                <div className="bg-gray-700 p-4 rounded-lg mr-4">
                  <FaVideo className="text-blue-500 text-2xl" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">Upload & Enhance</h4>
                  <p className="text-gray-400">
                    Upload your existing video and enhance it with AI tools like subtitles, face enhancement, 
                    and smart trimming.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button 
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 transition rounded-lg flex items-center"
              onClick={handleNext}
              disabled={!videoType}
            >
              <span>Next</span>
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      )}
      
      {/* Step 2: Content Input */}
      {step === 2 && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-6">
            {videoType === 'faceless' ? 'Create Faceless Video' : 'Upload Video'}
          </h3>
          
          {videoType === 'faceless' ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Video Topic/Title</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-700 rounded px-4 py-3"
                  placeholder="E.g., '5 Tips for Better Sleep' or 'How to Make Perfect Pasta'"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Script Content</label>
                <textarea 
                  className="w-full bg-gray-700 rounded px-4 py-3 h-40"
                  placeholder="Write your video script here. This will be used for voiceover and content generation."
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Voice Style</label>
                  <select className="w-full bg-gray-700 rounded px-4 py-3">
                    <option value="male-neutral">Male (Neutral)</option>
                    <option value="female-neutral">Female (Neutral)</option>
                    <option value="male-enthusiastic">Male (Enthusiastic)</option>
                    <option value="female-enthusiastic">Female (Enthusiastic)</option>
                    <option value="male-professional">Male (Professional)</option>
                    <option value="female-professional">Female (Professional)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Visual Style</label>
                  <select className="w-full bg-gray-700 rounded px-4 py-3">
                    <option value="minimal">Minimal</option>
                    <option value="dynamic">Dynamic</option>
                    <option value="infographic">Infographic</option>
                    <option value="modern">Modern</option>
                    <option value="vintage">Vintage</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Background Images/Videos (Optional)</label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                  <FaImage className="mx-auto text-3xl text-gray-500 mb-4" />
                  <p className="text-gray-400 mb-4">Drag and drop images or videos to use as backgrounds</p>
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 transition rounded-lg">
                    Browse Files
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-10 text-center">
                <FaVideo className="mx-auto text-5xl text-gray-500 mb-4" />
                <h4 className="text-lg font-semibold mb-2">Drag and drop your video here</h4>
                <p className="text-gray-400 mb-6">or click to browse your files</p>
                <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 transition rounded-lg">
                  Select Video
                </button>
                <p className="mt-4 text-sm text-gray-500">
                  Supported formats: MP4, MOV, AVI, WebM (Max 500MB)
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">AI Enhancement Options</h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span>Auto-generate subtitles</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span>Face enhancement</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span>Smart trim (remove silent parts)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Background music</span>
                  </label>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-8 flex justify-between">
            <button 
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 transition rounded-lg"
              onClick={handleBack}
            >
              Back
            </button>
            <button 
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 transition rounded-lg flex items-center"
              onClick={handleNext}
            >
              <span>Next</span>
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      )}
      
      {/* Step 3: Generate */}
      {step === 3 && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-6">Generate Video</h3>
          
          <div className="text-center py-10">
            {generating ? (
              <div>
                <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <h4 className="text-lg font-semibold mb-2">Generating Your Video...</h4>
                <p className="text-gray-400 mb-6">
                  Our AI is working its magic. This may take a few minutes.
                </p>
                <div className="max-w-md mx-auto bg-gray-700 rounded-full h-4 overflow-hidden">
                  <div className="bg-blue-500 h-full animate-pulse"></div>
                </div>
              </div>
            ) : (
              <div>
                <div className="bg-gray-700 p-6 rounded-full inline-block mb-6">
                  <FaRobot className="text-blue-500 text-5xl" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Ready to Generate Your Video</h4>
                <p className="text-gray-400 mb-6 max-w-lg mx-auto">
                  Our AI will now create your video based on your inputs. This process may take a few minutes 
                  depending on the complexity and length of your content.
                </p>
                <button 
                  className="px-8 py-3 bg-blue-500 hover:bg-blue-600 transition rounded-lg"
                  onClick={handleGenerate}
                >
                  Generate Now
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-8 flex justify-between">
            <button 
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 transition rounded-lg"
              onClick={handleBack}
              disabled={generating}
            >
              Back
            </button>
          </div>
        </div>
      )}
      
      {/* Step 4: Preview */}
      {step === 4 && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-6">Preview & Finalize</h3>
          
          <div className="mb-6">
            <div className="bg-black aspect-video relative rounded-lg overflow-hidden">
              <video 
                src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                className="w-full h-full" 
                controls
              ></video>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold mb-3">Video Details</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Title</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-700 rounded px-3 py-2"
                    defaultValue="5 Tips for Better Sleep - Improve Your Sleep Quality"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Description</label>
                  <textarea 
                    className="w-full bg-gray-700 rounded px-3 py-2 h-24"
                    defaultValue="In this video, we share 5 science-backed tips to help you improve your sleep quality and wake up feeling refreshed. Try these simple techniques tonight!"
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Export Options</h4>
              <div className="space-y-3">
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
                  <label className="block text-sm text-gray-400 mb-1">Format</label>
                  <select className="w-full bg-gray-700 rounded px-3 py-2">
                    <option>MP4 (H.264)</option>
                    <option>MOV (ProRes)</option>
                    <option>WebM (VP9)</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span>Save to my library</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button 
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 transition rounded-lg"
              onClick={handleBack}
            >
              Back to Edit
            </button>
            <div className="flex space-x-3">
              <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 transition rounded-lg">
                Download
              </button>
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 transition rounded-lg">
                Save & Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
