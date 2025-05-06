import { useState } from "react";
import { FaCloudUploadAlt, FaFileVideo, FaTrash, FaCheck, FaSpinner } from "react-icons/fa";

export default function Upload() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  const [uploadStatus, setUploadStatus] = useState<{[key: string]: 'pending' | 'uploading' | 'processing' | 'complete' | 'error'}>({});

  // Handle drag events
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Handle file input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  // Process the files
  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files).filter(file => 
      file.type.startsWith('video/') || file.type.startsWith('image/')
    );
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Initialize progress and status for new files
    const newProgress: {[key: string]: number} = {};
    const newStatus: {[key: string]: 'pending' | 'uploading' | 'processing' | 'complete' | 'error'} = {};
    
    newFiles.forEach(file => {
      const fileId = `${file.name}-${file.size}-${Date.now()}`;
      newProgress[fileId] = 0;
      newStatus[fileId] = 'pending';
    });
    
    setUploadProgress(prev => ({...prev, ...newProgress}));
    setUploadStatus(prev => ({...prev, ...newStatus}));
    
    // Simulate upload for each file
    newFiles.forEach(file => {
      simulateUpload(file);
    });
  };

  // Simulate file upload with progress
  const simulateUpload = (file: File) => {
    const fileId = `${file.name}-${file.size}-${Date.now()}`;
    
    // Set status to uploading
    setUploadStatus(prev => ({...prev, [fileId]: 'uploading'}));
    
    // Simulate progress updates
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Set status to processing after upload completes
        setUploadStatus(prev => ({...prev, [fileId]: 'processing'}));
        
        // Simulate processing time
        setTimeout(() => {
          // Set status to complete
          setUploadStatus(prev => ({...prev, [fileId]: 'complete'}));
        }, 1500);
      }
      
      setUploadProgress(prev => ({...prev, [fileId]: progress}));
    }, 300);
  };

  // Remove a file from the list
  const removeFile = (file: File) => {
    setUploadedFiles(prev => prev.filter(f => f !== file));
  };

  // Get file size in readable format
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get status icon based on upload status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploading':
        return <FaSpinner className="animate-spin text-blue-500" />;
      case 'processing':
        return <FaSpinner className="animate-spin text-yellow-500" />;
      case 'complete':
        return <FaCheck className="text-green-500" />;
      case 'error':
        return <FaTrash className="text-red-500" />;
      default:
        return <FaFileVideo className="text-gray-400" />;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Upload Videos</h2>
      
      {/* Upload Area */}
      <div 
        className={`border-2 border-dashed rounded-lg p-10 text-center ${
          dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-blue-500'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <FaCloudUploadAlt className="mx-auto text-5xl text-gray-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Drag and drop your videos here</h3>
        <p className="text-gray-400 mb-6">or click to browse your files</p>
        <label className="px-6 py-3 bg-blue-500 hover:bg-blue-600 transition rounded-lg inline-block cursor-pointer">
          <span>Select Files</span>
          <input 
            type="file" 
            className="hidden" 
            multiple 
            accept="video/*,image/*" 
            onChange={handleChange}
          />
        </label>
        <p className="mt-4 text-sm text-gray-500">
          Supported formats: MP4, MOV, AVI, WebM, JPG, PNG (for faceless videos)
        </p>
      </div>
      
      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Uploaded Files</h3>
          <div className="space-y-4">
            {uploadedFiles.map((file, index) => {
              const fileId = `${file.name}-${file.size}-${Date.now()}`;
              const progress = uploadProgress[fileId] || 0;
              const status = uploadStatus[fileId] || 'pending';
              
              return (
                <div key={index} className="bg-gray-800 rounded-lg p-4 flex items-center">
                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mr-4">
                    {getStatusIcon(status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium truncate">{file.name}</span>
                      <span className="text-sm text-gray-400">{formatFileSize(file.size)}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          status === 'complete' ? 'bg-green-500' : 
                          status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                        }`} 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-400">
                        {status === 'uploading' ? 'Uploading...' : 
                         status === 'processing' ? 'Processing...' : 
                         status === 'complete' ? 'Complete' : 
                         status === 'error' ? 'Error' : 'Pending'}
                      </span>
                      <span className="text-xs text-gray-400">{Math.round(progress)}%</span>
                    </div>
                  </div>
                  <button 
                    className="ml-4 text-gray-400 hover:text-red-500 transition"
                    onClick={() => removeFile(file)}
                  >
                    <FaTrash />
                  </button>
                </div>
              );
            })}
          </div>
          
          {/* Actions */}
          <div className="mt-6 flex justify-between">
            <button 
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 transition rounded-lg"
              onClick={() => setUploadedFiles([])}
            >
              Clear All
            </button>
            <button 
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 transition rounded-lg"
              onClick={() => window.location.href = '/dashboard'}
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
