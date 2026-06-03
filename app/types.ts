export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  date: string;
  category: string;
  featured: boolean;
};

export type PostMeta = {
  id: string;
  slug: string;
  excerpt: string;
  date: string;
  title: string;
};

export type PostFilterProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};
