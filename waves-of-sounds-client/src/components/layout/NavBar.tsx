// Guide to how I made NavBar: https://www.youtube.com/watch?v=SLfhMt5OUPI

import { useState } from "react"
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { IconButton } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";


export default function Navbar() {

  const [ isOpen, setIsOpen ] = useState(false);
  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => {
    setIsOpen((open) => !open) 
  }

  return (
    <nav className="navbar">
      <IconButton 
      className="menu_trigger" 
      aria-label='Toggle Menu'
      onClick={toggleMenu} 
      icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
      />
      <Link to="/" className="logo">
        <img src="/img/other/logo.png" alt="Logo" />
      </Link>
      <ul className={isOpen ? 'is_open' : ''}>
        <CustomLink to="./program" onClick={closeMenu}>program</CustomLink>
        <CustomLink to="./news" onClick={closeMenu}>news</CustomLink>
        <CustomLink to="./volunteers" onClick={closeMenu}>volunteers</CustomLink>
        <CustomLink to="./about" onClick={closeMenu}>about</CustomLink>
      </ul>
      <button className="buy_ticket styled_button">Buy ticket</button>
    </nav>
  )
}

function CustomLink({
  to,
  children,
  onClick,
  ...props
}: {
  readonly to: string;
  readonly children: string;
  readonly onClick?: () => void;
}) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} onClick={onClick} {...props}>
        {children}
      </Link>
    </li>
  );
}

