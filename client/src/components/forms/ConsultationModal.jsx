import { useEffect, useState } from 'react';

export default function ConsultationModal({ project, isOpen, onClose, onSubmitted }) {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setClientName('');
      setClientPhone('');
      setPreferredTime('');
      setError('');
      setSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const whatsappLink = `https://wa.me/2348106269305?text=${encodeURIComponent(
    `Hello Godstojie Construction, I have submitted a consultation request for ${project?.title || 'your services'}.`
  )}`;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!clientName || !clientPhone || !preferredTime) {
      setError('Please fill in all fields to request your consultation.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientPhone,
          preferredTime,
          projectId: project?._id,
          projectName: project?.title,
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to submit request.');
      }

      setSuccess(true);
      onSubmitted?.();
    } catch (submitError) {
      setError(submitError.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Request Professional Quote</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Consultation request</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Our lead engineer will review your selected project and contact you for a site-specific discussion.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 px-3 py-2 text-slate-700 transition hover:bg-slate-200"
          >
            Close
          </button>
        </div>

        <div className="mt-6 rounded-3xl bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-700">Project</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{project?.title || 'Selected project'}</p>
        </div>

        {success ? (
          <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
            <p className="font-semibold">Thank you.</p>
            <p className="mt-1 text-sm leading-6">
              Our lead engineer will contact you shortly to discuss site-specific requirements.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Continue on WhatsApp
              </a>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex rounded-full border border-emerald-600 bg-white px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Name
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-1 ring-transparent transition focus:border-slate-300 focus:ring-slate-300"
                  placeholder="Your full name"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Phone
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-1 ring-transparent transition focus:border-slate-300 focus:ring-slate-300"
                  placeholder="+234 803 000 0000"
                />
              </label>
            </div>

            <label className="block text-sm font-medium text-slate-700">
              Preferred call time
              <input
                type="text"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-1 ring-transparent transition focus:border-slate-300 focus:ring-slate-300"
                placeholder="Morning, afternoon, or specific time"
              />
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Submitting...' : 'Request Consultation'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
