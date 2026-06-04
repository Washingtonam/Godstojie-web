export default function ProjectCard({ project, onOpenModal }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <img src={project.imageUrl} alt={project.title} className="h-56 w-full object-cover" />
      <div className="p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{project.category}</p>
        <h3 className="mt-3 text-xl font-semibold text-slate-900">{project.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{project.description}</p>
        <div className="mt-5 flex items-center justify-between gap-4 text-slate-700">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Starting price</p>
            <p className="mt-1 text-lg font-semibold">₦{project.startingPrice.toLocaleString()}</p>
          </div>
          <button
            onClick={() => onOpenModal(project)}
            className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Request Professional Quote
          </button>
        </div>
      </div>
    </div>
  );
}
