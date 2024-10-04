// Guide to how I made NavBar: https://www.youtube.com/watch?v=SLfhMt5OUPI

import { useState } from "react"
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { IconButton } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";


export default function Navbar() {

  const [ isOpen, setIsOpen ] = useState(false);

  // Function for toggle menu
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
        <img src="../src/assets/images/logo.png" alt="Logo" />
      </Link>
      <ul className={isOpen ? 'is_open' : ''}>
        <CustomLink to="./program">program</CustomLink>
        <CustomLink to="./news">news</CustomLink>
        <CustomLink to="./volunteers">volunteers</CustomLink>
        <CustomLink to="./about">about</CustomLink>
      </ul>
      <button className="buy_ticket styled_button">Buy ticket</button>
    </nav>
  )
}

function CustomLink({ to, children, ...props }: { to: string, children: string }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}



// /* Navbar from Chakra: https://chakra-templates.vercel.app/navigation/navbar*/

// import {
//     Box,
//     Flex,
//     Text,
//     IconButton,
//     Button,
//     Stack,
//     Collapse,
//     useColorModeValue,
//     useDisclosure,
//   } from '@chakra-ui/react'
  
//   import {
//     HamburgerIcon,
//     CloseIcon,
//   } from '@chakra-ui/icons'

//   interface NavItem {
//     label: string
//     href?: string
//   }
  
//   const NAV_ITEMS: Array<NavItem> = [
//     {
//       label: 'program',
//       href: '../pages/Program.tsx',
//     },
//     {
//       label: 'news',
//       href: '#',
//     },
//     {
//       label: 'volunteers',
//       href: '#',
//     },
//     {
//       label: 'about',
//       href: '#',
//     },
//   ]
  
//   export default function NavBar() {
//     const { isOpen, onToggle } = useDisclosure()
  
//     return (
//       <Box>
//         <Flex
//           bgColor={'rgb(143, 143, 143, 0.4)'}
//           position={'fixed'}
//           maxH={'60px'}
//           width={'100%'}
//           align={'center'}
//           py={{ base: 2 }}
//           px={{ base: 4 }}
//           >
//           <Flex
//             flex={{ base: 1, md: 'auto' }}
//             display={{ base: 'flex', md: 'none' }}>
//             <IconButton
//               onClick={onToggle}
//               icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
//               variant={'ghost'}
//               aria-label={'Toggle Navigation'}
//             />
//           </Flex>
//           <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
//             <a href="../src/App.tsx">logo
//               {/* <img src="../src/assets/images/logo.png" alt="logo"/> */}
//             </a>
//             <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
//               <DesktopNav />
//             </Flex>
//           </Flex>
  
//           <Stack
//             flex={{ base: 1, md: 0 }}
//             justify={'flex-end'}
//             direction={'row'}
//             spacing={6}>
//             <Button 
//             as={'a'} 
//             href={'#'}
//             bgColor={'#083C6E'}
//             color={'white'}
//             >
//               Buy ticket
//             </Button>
//           </Stack>
//         </Flex>
  
//         <Collapse in={isOpen} >
//           <MobileNav />
//         </Collapse>
//       </Box>
//     )
//   }
  
//   const DesktopNav = () => {
//     const linkColor = useColorModeValue('gray.600', 'gray.200')
//     return (
//       <Stack direction={'row'} spacing={4}>
//         {NAV_ITEMS.map((navItem) => (
//           <Box key={navItem.label}>
//                 <Box
//                   as="a"
//                   p={2}
//                   href={navItem.href ?? '#'}
//                   fontSize={'sm'}
//                   fontWeight={500}
//                   color={linkColor}
//                   _hover={{
//                     textDecoration: 'none',
//                   }}>
//                   {navItem.label}
//                 </Box>
//           </Box>
//         ))}
//       </Stack>
//     )
//   }
  
//   const MobileNav = () => {
//     return (
//       <Stack 
//       bgColor={'rgb(143, 143, 143, 0.4)'}
//       p={4} 
//       position={'absolute'}
//       top={'60px'}
//       width={'100%'}
//       >
//         {NAV_ITEMS.map((navItem) => (
//           <MobileNavItem key={navItem.label} {...navItem} />
//         ))}
//       </Stack>
//     )
//   }
  
//   const MobileNavItem = ({ label, href }: NavItem) => {
  
//     return (
//       <Stack spacing={4} >
//         <Box
//           py={2}
//           as="a"
//           href={href ?? '#'}
//           justifyContent="space-between"
//           alignItems="center"
//           _hover={{
//             textDecoration: 'none',
//           }}>
//           <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
//             {label}
//           </Text>
//         </Box>
//       </Stack>
//     )
//   }
