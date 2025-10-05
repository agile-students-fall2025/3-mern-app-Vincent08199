import React, { useEffect, useState } from 'react';

export default function About() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    const API = process.env.REACT_APP_API || 'http://localhost:5002';
    fetch(`${API}/about`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(setData)
      .catch((e) => setErr(e.message));
  }, []);

  if (err) {
    return <main style={{ padding: 24 }}>Failed to load: {err}</main>;
  }

  if (!data) {
    return <main style={{ padding: 24 }}>Loading…</main>;
  }

  return (
    <main style={{ maxWidth: 800, margin: '40px auto', padding: '0 16px' }}>
      <h1>About Me</h1>
      <p>
        <strong>{data.name}</strong> — {data.title}
      </p>
      {Array.isArray(data.bio) &&
        data.bio.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      {data.photoUrl && (
        <img
          src={data.photoUrl}
          alt="Portrait"
          style={{ width: 280, borderRadius: 12, marginTop: 16 }}
        />
      )}
    </main>
  );
}


