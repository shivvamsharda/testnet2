
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { ContentViolation, monitorStream } from '../utils/contentModeration';

export const useContentModeration = (streamId: string, isLive: boolean) => {
  const [isMonitoring, setIsMonitoring] = useState<boolean>(false);
  const [latestViolation, setLatestViolation] = useState<ContentViolation | null>(null);
  const [shouldTerminate, setShouldTerminate] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);
  const { toast } = useToast();

  // Start content monitoring
  const startMonitoring = () => {
    if (!isLive || !streamId || isMonitoring) return;
    
    setIsMonitoring(true);
    
    // Check content every 5 seconds
    // In a real implementation, this would be more sophisticated
    intervalRef.current = window.setInterval(async () => {
      const result = await monitorStream(streamId);
      
      if (result.isViolating && result.violation) {
        setLatestViolation(result.violation);
        setShouldTerminate(true);
        
        toast({
          title: "Stream Violation Detected",
          description: `Your stream has been terminated due to a content violation: ${result.violation.type.replace('_', ' ')}`,
          variant: "destructive",
        });
        
        clearInterval(intervalRef.current!);
        setIsMonitoring(false);
      }
    }, 5000);
  };
  
  // Stop content monitoring
  const stopMonitoring = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsMonitoring(false);
  };
  
  // Automatically start/stop monitoring based on stream status
  useEffect(() => {
    if (isLive && streamId) {
      startMonitoring();
    } else {
      stopMonitoring();
    }
    
    return () => {
      stopMonitoring();
    };
  }, [isLive, streamId]);
  
  return {
    isMonitoring,
    latestViolation,
    shouldTerminate,
    startMonitoring,
    stopMonitoring
  };
};
