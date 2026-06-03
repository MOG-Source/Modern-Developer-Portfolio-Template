import type { Route } from './+types/blogDetails';
import Markdown from 'react-markdown';
import { Link } from 'react-router';
import type { PostMeta } from '~/types';

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;
  let url = new URL('/posts-meta.json', request.url);

  let res = await fetch(url.href);
  if (!res.ok) throw new Error('Failed To Fetch Data');

  const data = await res.json();

  let post = data.find((item: PostMeta) => item.slug === slug);
  console.log(post);
  if (!post) throw new Response('Not Found', { status: 404 });

  let markdown = await import(`../posts/${slug}.md?raw`);

  return {
    post,
    markdown: markdown.default,
  };
}

const BlogDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  let { post, markdown } = loaderData;
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-gray-900">
      <h1 className="text-3xl font-bold text-blue-400 mb-2">{post.title}</h1>
      <p className="text-gray-400 text-sm mb-6">
        {new Date(post.date).toDateString()}
      </p>
      <div className="prose prose-invert max-w-none mb-12">
        <Markdown>{markdown}</Markdown>
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
