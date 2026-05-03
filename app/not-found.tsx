import type { Metadata } from 'next';
import css from './page.module.css';
export const metadata: Metadata = {
  title: '404 - Page Not Found | NoteHub',
  description: 'The page you are looking for does not exist or has been moved.',

  openGraph: {
    title: '404 - Page Not Found | NoteHub',
    description:
      'Oops! This page does not exist. Try going back to the homepage.',
    url: 'https://your-site-url.com/404',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
