'use client';
import { useState, useRef, useEffect } from 'react';

interface Message { role: 'user'|'assistant'; content: string; }

export function AssistantView() {
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    content: `Hey! 👋 I'm your **AI Chief of Staff**.\n\nAsk me about:\n• Pipeline risks & opportunities\n• Meeting summaries & action items\n• Client intelligence & sentiment\n• Team performance analytics\n• Investor call preparation`,
  }]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const msgsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: input };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })) }),
      });

      const reader = res.body?.getReader();
      const dec    = new TextDecoder();
      let aiContent = '';
      setMessages((m) => [...m, { role: 'assistant', content: '' }]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const lines = dec.decode(value).split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;
            try {
              const { chunk } = JSON.parse(data);
              if (chunk) {
                aiContent += chunk;
                setMessages((m) => {
                  const updated = [...m];
                  updated[updated.length - 1] = { role: 'assistant', content: aiContent };
                  return updated;
                });
              }
            } catch {}
          }
        }
      }
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '22px' }}>
      <div style={{ marginBottom: '22px' }}>
        <h1 style={{ fontSize: '21px', fontWeight: 900 }}>🤖 AI Chief of Staff</h1>
        <p style={{ fontSize: '12.5px', color: 'var(--t2)', marginTop: '3px' }}>
          Ask anything about your meetings, pipeline, clients, or team
        </p>
      </div>

      <div style={{
        display: 'flex', flexDirection: 'column',
        height: 'calc(100vh - 52px - 130px)',
        background: 'var(--bg2)', border: '1px solid var(--border1)', borderRadius: '16px', overflow: 'hidden',
      }}>
        <div ref={msgsRef} style={{ flex: 1, overflowY: 'auto', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
              <div style={{
                width: '30px', height: '30px', borderRadius: '8px', flexShrink: 0,
                background: m.role === 'ai' ? 'linear-gradient(135deg,#3b82f6,#8b5cf6)' : 'linear-gradient(135deg,#8b5cf6,#ec4899)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px',
              }}>{m.role === 'assistant' ? '⚡' : 'S'}</div>
              <div style={{
                maxWidth: '72%', padding: '11px 15px', fontSize: '12.5px', lineHeight: 1.65,
                background: m.role === 'assistant' ? 'var(--bg1)' : 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
                border: m.role === 'assistant' ? '1px solid var(--border1)' : 'none',
                color: m.role === 'assistant' ? 'var(--t1)' : '#fff',
                borderRadius: m.role === 'assistant' ? '3px 13px 13px 13px' : '13px 3px 13px 13px',
              }}>
                {m.content.split('\n').map((line, j) => <div key={j}>{line.replace(/\*\*(.*?)\*\*/g, '$1') || '\u00a0'}</div>)}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⚡</div>
              <div style={{ background: 'var(--bg1)', border: '1px solid var(--border1)', borderRadius: '3px 13px 13px 13px', padding: '11px 15px' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[0,.15,.3].map((d, i) => (
                    <div key={i} style={{ width: '5px', height: '5px', background: 'var(--t3)', borderRadius: '50%', animation: `pulse ${1.3}s ease ${d}s infinite` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', padding: '0 18px 10px' }}>
          {['🚨 Pipeline risks', '📋 Action summary', '🎯 Competitor intel', '📊 Investor brief'].map((s) => (
            <button key={s} onClick={() => { setInput(s); }}
              style={{ background: 'var(--bg1)', border: '1px solid var(--border1)', borderRadius: '20px', padding: '5px 13px', fontSize: '11.5px', fontWeight: 600, color: 'var(--t2)', cursor: 'pointer' }}>
              {s}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '9px', alignItems: 'flex-end', padding: '14px 18px', borderTop: '1px solid var(--border1)' }}>
          <textarea
            value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Ask about your meetings, deals, clients..."
            style={{
              flex: 1, background: 'var(--bg1)', border: '1px solid var(--border1)',
              borderRadius: '11px', padding: '10px 14px', color: 'var(--t0)',
              fontSize: '13px', resize: 'none', minHeight: '42px', maxHeight: '100px',
            }}
          />
          <button onClick={send} disabled={loading}
            style={{
              width: '42px', height: '42px', borderRadius: '11px',
              background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
              border: 'none', color: '#fff', fontSize: '17px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: loading ? .6 : 1,
            }}>➤</button>
        </div>
      </div>
    </div>
  );
}