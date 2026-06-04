import ProjectCard from './ProjectCard';

export default function ProjectGrid({ projects, onOpenModal }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} onOpenModal={onOpenModal} />
      ))}
    </div>
  );
}
