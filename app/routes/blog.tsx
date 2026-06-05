import type { Route } from './+types/blog';
import type { PostMeta, StrapiResponse, StrapiPost } from '~/types';
import PostCard from '~/components/PostCard';
import Pagination from '~/components/Pagination';
import { useState } from 'react';
import PostFilter from '~/components/PostFilter';

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: StrapiPost[] }> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?populate=*&sort=date:desc`,
  );
  let json: StrapiResponse<StrapiPost> = await res.json();
  let posts = json.data.map((item) => {
    return {
      id: item.id,
      documentId: item.documentId,
      title: item.title,
      excerpt: item.excerpt,
      slug: item.slug,
      body: item.body,
      date: item.date,
      image: item.image?.url
        ? { url: `${item.image.url}` }
        : { url: '/images/no-image.png' },
    };
  });

  if (!res.ok) throw new Error('Failed To Fetch Data');

  // data.sort((a: PostMeta, b: PostMeta) => {
  //   return new Date(b.date).getTime() - new Date(a.date).getTime();
  // });

  return { posts };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const { posts } = loaderData;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  let postsPerPage = 3;

  let filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query)
    );
  });

  let totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  let currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

  return (
    <div className="max-w-3xl mx-auto rounded-lg mt-10 px-6 py-6 bg-gray-900">
      <h2 className="text-3xl font-bold text-white mb-8">📝Blog</h2>
      <PostFilter
        onSearchChange={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
        searchQuery={searchQuery}
      />
      <div className="space-y-8">
        {currentPosts.length === 0 ? (
          <p className="text-gray-400 text-center m-12">No Posts Found</p>
        ) : (
          currentPosts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          onPageChange={(page) => setCurrentPage(page)}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default BlogPage;
