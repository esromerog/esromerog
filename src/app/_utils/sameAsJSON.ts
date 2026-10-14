import profile from "@/content/cv/profile.json";

const { links } = profile;
const personId = `${links.website}/#person`;

export const sameAsJSON = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: "Esteban Romero",
      url: links.website,
      image: `${links.website}/images/me.png`,
      email: profile.email,
      description: profile.tagline,
      jobTitle: "Game designer, artist, and researcher",
      knowsAbout: profile.categories,
      sameAs: [links.github, links.itch, links.linkedin, links.instagram],
      worksFor: [
        { "@type": "CollegeOrUniversity", name: "New York University" },
        { "@type": "Organization", name: "MindHive / YouQuantified" },
      ],
      alumniOf: { "@type": "CollegeOrUniversity", name: "Tecnológico de Monterrey" },
    },
    {
      "@type": "WebSite",
      "@id": `${links.website}/#website`,
      name: "Esteban Romero - Portfolio",
      url: links.website,
      author: { "@id": personId },
    },
  ],
};
