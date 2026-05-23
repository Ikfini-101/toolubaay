// An array of links for navigation bar
const navBarLinks = [
  { name: "Home", url: "/en" },
  { name: "Products", url: "/en/products" },
  { name: "Impact", url: "/en/impact" },
  { name: "Technology", url: "/en/technology" },
  { name: "Traceability", url: "/en/traceability" },
  { name: "Contact", url: "/en/contact" },
];
// An array of links for footer
const footerLinks = [
  {
    section: "TooluBaay GIE",
    links: [
      { name: "Home", url: "/en" },
      { name: "Products & Impact", url: "/en/products" },
      { name: "Traceability Module", url: "/en/traceability" },
    ],
  },
  {
    section: "Partners",
    links: [
      { name: "Become a Partner", url: "/en/contact" },
      { name: "Technology", url: "/en/technology" },
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