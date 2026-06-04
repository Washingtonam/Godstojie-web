import { useEffect, useState } from 'react';
import ProjectGrid from '../components/projects/ProjectGrid';

const sampleProjects = [
  {
    _id: '1',
    title: '4 Bedroom Bungalow',
    category: 'Residential',
    description: 'Premium bungalow design with modern finishes, optimized for family living.',
    imageUrl: '/images/bungalow.svg',
    startingPrice: 18500000,
  },
  {
    _id: '2',
    title: 'Luxury Duplex',
    category: 'Residential',
    description: 'Luxury duplex with a strong emphasis on practical spaces and elegant detailing.',
    imageUrl: '/images/duplex.svg',
    startingPrice: 27500000,
  },
  {
    _id: '3',
    title: 'Commercial Retail Fitout',
    category: 'Commercial',
    description: 'End-to-end retail fitout for premium brand experiences and operational efficiency.',
    imageUrl: '/images/retail.svg',
    startingPrice: 12000000,
  },
];

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(sampleProjects);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-4xl bg-white p-10 shadow-xl ring-1 ring-slate-200">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Godstojie Construction</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Professional construction consultation for premium projects.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Move your project from browse to booked with a trusted, responsive consultation workflow. Start with a quick enquiry and we will help you scope the build, budget, and timeline.
          </p>
        </div>

        <div className="mt-10">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Featured projects</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">Design-led building solutions</h2>
            </div>
            <p className="text-sm leading-6 text-slate-600 max-w-xl">
              Each project can be tailored with a consultation-first workflow, ensuring you capture qualified leads before the conversation moves to WhatsApp.
            </p>
          </div>

          <ProjectGrid projects={projects} />

          <div className="mt-14 rounded-4xl bg-slate-950 px-8 py-10 text-white shadow-2xl sm:px-10">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Email</p>
                <p className="mt-3 text-base font-semibold">gtventures525@gmail.com</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">WhatsApp</p>
                <p className="mt-3 text-base font-semibold">+234 810 626 9305</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Address</p>
                <p className="mt-3 max-w-sm text-base font-semibold">
                  70, Enogie Street Off Sapele Road Benin City, Edo State
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
