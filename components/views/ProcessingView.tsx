import React, { useState, useEffect, useMemo } from 'react';
import { Icon } from '../ui/Icon';
import type { ProcessingFile } from '../../types';
import { FileProgressCard } from '../processing/FileProgressCard';
import { OverallProgress } from '../processing/OverallProgress';

interface ProcessingViewProps {
  files: File[];
  onComplete: () => void;
}

const SIMULATION_SPEED = 75; // ms per progress update

export const ProcessingView: React.FC<ProcessingViewProps> = ({ files, onComplete }) => {
  const [processingFiles, setProcessingFiles] = useState<ProcessingFile[]>([]);

  useEffect(() => {
    // Initialize processing state from the uploaded files
    setProcessingFiles(
      files.map((file, index) => ({
        id: `${file.name}-${index}`,
        fileName: file.name,
        status: 'queued',
        progress: 0,
        steps: {
          ocr: 'pending',
          extractSkills: 'pending',
          buildGraph: 'pending',
        },
      }))
    );
  }, [files]);

  useEffect(() => {
    // Main simulation logic
    const interval = setInterval(() => {
      setProcessingFiles(currentFiles => {
        let isStillProcessing = false;
        const updatedFiles = [...currentFiles];
        
        // Find the first file that is not yet completed to process
        const fileToProcessIndex = updatedFiles.findIndex(f => f.status !== 'completed');
        
        if (fileToProcessIndex !== -1) {
          isStillProcessing = true;
          const file = { ...updatedFiles[fileToProcessIndex] };
          
          if (file.status === 'queued') {
            file.status = 'processing';
          }

          if (file.progress < 100) {
            file.progress += 1;
            
            // Update step statuses based on progress
            if (file.progress > 0) file.steps.ocr = 'in_progress';
            if (file.progress > 33) file.steps.ocr = 'completed';
            if (file.progress > 33) file.steps.extractSkills = 'in_progress';
            if (file.progress > 66) file.steps.extractSkills = 'completed';
            if (file.progress > 66) file.steps.buildGraph = 'in_progress';
          } else {
            file.progress = 100;
            file.status = 'completed';
            file.steps.buildGraph = 'completed';
          }
          updatedFiles[fileToProcessIndex] = file;
        }

        if (!isStillProcessing && updatedFiles.length > 0) {
          // All files are processed, trigger completion after a short delay
          setTimeout(onComplete, 1000);
          clearInterval(interval);
        }
        
        return updatedFiles;
      });
    }, SIMULATION_SPEED);

    return () => clearInterval(interval);
  }, [onComplete]);

  const progressStats = useMemo(() => {
    const completedCount = processingFiles.filter(f => f.status === 'completed').length;
    const processingCount = processingFiles.filter(f => f.status === 'processing').length;
    const queuedCount = processingFiles.filter(f => f.status === 'queued').length;
    return { completedCount, processingCount, queuedCount, total: processingFiles.length };
  }, [processingFiles]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
            <div className="inline-block p-4 bg-white rounded-2xl shadow-sm mb-4">
                 <Icon name="processing" className="h-10 w-10 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800">Processing Resumes</h1>
            <p className="text-slate-500 mt-2">AI is analyzing and extracting insights from your uploaded resumes</p>
        </header>

        <main className="space-y-4">
            {processingFiles.map(file => (
                <FileProgressCard key={file.id} file={file} />
            ))}
        </main>
        
        <footer className="mt-8">
            <OverallProgress {...progressStats} />
        </footer>
      </div>
    </div>
  );
};
