
import React, { useState, useRef } from 'react';
import { Icon } from './ui/Icon';

interface FileUploadProps {
  onFileUpload: (files: FileList | null) => void;
  uploadedFiles: File[];
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, uploadedFiles }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    onFileUpload(e.dataTransfer.files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileUpload(e.target.files);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileSelect}
          className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            isDragging ? 'border-primary-500 bg-primary-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
          }`}
        >
          <Icon name="upload" className="h-10 w-10 text-slate-400 mb-2" />
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-primary-600">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-slate-500 mt-1">PDF, DOCX (up to 10MB each)</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept=".pdf,.docx"
            className="hidden"
          />
        </div>
        {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium text-slate-700">Selected files:</h4>
                <ul className="max-h-24 overflow-y-auto">
                    {uploadedFiles.map((file, index) => (
                        <li key={index} className="text-xs text-slate-600 truncate bg-slate-100 p-1 rounded">
                            {file.name}
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
  );
};
