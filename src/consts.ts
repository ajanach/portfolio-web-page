import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  NAME: "Antonio Janach",
  TITLE: "Antonio Janach | DevOps & Cloud Engineer",
  DESCRIPTION: "Welcome! I'm Antonio, a DevOps & Cloud Engineer specialized in high availability and hybrid cloud automation.",
  AUTHOR: "Antonio Janach",
}

// About Page
export const ABOUT: Page = {
  TITLE: "About",
  DESCRIPTION: "A brief overview of my professional journey and core values.",
}

// Work Page
export const WORK: Page = {
  TITLE: "Work",
  DESCRIPTION: "A showcase of my academic and engineering projects.",
}

// Contact Page 
export const CONTACT: Page = {
  TITLE: "Contact",
  DESCRIPTION: "Get in touch for collaborations or cloud infrastructure inquiries.",
}

// Blog Page
export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "Writing on tech tutorials, career milestones, and industry insights.",
}

// Search Page
export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "Search all posts and work by keyword.",
}

// Links - Navigacijski meni
export const LINKS: Links = [
  {
    TEXT: "Home",
    HREF: "/",
  },
  {
    TEXT: "About",
    HREF: "/about",
  },
  {
    TEXT: "Work",
    HREF: "/work",
  },
  {
    TEXT: "Blog",
    HREF: "/blog",
  },
  {
    TEXT: "Contact",
    HREF: "/contact",
  }
]

// Socials - Ostaju isti
export const SOCIALS: Socials = [
  {
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "ajanach",
    HREF: "https://www.linkedin.com/in/ajanach/",
  },
  {
    NAME: "Credly",
    ICON: "credly",
    TEXT: "antonio-janach",
    HREF: "https://www.credly.com/users/antonio-janach/badges",
  },
  {
    NAME: "Github",
    ICON: "github",
    TEXT: "ajanach",
    HREF: "https://github.com/ajanach"
  },
  {
    NAME: "Email",
    ICON: "email",
    TEXT: "antonio@janach.cloud",
    HREF: "mailto:antonio@janach.cloud",
  },
]