'use client'
import React from "react";
import Image from "next/image"
import { Navbar as NavbarUi,NavbarMenuToggle, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenu, NavbarMenuItem} from "@nextui-org/react"



export default function Header(){
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    
  const menuItems = [
    "Home",
    "Education",
    "Report",
    "About",
  ];

    return (
    <NavbarUi onMenuOpenChange={setIsMenuOpen} className="bg-yellow-50">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
           <Image
                src='/fire.png'
                width={50}
                height={50}
                alt="FlameFox Logo"
            />
          <p className="font-bold text-inherit">FlameFox</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/report">
            Report
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/education">
            Education
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/about" color="foreground" aria-current="page">
            About
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
            <Link
              color= "foreground"
              className="w-full"
              href="/"
              size="lg"
            >
              Home
            </Link>
            <Link
              color= "foreground"
              className="w-full"
              href="/report"
              size="lg"
            >
              Report
            </Link>
            <Link
              color= "foreground"
              className="w-full"
              href="/"
              size="lg"
            >
              Education
            </Link>
            <Link
              color= "foreground"
              className="w-full"
              href="/about"
              size="lg"
            >
              About
            </Link>
          </NavbarMenuItem>
      </NavbarMenu>
    </NavbarUi>
    )
}

