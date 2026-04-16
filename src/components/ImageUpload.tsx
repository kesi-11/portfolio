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
  const [success, setSuccess] = useState(false);
  const [useUrl, setUseUrl] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError('');
    setSuccess(false);
    
    if (!file) {
      setError('No file selected');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('File must be an image (PNG, JPG, GIF, WEBP)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File must be less than 10MB');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || `Server error: ${res.status}`);
      }

      if (!data.url) {
        throw new Error('No URL returned from server');
      }

      onChange(data.url);
      setSuccess(true);
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Upload failed. Try using URL instead.');
    } finally {
      setUploading(false);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput('');
      setUseUrl(false);
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
    <div className="space-y-3">
      {/* Toggle between upload and URL */}
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => setUseUrl(false)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            !useUrl 
              ? 'bg-[#C9A84C] text-black' 
              : 'bg-white/10 text-gray-400 hover:text-white'
          }`}
        >
          Upload File
        </button>
        <button
          type="button"
          onClick={() => setUseUrl(true)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            useUrl 
              ? 'bg-[#C9A84C] text-black' 
              : 'bg-white/10 text-gray-400 hover:text-white'
          }`}
        >
          Use URL
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/50 text-red-400 text-sm rounded-lg">
          {error}
        </div>
      )}
      
      {success && !useUrl && (
        <div className="p-3 bg-green-500/20 border border-green-500/50 text-green-400 text-sm rounded-lg">
          Image uploaded successfully!
        </div>
      )}
      
      {useUrl ? (
        <form onSubmit={handleUrlSubmit} className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Paste image URL (from Cloudinary, etc.)"
            className="flex-1 bg-white/10 border border-white/20 focus:border-[#C9A84C] rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none"
          />
          <button
            type="submit"
            className="px-4 py-3 bg-[#C9A84C] text-black font-semibold rounded-xl hover:bg-[#E5D4A1] transition-colors"
          >
            Add
          </button>
        </form>
      ) : value ? (
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