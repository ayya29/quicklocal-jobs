export type Job = {
  id: string;
  title: { fr: string; en: string };
  description: { fr: string; en: string };
  price: number;
  location: string;
  category: "cleaning" | "delivery" | "repair" | "home" | "garden" | "tutoring" | "moving" | "tech";
  duration: { fr: string; en: string };
  postedAt: string;
  author: {
    name: string;
    avatar: string;
    rating: number;
    completed: number;
  };
};

export const jobs: Job[] = [
  {
    id: "1",
    title: { fr: "Aide pour déménagement (2h)", en: "Help with moving (2h)" },
    description: {
      fr: "Besoin d'un coup de main pour porter quelques cartons et meubles légers du 3e étage au camion garé en bas. Ascenseur disponible.",
      en: "Need a hand carrying boxes and light furniture from 3rd floor down to a van. Elevator available.",
    },
    price: 40,
    location: "Paris 11e",
    category: "moving",
    duration: { fr: "2 heures", en: "2 hours" },
    postedAt: "2026-04-30",
    author: { name: "Camille L.", avatar: "CL", rating: 4.9, completed: 12 },
  },
  {
    id: "2",
    title: { fr: "Ménage hebdomadaire appartement", en: "Weekly apartment cleaning" },
    description: {
      fr: "Recherche personne sérieuse pour ménage régulier d'un T3 (60m²). Produits fournis.",
      en: "Looking for a reliable person for regular cleaning of a 60m² apartment. Products provided.",
    },
    price: 35,
    location: "Lyon 7e",
    category: "cleaning",
    duration: { fr: "3 heures", en: "3 hours" },
    postedAt: "2026-04-29",
    author: { name: "Sofia M.", avatar: "SM", rating: 5.0, completed: 24 },
  },
  {
    id: "3",
    title: { fr: "Montage meuble IKEA", en: "Assemble IKEA furniture" },
    description: {
      fr: "Armoire PAX à monter, notice fournie. Outils basiques nécessaires.",
      en: "PAX wardrobe to assemble, instructions included. Basic tools needed.",
    },
    price: 50,
    location: "Bordeaux",
    category: "repair",
    duration: { fr: "2-3 heures", en: "2-3 hours" },
    postedAt: "2026-04-29",
    author: { name: "Théo R.", avatar: "TR", rating: 4.7, completed: 8 },
  },
  {
    id: "4",
    title: { fr: "Livraison de courses", en: "Grocery delivery" },
    description: {
      fr: "Livrer un panier de courses depuis le supermarché jusqu'à mon domicile (1km).",
      en: "Deliver groceries from supermarket to my home (1km away).",
    },
    price: 15,
    location: "Marseille 8e",
    category: "delivery",
    duration: { fr: "1 heure", en: "1 hour" },
    postedAt: "2026-04-28",
    author: { name: "Nora B.", avatar: "NB", rating: 4.8, completed: 19 },
  },
  {
    id: "5",
    title: { fr: "Tonte de pelouse", en: "Lawn mowing" },
    description: {
      fr: "Petit jardin de 80m² à tondre. Tondeuse fournie.",
      en: "Small 80m² garden to mow. Mower provided.",
    },
    price: 30,
    location: "Toulouse",
    category: "garden",
    duration: { fr: "1h30", en: "1.5 hours" },
    postedAt: "2026-04-27",
    author: { name: "Marc D.", avatar: "MD", rating: 4.6, completed: 6 },
  },
  {
    id: "6",
    title: { fr: "Cours de maths niveau lycée", en: "High-school math tutoring" },
    description: {
      fr: "Soutien hebdomadaire pour élève de Première, spécialité maths.",
      en: "Weekly support for 11th-grade student, math specialty.",
    },
    price: 25,
    location: "Nantes",
    category: "tutoring",
    duration: { fr: "1 heure", en: "1 hour" },
    postedAt: "2026-04-27",
    author: { name: "Lina K.", avatar: "LK", rating: 5.0, completed: 32 },
  },
  {
    id: "7",
    title: { fr: "Configuration nouvelle box internet", en: "Set up new internet box" },
    description: {
      fr: "Installer et configurer la box, connecter TV et imprimante au Wi-Fi.",
      en: "Install and configure box, connect TV and printer to Wi-Fi.",
    },
    price: 35,
    location: "Lille",
    category: "tech",
    duration: { fr: "1-2 heures", en: "1-2 hours" },
    postedAt: "2026-04-26",
    author: { name: "Julien P.", avatar: "JP", rating: 4.8, completed: 14 },
  },
  {
    id: "8",
    title: { fr: "Compagnie pour personne âgée", en: "Companionship for elderly" },
    description: {
      fr: "Passer 2h avec ma grand-mère pour discuter et l'accompagner en promenade.",
      en: "Spend 2h with my grandmother for conversation and a walk.",
    },
    price: 30,
    location: "Strasbourg",
    category: "home",
    duration: { fr: "2 heures", en: "2 hours" },
    postedAt: "2026-04-26",
    author: { name: "Émilie V.", avatar: "EV", rating: 4.9, completed: 21 },
  },
];

export const categories = [
  { id: "cleaning", emoji: "🧹" },
  { id: "delivery", emoji: "📦" },
  { id: "repair", emoji: "🔧" },
  { id: "home", emoji: "🏠" },
  { id: "garden", emoji: "🌿" },
  { id: "tutoring", emoji: "📚" },
  { id: "moving", emoji: "🚚" },
  { id: "tech", emoji: "💻" },
] as const;
