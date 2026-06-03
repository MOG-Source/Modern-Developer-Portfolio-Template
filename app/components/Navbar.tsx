import { NavLink } from 'react-router';
import { useState } from 'react';
import { FaLaptopCode, FaTimes, FaBars } from 'react-icons/fa';

const NavBar = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const base = 'transition hover:text-blue-400';
  const active = 'text-blue-400 font-semibold hover:opacity-0.7';
  return (
    <nav className="bg-gray-800 border-b border-gray-700 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-blue-300"
        >
          <FaLaptopCode className="text-blue-400 text-xl" />
          <span>The Friendly Developer</span>
        </NavLink>
        <div className="hidden md:flex items-center gap-6">
          <div className="space-x-4 text-sm text-gray-300">
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to="/projects"
            >
              Projects
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to="/blog"
            >
              Blog
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to="/contact"
            >
              Contact
            </NavLink>
          </div>
        </div>
        <div className="md:hidden flex items-center gap-4">
          <button
            title="menu"
            onClick={() => setMenuIsOpen(!menuIsOpen)}
            className="cursor-pointer text-blue-400 text-xl hover:text-blue-600"
          >
            {menuIsOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {menuIsOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 px-6 py-4 space-y-2 space-x-4 text-center">
          <NavLink
            className={({ isActive }) => (isActive ? active : base)}
            to="/"
            // You could add an onClick={()=>setMenuIsClosed(false)} if you wanted the menu to close every time the user chooses a certain page
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? active : base)}
            to="/projects"
          >
            Projects
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? active : base)}
            to="/blog"
          >
            Blog
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? active : base)}
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? active : base)}
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
