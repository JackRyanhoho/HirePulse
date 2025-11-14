import React, { useState, useEffect, useMemo } from 'react';
import { Icon } from '../ui/Icon';
import type { ProcessingFile, Candidate } from '../../types';
import { FileProgressCard } from '../processing/FileProgressCard';
import { OverallProgress } from '../processing/OverallProgress';
import { processResume } from '../../services/geminiService';

interface ProcessingViewProps {
  files: File[];
  onComplete: (processedCandidates: Candidate[]) => void;
}

const SIMULATION_SPEED = 100;

/**
 * Converts a File object to a base64 encoded string.
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        if (typeof reader.result === 'string') {
            resolve(reader.result.split(',')[1]);
        } else {
            reject(new Error("Failed to read file as base64 string."));
        }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};


export const ProcessingView: React.FC<ProcessingViewProps> = ({ files, onComplete }) => {
  const [processingFiles, setProcessingFiles] = useState<ProcessingFile[]>([]);
  
  // State to hold the final results from the API
  const [apiResults, setApiResults] = useState<Candidate[] | null>(null);
  
  // State to track if the UI simulation is complete
  const [isUiSimulationDone, setIsUiSimulationDone] = useState(false);

  // Effect to call onComplete when both processes are finished
  useEffect(() => {
    if (isUiSimulationDone && apiResults) {
        // A brief delay to let the final UI state render (e.g., 100% progress)
        const timer = setTimeout(() => {
             onComplete(apiResults);
        }, 500);
        return () => clearTimeout(timer);
    }
  }, [isUiSimulationDone, apiResults, onComplete]);


  // Effect for handling the actual API processing in the background
  useEffect(() => {
    let isMounted = true;
    const performProcessing = async () => {
        const processingPromises = files.map(async (file) => {
            const base64Data = await fileToBase64(file);
            const filePart = { data: base64Data, mimeType: file.type };
            const parsedData = await processResume(filePart);
            return parsedData as Candidate;
        });

        const results = await Promise.allSettled(processingPromises);

        if (!isMounted) return;

        const successfulCandidates = results
            .filter((result): result is PromiseFulfilledResult<Candidate> => 
                result.status === 'fulfilled' && !!result.value && result.value.name !== 'Error Processing Resume'
            )
            .map(result => result.value);
        
        setApiResults(successfulCandidates);
    };

    performProcessing();
    
    return () => {
      isMounted = false;
    }
  }, [files]);

  // Effect for handling the UI simulation
  useEffect(() => {
    setProcessingFiles(
      files.map((file, index) => ({
        id: `${file.name}-${index}`,
        fileName: file.name,
        status: 'queued',
        progress: 0,
        steps: { ocr: 'pending', extractSkills: 'pending', buildGraph: 'pending' },
      }))
    );
    
    const interval = setInterval(() => {
      setProcessingFiles(currentFiles => {
        let allCompleted = true;
        const updatedFiles = currentFiles.map(file => {
          if (file.status === 'completed') return file;
          
          allCompleted = false;
          const newFile = { ...file };
          
          if (newFile.status === 'queued') {
            newFile.status = 'processing';
          }

          if (newFile.progress < 100) {
            newFile.progress += Math.random() * 2.5 + 0.5; // Simulate variable processing speed
            if (newFile.progress > 100) newFile.progress = 100;
          }
          
          if (newFile.progress >= 100) {
            newFile.progress = 100;
            newFile.status = 'completed';
            newFile.steps.buildGraph = 'completed';
          }
          
          // Update step statuses based on progress
          if (newFile.progress > 0) newFile.steps.ocr = 'in_progress';
          if (newFile.progress > 33) newFile.steps.ocr = 'completed';
          if (newFile.progress > 33) newFile.steps.extractSkills = 'in_progress';
          if (newFile.progress > 66) newFile.steps.extractSkills = 'completed';
          if (newFile.progress > 66) newFile.steps.buildGraph = 'in_progress';

          return newFile;
        });

        if (allCompleted) {
          setIsUiSimulationDone(true);
          clearInterval(interval);
        }
        
        return updatedFiles;
      });
    }, SIMULATION_SPEED);

    return () => clearInterval(interval);
  }, [files]);

  const progressStats = useMemo(() => {
    const completedCount = processingFiles.filter(f => f.status === 'completed').length;
    const processingCount = processingFiles.filter(f => f.status === 'processing').length;
    const queuedCount = processingFiles.filter(f => f.status === 'queued').length;
    return { completedCount, processingCount, queuedCount, total: processingFiles.length };
  }, [processingFiles]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
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