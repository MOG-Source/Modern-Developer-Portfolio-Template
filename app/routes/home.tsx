import type {
  PostMeta,
  Project,
  StrapiPost,
  StrapiProject,
  StrapiResponse,
} from '~/types';
import type { Route } from './+types/home';
import FeaturedProjects from '~/components/FeaturedProjects';
import AboutPreview from '~/components/AboutPreview';
import LatestPosts from '~/components/LatestPosts';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'The friendly dev' },
    { name: 'description', content: 'Custom website development' },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: PostMeta[] }> {
  const url = new URL('/posts-meta.json', request.url);
  let [projectRes, postRes] = await Promise.all([
    fetch(
      `${import.meta.env.VITE_API_URL}/projects?filters[featured][$eq]=true&populate=*`,
    ),
    fetch(`${import.meta.env.VITE_API_URL}/posts?sort[0]=date:desc&populate=*`),
  ]);
  if (!postRes.ok || !projectRes.ok) throw new Error('Failed To Fetch Data');
  let postsRes: StrapiResponse<StrapiPost> = await postRes.json();
  let ProjectsJson: StrapiResponse<StrapiProject> = await projectRes.json();
  let projects = ProjectsJson.data.map((item) => {
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

  let posts = postsRes.data.map((item) => {
    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      image: item.image?.url ? `${item.image.url}` : '/images/no-image.png',
      date: item.date,
      body: item.body,
      excerpt: item.excerpt,
    };
  });

  return { projects, posts };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects, posts } = loaderData;
  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <AboutPreview />
      <LatestPosts posts={posts} />
    </>
  );
};

export default HomePage;
