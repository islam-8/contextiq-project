import { useState, useRef, useCallback } from 'react';
import { useToast } from './useToast';
import { formatTimer } from '@/lib/utils';

export function useRecording(meetingId: string) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused]       = useState(false);
  const [duration, setDuration]        = useState(0);
  const [status, setStatus]           = useState<'idle'|'recording'|'processing'|'done'>('idle');

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks   = useRef<Blob[]>([]);
  const timerRef      = useRef<NodeJS.Timeout | null>(null);
  const durRef        = useRef(0);
  const { toast }     = useToast();

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
      audioChunks.current = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunks.current.push(e.data); };
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        setStatus('processing');
        const blob = new Blob(audioChunks.current, { type: 'audio/webm' });
        const form = new FormData();
        form.append('audio', blob, 'recording.webm');
        form.append('meetingId', meetingId);
        const res = await fetch('/api/transcribe', { method: 'POST', body: form });
        if (res.ok) {
          setStatus('done');
          toast('✅ Meeting analyzed — insights ready!', 'success');
        } else {
          setStatus('idle');
          toast('Transcription failed', 'error');
        }
      };
      recorder.start(1000);
      mediaRecorder.current = recorder;
      durRef.current = 0;
      timerRef.current = setInterval(() => {
        durRef.current++;
        setDuration(durRef.current);
      }, 1000);
      setIsRecording(true);
      setStatus('recording');
      toast('🔴 Recording started', 'success');
    } catch {
      toast('Microphone access denied', 'error');
    }
  }, [meetingId, toast]);

  const stopRecording = useCallback(() => {
    mediaRecorder.current?.stop();
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRecording(false);
    setIsPaused(false);
  }, []);

  const pauseRecording = useCallback(() => {
    if (mediaRecorder.current?.state === 'recording') {
      mediaRecorder.current.pause();
      if (timerRef.current) clearInterval(timerRef.current);
      setIsPaused(true);
    }
  }, []);

  const resumeRecording = useCallback(() => {
    if (mediaRecorder.current?.state === 'paused') {
      mediaRecorder.current.resume();
      timerRef.current = setInterval(() => { durRef.current++; setDuration(durRef.current); }, 1000);
      setIsPaused(false);
    }
  }, []);

  return {
    isRecording, isPaused, duration, status,
    formattedDuration: formatTimer(duration),
    startRecording, stopRecording, pauseRecording, resumeRecording,
  };
}