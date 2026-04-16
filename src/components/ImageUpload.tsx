'use client';

import { useState, useRef } from 'react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const [debug, setDebug] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError('');
    setDebug('');
    
    if (!file) {
      setError('No file selected');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('File must be an image (PNG, JPG, GIF)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File must be less than 10MB');
      return;
    }

    setUploading(true);
    setDebug(`Uploading ${file.name} (${Math.round(file.size / 1024)}KB)...`);

    try {
      const formData = new FormData();
      formData.append('file', file);

      setDebug('Sending to server...');
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      
      console.log('Upload response:', res.status, data);

      if (!res.ok) {
        throw new Error(data.error || `Server error: ${res.status}`);
      }

      if (!data.url) {
        throw new Error('No URL returned from server');
      }

      setDebug('Got URL from Cloudinary!');
      onChange(data.url);
      setDebug('Image uploaded successfully!');
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload. Please try again.');
      setDebug('');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-2">
      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/50 text-red-400 text-sm rounded-lg">
          {error}
        </div>
      )}
      
      {debug && !error && (
        <div className="p-3 bg-blue-500/20 border border-blue-500/50 text-blue-400 text-sm rounded-lg">
          {debug}
        </div>
      )}
      
      {value ? (
        <div className="relative group">
          <img
            src={value}
            alt="Uploaded"
            className="w-full h-48 object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-sm">Click to replace</span>
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            title="Remove image"
          >
            ×
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            dragOver 
              ? 'border-[#C9A84C] bg-[#C9A84C]/10' 
              : 'border-white/20 hover:border-[#C9A84C] hover:bg-white/5'
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <div className="space-y-2">
              <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-[#C9A84C]">Uploading...</p>
            </div>
          ) : (
            <div>
              <div className="text-5xl mb-3">📤</div>
              <p className="text-gray-300 font-medium">Click to upload image</p>
              <p className="text-gray-500 text-sm mt-2">or drag and drop</p>
              <p className="text-gray-600 text-xs mt-1">PNG, JPG, GIF up to 10MB</p>
              <p className="text-[#C9A84C] text-xs mt-3">Uploads to Cloudinary</p>
            </div>
          )}
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/gif,image/webp"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}