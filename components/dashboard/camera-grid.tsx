'use client';

import React, { useState } from 'react';
import { MoreVertical, Maximize2, Video, VideoOff, Volume2, VolumeX, RefreshCw } from 'lucide-react';

// Mock camera data
const mockCameras = [
  { id: 1, name: 'Front Entrance', status: 'online', location: 'Main Building' },
  { id: 2, name: 'Parking Lot', status: 'online', location: 'North Side' },
  { id: 3, name: 'Rear Exit', status: 'online', location: 'Main Building' },
  { id: 4, name: 'Lobby', status: 'offline', location: 'Main Building' },
  { id: 5, name: 'Server Room', status: 'online', location: 'IT Department' },
  { id: 6, name: 'Corridor A', status: 'online', location: 'East Wing' },
];

// For a demo, we'll use static images, but in a real app these would be video streams
const getCameraPlaceholder = (id: number, status: string) => {
  if (status === 'offline') {
    return 'https://via.placeholder.com/500x280/1e293b/64748b?text=Camera+Offline';
  }
  // Use different images for different cameras to simulate various feeds
  return `https://picsum.photos/seed/camera${id}/500/280`;
};

const CameraGrid = () => {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [selectedCamera, setSelectedCamera] = useState<number | null>(null);
  const [mutedCameras, setMutedCameras] = useState<number[]>([]);

  const toggleMute = (cameraId: number) => {
    setMutedCameras(prev => 
      prev.includes(cameraId) 
        ? prev.filter(id => id !== cameraId) 
        : [...prev, cameraId]
    );
  };

  const toggleFullscreen = (cameraId: number) => {
    if (selectedCamera === cameraId) {
      setSelectedCamera(null);
    } else {
      setSelectedCamera(cameraId);
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-slate-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Live Camera Feeds</h2>
        <div className="flex items-center space-x-2">
          {/* Layout toggle buttons would go here */}
          <button
            onClick={() => setSelectedCamera(null)}
            className={`px-2 py-1 rounded text-sm ${
              selectedCamera === null ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            View All
          </button>
          <button className="text-gray-400 hover:text-white">
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      <div className="p-4">
        {selectedCamera === null ? (
          // Grid view
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockCameras.map((camera) => (
              <CameraCard
                key={camera.id}
                camera={camera}
                isMuted={mutedCameras.includes(camera.id)}
                onMuteToggle={() => toggleMute(camera.id)}
                onFullscreen={() => toggleFullscreen(camera.id)}
              />
            ))}
          </div>
        ) : (
          // Single camera view
          <div>
            {mockCameras
              .filter((camera) => camera.id === selectedCamera)
              .map((camera) => (
                <div key={camera.id} className="rounded-lg overflow-hidden">
                  <div className="relative">
                    <img
                      src={getCameraPlaceholder(camera.id, camera.status)}
                      alt={camera.name}
                      className="w-full h-auto"
                    />
                    <div className="absolute top-0 left-0 right-0 p-2 bg-gradient-to-b from-black/50 to-transparent flex justify-between items-center">
                      <div className="text-white font-medium">{camera.name}</div>
                      <div className="flex items-center space-x-2">
                        <button 
                          className="text-white hover:text-indigo-300"
                          onClick={() => toggleMute(camera.id)}
                        >
                          {mutedCameras.includes(camera.id) ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>
                        <button 
                          className="text-white hover:text-indigo-300"
                          onClick={() => toggleFullscreen(camera.id)}
                        >
                          <Maximize2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/50 to-transparent">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className={`h-2 w-2 rounded-full mr-2 ${camera.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          <span className="text-sm text-white">{camera.status}</span>
                        </div>
                        <div className="text-sm text-white">{camera.location}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-700">
                    <h3 className="text-lg font-medium text-white mb-2">{camera.name} Details</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p><span className="font-medium">Location:</span> {camera.location}</p>
                      <p><span className="font-medium">Status:</span> {camera.status}</p>
                      <p><span className="font-medium">Last Motion Detected:</span> 10 minutes ago</p>
                      <p><span className="font-medium">Resolution:</span> 1080p</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface CameraCardProps {
  camera: {
    id: number;
    name: string;
    status: string;
    location: string;
  };
  isMuted: boolean;
  onMuteToggle: () => void;
  onFullscreen: () => void;
}

const CameraCard: React.FC<CameraCardProps> = ({ camera, isMuted, onMuteToggle, onFullscreen }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-slate-700 rounded-lg overflow-hidden shadow-md">
      <div className="relative">
        <img
          src={getCameraPlaceholder(camera.id, camera.status)}
          alt={camera.name}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-0 left-0 right-0 p-2 bg-gradient-to-b from-black/50 to-transparent flex justify-between items-center">
          <div className="text-white font-medium">{camera.name}</div>
          <div className="flex items-center space-x-2">
            <button 
              className="text-white hover:text-indigo-300"
              onClick={onMuteToggle}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <button 
              className="text-white hover:text-indigo-300"
              onClick={onFullscreen}
            >
              <Maximize2 size={18} />
            </button>
            <div className="relative">
              <button 
                className="text-white hover:text-indigo-300"
                onClick={() => setShowMenu(!showMenu)}
              >
                <MoreVertical size={18} />
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-slate-800 ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-slate-700">View Details</button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-slate-700">Image Settings</button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-slate-700">Download Footage</button>
                    <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700">Report Issue</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/50 to-transparent">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className={`h-2 w-2 rounded-full mr-2 ${camera.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span className="text-sm text-white">{camera.status}</span>
            </div>
            <div className="text-sm text-white">{camera.location}</div>
          </div>
        </div>
        {camera.status === 'offline' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="bg-red-500/90 text-white px-3 py-1 rounded-full flex items-center">
              <VideoOff size={16} className="mr-1" />
              <span>Offline</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraGrid; 