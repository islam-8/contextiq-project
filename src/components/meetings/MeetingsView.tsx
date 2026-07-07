'use client';
import { useRecording } from '@/hooks/useRecording';
import { formatTimer } from '@/lib/utils';
import { useState } from 'react';

export function MeetingsView() {
  const [meetingId] = useState(() => 'meet-' + Date.now());
  const rec = useRecording(meetingId);

  return (
    <div style={{ padding: '22px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
        <div>
          <h1 style={{ fontSize: '21px', fontWeight: 900 }}>🎙️ Meetings</h1>
          <p style={{ fontSize: '12.5px', color: 'var(--t2)', marginTop: '3px' }}>
            Record, transcribe, and analyze your meetings with AI
          </p>
        </div>
      </div>

      {/* Recording Panel */}
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border1)', borderRadius: '16px',
        padding: '28px', textAlign: 'center', marginBottom: '16px',
      }}>
        <div style={{ fontSize: '12px', color: 'var(--t3)', marginBottom: '14px' }}>
          {rec.status === 'idle' && 'Click to start recording — AI analyzes in real-time'}
          {rec.status === 'recording' && '🔴 Recording in progress — AI transcribing live'}
          {rec.status === 'processing' && '⚡ Processing with AI...'}
          {rec.status === 'done' && '✅ Meeting analyzed! Summary and actions ready.'}
        </div>

        <button
          onClick={rec.isRecording ? rec.stopRecording : rec.startRecording}
          style={{
            width: '72px', height: '72px', borderRadius: '50%', border: 'none',
            color: '#fff', fontSize: '28px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px',
            background: rec.isRecording
              ? 'linear-gradient(135deg,#ef4444,#dc2626)'
              : 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
            boxShadow: rec.isRecording
              ? '0 8px 28px rgba(239,68,68,.4)'
              : '0 8px 28px rgba(59,130,246,.3)',
          }}
        >
          {rec.isRecording ? '⏹' : '🎙️'}
        </button>

        {rec.isRecording && (
          <div style={{
            fontFamily: 'JetBrains Mono,monospace', fontSize: '22px',
            fontWeight: 900, color: 'var(--blue)',
          }}>
            {rec.formattedDuration}
          </div>
        )}
      </div>

      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border1)',
        borderRadius: '16px', padding: '20px', textAlign: 'center',
        color: 'var(--t3)', fontSize: '13px',
      }}>
        📋 Your meetings will appear here after recording
      </div>
    </div>
  );
}