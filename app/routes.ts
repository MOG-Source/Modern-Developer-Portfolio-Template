import {
  type RouteConfig,
  index,
  route,
  layout,
} from '@react-router/dev/routes';

export default [
  layout('./routes/layouts/one.tsx', [index('routes/home.tsx')]),
  layout('./routes/layouts/main.tsx', [
    route('about', './routes/about.tsx'),
    route('contact', './routes/contact.tsx'),
    route('projects', './routes/projects.tsx'),
    route('projects/:id', './routes/details.tsx'),
    route('blog', './routes/blog.tsx'),
    route('blog/:slug', './routes/blogDetails.tsx'),
    route('*', './routes/errors/not-found.tsx'),
  ]),
] satisfies RouteConfig;
