// An array of links for navigation bar
const navBarLinks = [
  { name: "Home", url: "/" },
  { name: "Products", url: "/products" },
  { name: "Impact", url: "/impact" },
  { name: "Technology", url: "/technology" },
  { name: "Traceability", url: "/traceability" },
  { name: "Contact", url: "/contact" },
];
// An array of links for footer
const footerLinks = [
  {
    section: "TooluBaay GIE",
    links: [
      { name: "Home", url: "/" },
      { name: "Products & Impact", url: "/products" },
      { name: "Traceability Module", url: "/traceability" },
    ],
  },
  {
    section: "Partners",
    links: [
      { name: "Become a Partner", url: "/contact" },
      { name: "Documentation", url: "/welcome-to-docs/" },
    ],
  },
];
// An object of links for social icons
const socialLinks = {
  facebook: "https://www.facebook.com/",
  x: "https://twitter.com/",
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};