'use client';

import { useState } from 'react';

export default function EmailSignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        setSubmitted(true);
        setName('');
        setEmail('');
        // Show confirmation for 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to sign up. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-lg p-6 text-center">
        <div className="text-4xl mb-3">✓</div>
        <h3 className="text-lg font-bold text-green-900 mb-2">Welcome to the Ocean Community!</h3>
        <p className="text-green-800 text-sm">
          We've sent you a confirmation email. Start taking ocean actions and earning impact points.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-lg p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-2">🌊 Join the Ocean Advocates</h3>
      <p className="text-slate-700 text-sm mb-4">
        Get weekly ocean conservation actions + see your impact tracked in real-time
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {error && <p className="text-red-600 text-xs">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm"
        >
          {loading ? 'Signing up...' : 'Join the Movement →'}
        </button>

        <p className="text-xs text-slate-600 text-center">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
}
