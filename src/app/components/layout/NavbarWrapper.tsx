// src/app/components/layout/NavbarWrapper.tsx
"use client";

import Navbar from './Navbar';
import { usePathname } from 'next/navigation';

const NavbarWrapper = () => {
  const pathname = usePathname();
  const showNavbar = pathname !== '/'; // Ocultar la barra de navegación en la página de inicio de sesión

  return showNavbar ? <Navbar /> : null;
};

export default NavbarWrapper;
