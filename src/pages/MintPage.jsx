import React from 'react';

function MintPage() {
  return (
    <div style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#0a0a0a',
      color: '#fff',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>Minting Soon</h1>
      <p style={{ color: '#a0a0a0', fontSize: '1.5rem', maxWidth: '600px', textAlign: 'center' }}>
        The gateway to the Huemnz ecosystem is being constructed. 
        Join the Allowlist Game to secure your spot.
      </p>
      <div style={{ marginTop: '2rem', padding: '1rem 2rem', border: '1px solid #333', borderRadius: '8px', background: '#111' }}>
        Status: 🔴 <strong>Contract Paused</strong>
      </div>
    </div>
  );
}

export default MintPage;