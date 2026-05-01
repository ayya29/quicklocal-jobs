import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "fr" | "en";

const dict = {
  fr: {
    "nav.home": "Accueil",
    "nav.jobs": "Jobs",
    "nav.post": "Publier",
    "nav.profile": "Profil",
    "nav.login": "Connexion",
    "nav.signup": "S'inscrire",

    "hero.badge": "Plateforme locale de micro-jobs",
    "hero.title": "Petits jobs, grands coups de main",
    "hero.subtitle": "JobiGo connecte les habitants de votre ville pour des missions rapides : ménage, livraison, bricolage, aide à domicile.",
    "hero.cta.find": "Trouver un job",
    "hero.cta.post": "Publier une mission",
    "hero.search.placeholder": "Que cherchez-vous ?",
    "hero.search.city": "Ville",
    "hero.search.button": "Rechercher",

    "stats.jobs": "missions actives",
    "stats.workers": "travailleurs vérifiés",
    "stats.cities": "villes couvertes",
    "stats.rating": "note moyenne",

    "categories.title": "Catégories populaires",
    "categories.subtitle": "Trouvez le bon profil pour chaque besoin du quotidien",
    "cat.cleaning": "Ménage",
    "cat.delivery": "Livraison",
    "cat.repair": "Bricolage",
    "cat.home": "Aide à domicile",
    "cat.garden": "Jardinage",
    "cat.tutoring": "Soutien scolaire",
    "cat.moving": "Déménagement",
    "cat.tech": "Aide informatique",

    "jobs.title": "Dernières missions",
    "jobs.subtitle": "Découvrez les jobs publiés près de chez vous",
    "jobs.viewAll": "Voir tous les jobs",
    "jobs.apply": "Postuler",
    "jobs.detail": "Voir le détail",
    "jobs.empty": "Aucun job ne correspond à vos critères.",
    "jobs.filter.price": "Prix max",
    "jobs.filter.location": "Localisation",
    "jobs.filter.category": "Catégorie",
    "jobs.filter.all": "Toutes",
    "jobs.posted": "Publié",
    "jobs.duration": "Durée estimée",

    "how.title": "Comment ça marche",
    "how.step1.title": "Publiez ou cherchez",
    "how.step1.desc": "Décrivez votre besoin en 1 minute, ou parcourez les missions disponibles.",
    "how.step2.title": "Choisissez la bonne personne",
    "how.step2.desc": "Comparez profils, notes et avis pour faire le bon choix.",
    "how.step3.title": "Mission accomplie",
    "how.step3.desc": "Le job est fait, vous évaluez : la confiance grandit pour la communauté.",

    "trust.title": "Une communauté de confiance",
    "trust.subtitle": "Notation, badges et profils vérifiés pour des échanges sereins.",
    "trust.badge.fast": "Réactif",
    "trust.badge.reliable": "Fiable",
    "trust.badge.top": "Top noté",

    "cta.title": "Prêt à rejoindre JobiGo ?",
    "cta.subtitle": "Inscrivez-vous gratuitement et trouvez votre première mission aujourd'hui.",
    "cta.button": "Commencer maintenant",

    "footer.tagline": "Le voisinage à portée de clic.",
    "footer.product": "Produit",
    "footer.company": "Entreprise",
    "footer.legal": "Légal",
    "footer.rights": "Tous droits réservés.",

    "detail.back": "Retour aux jobs",
    "detail.about": "À propos de la mission",
    "detail.posted_by": "Publié par",
    "detail.contact": "Contacter",
    "detail.similar": "Missions similaires",

    "profile.member": "Membre depuis",
    "profile.completed": "missions réalisées",
    "profile.bio": "À propos",
    "profile.reviews": "Avis reçus",
    "profile.history": "Historique",
  },
  en: {
    "nav.home": "Home",
    "nav.jobs": "Jobs",
    "nav.post": "Post",
    "nav.profile": "Profile",
    "nav.login": "Log in",
    "nav.signup": "Sign up",

    "hero.badge": "Local micro-jobs platform",
    "hero.title": "Small jobs, big helping hands",
    "hero.subtitle": "JobiGo connects neighbors for quick missions: cleaning, delivery, repairs, home help.",
    "hero.cta.find": "Find a job",
    "hero.cta.post": "Post a mission",
    "hero.search.placeholder": "What are you looking for?",
    "hero.search.city": "City",
    "hero.search.button": "Search",

    "stats.jobs": "active missions",
    "stats.workers": "verified workers",
    "stats.cities": "cities covered",
    "stats.rating": "average rating",

    "categories.title": "Popular categories",
    "categories.subtitle": "Find the right profile for every daily need",
    "cat.cleaning": "Cleaning",
    "cat.delivery": "Delivery",
    "cat.repair": "Repair",
    "cat.home": "Home help",
    "cat.garden": "Gardening",
    "cat.tutoring": "Tutoring",
    "cat.moving": "Moving",
    "cat.tech": "Tech help",

    "jobs.title": "Latest missions",
    "jobs.subtitle": "Discover jobs posted near you",
    "jobs.viewAll": "View all jobs",
    "jobs.apply": "Apply",
    "jobs.detail": "View details",
    "jobs.empty": "No job matches your filters.",
    "jobs.filter.price": "Max price",
    "jobs.filter.location": "Location",
    "jobs.filter.category": "Category",
    "jobs.filter.all": "All",
    "jobs.posted": "Posted",
    "jobs.duration": "Estimated duration",

    "how.title": "How it works",
    "how.step1.title": "Post or search",
    "how.step1.desc": "Describe your need in 1 minute, or browse available missions.",
    "how.step2.title": "Pick the right person",
    "how.step2.desc": "Compare profiles, ratings and reviews to make the best choice.",
    "how.step3.title": "Mission done",
    "how.step3.desc": "Job done — you rate: trust grows for the whole community.",

    "trust.title": "A trusted community",
    "trust.subtitle": "Ratings, badges and verified profiles for peaceful exchanges.",
    "trust.badge.fast": "Fast",
    "trust.badge.reliable": "Reliable",
    "trust.badge.top": "Top rated",

    "cta.title": "Ready to join JobiGo?",
    "cta.subtitle": "Sign up for free and find your first mission today.",
    "cta.button": "Get started",

    "footer.tagline": "Your neighborhood, one click away.",
    "footer.product": "Product",
    "footer.company": "Company",
    "footer.legal": "Legal",
    "footer.rights": "All rights reserved.",

    "detail.back": "Back to jobs",
    "detail.about": "About the mission",
    "detail.posted_by": "Posted by",
    "detail.contact": "Contact",
    "detail.similar": "Similar missions",

    "profile.member": "Member since",
    "profile.completed": "missions completed",
    "profile.bio": "About",
    "profile.reviews": "Reviews",
    "profile.history": "History",
  },
} as const;

type Key = keyof typeof dict.fr;

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: Key) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("jobigo-lang") as Lang | null) : null;
    return stored ?? "fr";
  });
  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("jobigo-lang", l);
    document.documentElement.lang = l;
  };
  const t = (key: Key) => dict[lang][key] ?? key;
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be inside I18nProvider");
  return ctx;
};
