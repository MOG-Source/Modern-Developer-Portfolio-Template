# Personal Portfolio Website

A modern portfolio website built with React Router v7 that showcases projects, blog posts, and personal information. The application includes dynamic content management through Strapi, local API mocking with JSON Server, and Markdown support for rich blog content.

## Features

- Home page
- About page
- Projects page
- Blog page
- Contact page
- Dynamic routing with React Router v7
- Blog posts rendered from Markdown files
- Content management using Strapi
- Local development API with JSON Server
- Responsive design
- SEO-friendly page structure

## Tech Stack

- React
- React Router v7
- TypeScript
- Strapi CMS
- JSON Server
- React Markdown
- Tailwind CSS
- Vite

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- vite

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate to the project directory:

3. Install dependencies:

```bash
npm install
```

_You will also need a couple more dependencies like "json-server", "react-router" and "react-markdown"_

4. Create a `.env` file in the project root and add:

```env
VITE_API_URL="http://localhost:8000"
```

> **Important:** The application expects `VITE_API_URL` to point to the backend API (the localhost). Make sure the URL matches your local development environment.

### Running the Project

Start the development server:

```bash
npm run dev
```

Start JSON Server:

```bash
npx json-server --watch db.json --port 8000
```

**By the way you'll need to specify the port and src file in the package.json file**
_Just add this to the plugins -> "json-server": "json-server data/db.json --port 8000"_

Run Strapi (if configured separately):

```bash
npm run develop
```

## Pages

### Home

Landing page introducing the portfolio and highlighting featured content.

### About

Information about the developer, skills, experience, and background.

### Projects

A collection of projects with descriptions, technologies used, and links.

### Blog

Markdown-powered blog posts fetched and rendered dynamically.

### Contact

A contact form and additional ways to get in touch.

## Environment Variables

_Just the json-server in this case_

Example:

```env
VITE_API_URL="http://localhost:8000"
```

## Future Improvements

- Authentication
- Blog categories and tags
- Dark mode

## License

This project is licensed under the MIT License.
