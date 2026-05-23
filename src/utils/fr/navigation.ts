const navBarLinks = [
  { name: "Accueil", url: "/fr" },
  { name: "Produits", url: "/fr/products" },
  { name: "Impact", url: "/fr/impact" },
  { name: "Technologie", url: "/fr/technology" },
  { name: "Traçabilité", url: "/fr/traceability" },
  { name: "Contact", url: "/fr/contact" },
];

const footerLinks = [
  {
    section: "GIE TooluBaay",
    links: [
      { name: "Accueil", url: "/fr" },
      { name: "Produits & Impact", url: "/fr/products" },
      { name: "Module Traçabilité", url: "/fr/traceability" },
    ],
  },
  {
    section: "Partenaires",
    links: [
      { name: "Devenir Partenaire", url: "/fr/contact" },
      { name: "Documentation", url: "/fr/welcome-to-docs/" },
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