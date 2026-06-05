import ProjectCard from '~/components/ProjectCard';
import type { Route } from './+types/projects';
import type { Project, StrapiProject, StrapiResponse } from '~/types';
import { use, useState } from 'react';
import Pagination from '~/components/Pagination';
import { AnimatePresence, motion } from 'framer-motion';

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/projects?populate=*`,
  );
  const json: StrapiResponse<StrapiProject> = await res.json();

  const projects = json.data.map((item) => {
    return {
      id: item.id,
      documentId: item.documentId,
      title: item.title,
      description: item.description,
      image: item.image?.url ? `${item.image.url}` : '/images/no-image.png',
      url: item.url,
      date: item.date,
      category: item.category,
      featured: item.featured,
    };
  });

  return {
    projects,
  };
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { projects } = loaderData as { projects: Project[] };
  const [currentPage, setCurrentPage] = useState(1);

  // Get the categories
  const categories = [
    'All',
    ...new Set(projects.map((project) => project.category)),
  ];
  // Filter projects by selected categories
  let filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  let projectsPerPage = 4;
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  let indexOfLast = currentPage * projectsPerPage;
  let indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <h2 className="text-3xl font-bold mb-8 text-white">🚀Projects</h2>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            className={`text-sm font-semibold rounded px-3 py-1 transition ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'} cursor-pointer hover:bg-blue-800`}
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
          >
            {category}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div layout className="grid gap-6 sm:grid-cols-2">
          {currentProjects.map((project) => (
            <motion.div layout key={project.id}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <Pagination
        onPageChange={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default ProjectsPage;
