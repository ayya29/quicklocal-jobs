import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/I18nProvider";
import { useAuth } from "@/hooks/useAuth";
import { jobs } from "@/data/jobs";
import { JobCard } from "@/components/jobs/JobCard";
import { Button } from "@/components/ui/button";
import { Star, Shield, Zap, Award, MapPin, LogIn } from "lucide-react";

const ProfilePage = () => {
  const { t, lang } = useI18n();
  const { user, profile, roles, loading } = useAuth();
  const fr = lang === "fr";

  if (loading) {
    return <div className="container py-20 text-center text-muted-foreground">…</div>;
  }

  if (!user) {
    return (
      <div className="container py-20 max-w-md text-center">
        <h1 className="font-display text-3xl font-extrabold mb-3">
          {fr ? "Connectez-vous pour voir votre profil" : "Sign in to view your profile"}
        </h1>
        <p className="text-muted-foreground mb-6">
          {fr
            ? "Créez un compte gratuit pour publier ou trouver des missions près de chez vous."
            : "Create a free account to post or find missions near you."}
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="hero" size="lg" asChild>
            <Link to="/auth?mode=signup">{fr ? "Créer un compte" : "Sign up"}</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/auth"><LogIn className="h-4 w-4" />{fr ? "Se connecter" : "Sign in"}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const displayName = profile?.full_name || user.email?.split("@")[0] || "User";
  const initials = displayName
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const memberYear = new Date(user.created_at).getFullYear().toString();

  const userView = {
    name: displayName,
    avatar: initials,
    city: profile?.city || (fr ? "Ville non renseignée" : "City not set"),
    rating: 5.0,
    completed: 0,
    member: memberYear,
    bio: profile?.bio || (fr ? "Aucune bio pour le moment." : "No bio yet."),
  };
  const user_legacy = userView;

  const reviews = [
    { author: "Sofia M.", rating: 5, text: "Travail impeccable et ponctuel !" },
    { author: "Camille L.", rating: 5, text: "Très professionnel, je recommande." },
    { author: "Théo R.", rating: 4, text: "Bonne communication, mission accomplie." },
  ];

  return (
    <div className="container py-12">
      {/* Header card */}
      <div className="rounded-3xl gradient-soft border border-border/60 p-6 md:p-10 shadow-card">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl gradient-warm text-accent-foreground font-display text-3xl font-extrabold shadow-glow">
            {userView.avatar}
          </div>
          <div className="flex-1">
            <h1 className="font-display text-3xl font-extrabold">{userView.name}</h1>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{userView.city}</span>
              <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 fill-accent text-accent" />{userView.rating}</span>
              <span>{userView.completed} {t("profile.completed")}</span>
              <span>{t("profile.member")} {userView.member}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {roles.map((r) => (
                <span key={r} className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 text-accent border border-accent/30 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                  {r === "client" ? (fr ? "Client" : "Client") : r === "worker" ? (fr ? "Travailleur" : "Worker") : "Admin"}
                </span>
              ))}
              <Badge icon={Zap} label={t("trust.badge.fast")} />
              <Badge icon={Shield} label={t("trust.badge.reliable")} />
              <Badge icon={Award} label={t("trust.badge.top")} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <section>
          <h2 className="font-display text-xl font-extrabold mb-4">{t("profile.history")}</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {jobs.slice(0, 4).map((j, i) => <JobCard key={j.id} job={j} index={i} />)}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-2xl bg-card border border-border/60 p-6 shadow-card">
            <h3 className="font-display font-bold text-lg mb-2">{t("profile.bio")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{userView.bio}</p>
          </div>
          <div className="rounded-2xl bg-card border border-border/60 p-6 shadow-card">
            <h3 className="font-display font-bold text-lg mb-4">{t("profile.reviews")}</h3>
            <ul className="space-y-4">
              {reviews.map((r, i) => (
                <li key={i} className="border-b border-border/60 last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">{r.author}</span>
                    <span className="inline-flex items-center gap-0.5 text-accent">
                      {Array.from({ length: r.rating }).map((_, k) => (
                        <Star key={k} className="h-3.5 w-3.5 fill-accent" />
                      ))}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{r.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

const Badge = ({ icon: Icon, label }: { icon: typeof Star; label: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-card border border-border/60 px-3 py-1 text-xs font-semibold shadow-card">
    <Icon className="h-3.5 w-3.5 text-accent" /> {label}
  </span>
);

export default ProfilePage;
