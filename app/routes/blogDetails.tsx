import type { Route } from './+types/blogDetails';
import Markdown from 'react-markdown';
import { Link } from 'react-router';
import type { StrapiPost, StrapiResponse } from '~/types';

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?filters[slug][$eq]=${slug}&populate=image`,
  );
  if (!res.ok) throw new Error('Failed To Fetch Data');
  let json: StrapiResponse<StrapiPost> = await res.json();

  if (!json.data.length) throw new Response('Not Found', { status: 404 });
  let item = json.data[0];
  let post = {
    id: item.id,
    slug: item.slug,
    excerpt: item.excerpt,
    title: item.title,
    date: item.date,
    body: item.body,
    image: item.image?.url ? `${item.image.url}` : '/images/no-image.png',
  };

  return { post };
}

const BlogDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  let { post } = loaderData;
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-gray-900">
      <h1 className="text-3xl font-bold text-blue-400 mb-2">{post.title}</h1>
      <p className="text-gray-400 text-sm mb-6">
        {new Date(post.date).toDateString()}
      </p>
      <img
        src={post.image}
        alt={post.title}
        className="w-ful height-48 object-cover mb-4"
      />
      <div className="prose prose-invert max-w-none mb-12">
        <Markdown>{post.body}</Markdown>
      </div>
      <Link
        to="/blog"
        className="inline-block bg-blue-700 transition text-white rounded font-semibold hover:bg-blue-900 px-6 py-2"
      >
        Back To Posts
      </Link>
    </div>
  );
};

export default BlogDetailsPage;
