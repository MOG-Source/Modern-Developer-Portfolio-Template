import type { Route } from './+types/details';
import type { Project, StrapiProject, StrapiResponse } from '~/types';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router';

export async function loader({ request, params }: Route.LoaderArgs) {
  let { id } = params;
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/projects?filters[documentId][$eq]=${id}&populate=*`,
  );
  if (!res.ok) throw new Response('Project Not Found', { status: 404 });
  const json: StrapiResponse<StrapiProject> = await res.json();

  const item = json.data[0];
  let project: Project = {
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
  return { project };
}

// export function HydrateFallback() {
//   return <div>Loading...</div>;
// }

const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const { project } = loaderData;
  // console.log(project);
  return (
    <>
      <Link
        to="/projects"
        className="flex items-center text-blue-400 hover:text-blue-500 transition mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back To Projects
      </Link>
      <div className="gap-8 grid md:grid-cols-2 itmes-start">
        <div>
          <img
            src={project.image}
            alt={project.title}
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div>
          <h1 className="text-blue-400 font-bold text-3xl mb-4">
            {project.title}
          </h1>
          <p className="text-sm text-gray-300 mb-4">
            {new Date(project.date).toLocaleDateString()} • {project.category}
          </p>
          <p className="text-gray-200 mb-6">{project.description}</p>
          <a
            href={project.url}
            target="_blank"
            className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition"
          >
            View Live Site
          </a>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsPage;
