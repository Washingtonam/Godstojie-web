import { useState } from 'react';

export function useLeadCapture() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const submitLead = async (leadData) => {
    setStatus('loading');
    setError(null);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.message || 'Unable to submit lead.');
      }

      setStatus('success');
      return await response.json();
    } catch (err) {
      setStatus('error');
      setError(err.message);
      throw err;
    }
  };

  return { status, error, submitLead };
}
