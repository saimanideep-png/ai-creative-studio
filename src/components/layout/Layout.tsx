import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { IntroVideoOverlay } from '../ui/IntroVideoOverlay';

export function Layout() {
  return (
    <>
      <IntroVideoOverlay />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
