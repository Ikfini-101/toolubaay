const navBarLinks = [
  { name: "Accueil", url: "/" },
  { name: "Produits", url: "/products" },
  { name: "Impact", url: "/impact" },
  { name: "Technologie", url: "/technology" },
  { name: "Traçabilité", url: "/traceability" },
  { name: "Contact", url: "/contact" },
];

const footerLinks = [
  {
    section: "GIE TooluBaay",
    links: [
      { name: "Accueil", url: "/" },
      { name: "Produits & Impact", url: "/products" },
      { name: "Module Traçabilité", url: "/traceability" },
    ],
  },
  {
    section: "Partenaires",
    links: [
      { name: "Devenir Partenaire", url: "/contact" },
      { name: "Documentation", url: "/welcome-to-docs/" },
    ],
  },
];

const socialLinks = {
  facebook: "https://www.facebook.com/",
  x: "https://twitter.com/",
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};