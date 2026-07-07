'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSignIn = async (provider: string) => {
    setLoading(provider);
    await signIn(provider, { callbackUrl: '/dashboard' });
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'var(--bg0)', padding: '20px',
    }}>
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border1)',
        borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '420px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚡</div>
        <h1 style={{
          fontSize: '26px', fontWeight: '900', marginBottom: '8px',
          background: 'var(--g1)', WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>ContextIQ</h1>
        <p style={{ color: 'var(--t3)', fontSize: '14px', marginBottom: '32px' }}>
          AI Chief of Staff for your team
        </p>
        <button
          onClick={() => handleSignIn('google')}
          disabled={!!loading}
          style={{
            width: '100%', padding: '12px', borderRadius: '10px',
            background: loading === 'google' ? 'var(--border1)' : 'var(--bg1)',
            border: '1px solid var(--border1)', color: 'var(--t1)',
            fontSize: '14px', fontWeight: '600', cursor: 'pointer',
            marginBottom: '10px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '10px',
          }}
        >
          {loading === 'google' ? '...' : '🔵 Continue with Google'}
        </button>
        <button
          onClick={() => handleSignIn('github')}
          disabled={!!loading}
          style={{
            width: '100%', padding: '12px', borderRadius: '10px',
            background: loading === 'github' ? 'var(--border1)' : 'var(--bg1)',
            border: '1px solid var(--border1)', color: 'var(--t1)',
            fontSize: '14px', fontWeight: '600', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          }}
        >
          {loading === 'github' ? '...' : '⚫ Continue with GitHub'}
        </button>
      </div>
    </div>
  );
}