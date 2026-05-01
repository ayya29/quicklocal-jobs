import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/I18nProvider";
import { useAuth } from "@/hooks/useAuth";
import { jobs } from "@/data/jobs";
import { JobCard } from "@/components/jobs/JobCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  Briefcase, PlusCircle, Search, Wallet, Calendar, Star,
  HardHat, UserRound, TrendingUp, MessageSquare, LogIn, Plus,
} from "lucide-react";

const Dashboard = () => {
  const { t, lang } = useI18n();
  const { user, profile, roles, loading, refresh } = useAuth();
  const fr = lang === "fr";

  if (loading) {
    return <div className="container py-20 text-center text-muted-foreground">…</div>;
  }

  if (!user) {
    return (
      <div className="container py-20 max-w-md text-center">
        <h1 className="font-display text-3xl font-extrabold mb-3">
          {fr ? "Connectez-vous pour accéder à votre dashboard" : "Sign in to access your dashboard"}
        </h1>
        <p className="text-muted-foreground mb-6">
          {fr
            ? "Suivez vos missions, vos gains et vos demandes en un coup d'œil."
            : "Track your missions, earnings and requests at a glance."}
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

  const isClient = roles.includes("client");
  const isWorker = roles.includes("worker");
  const displayName = profile?.full_name || user.email?.split("@")[0] || "User";

  const enableRole = async (role: "client" | "worker") => {
    const { error } = await supabase.from("user_roles").insert({ user_id: user.id, role });
    if (error) {
      toast({ title: fr ? "Erreur" : "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: fr ? "Rôle activé !" : "Role enabled!" });
    await refresh();
  };

  return (
    <div className="container py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            {fr ? "Bonjour" : "Hello"},
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold">
            {displayName} 👋
          </h1>
          <div className="mt-2 flex flex-wrap gap-2">
            {roles.map((r) => (
              <span key={r} className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 text-accent border border-accent/30 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                {r === "client" ? <UserRound className="h-3 w-3" /> : r === "worker" ? <HardHat className="h-3 w-3" /> : null}
                {r === "client" ? (fr ? "Client" : "Client") : r === "worker" ? (fr ? "Travailleur" : "Worker") : "Admin"}
              </span>
            ))}
            {!isClient && (
              <button
                onClick={() => enableRole("client")}
                className="inline-flex items-center gap-1 rounded-full border border-dashed border-border px-3 py-1 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-base"
              >
                <Plus className="h-3 w-3" />{fr ? "Devenir client" : "Become client"}
              </button>
            )}
            {!isWorker && (
              <button
                onClick={() => enableRole("worker")}
                className="inline-flex items-center gap-1 rounded-full border border-dashed border-border px-3 py-1 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-base"
              >
                <Plus className="h-3 w-3" />{fr ? "Devenir travailleur" : "Become worker"}
              </button>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {isClient && (
            <Button variant="hero" size="lg" asChild>
              <Link to="/post"><PlusCircle className="h-4 w-4" />{fr ? "Publier une mission" : "Post a mission"}</Link>
            </Button>
          )}
          {isWorker && (
            <Button variant="outline" size="lg" asChild>
              <Link to="/jobs"><Search className="h-4 w-4" />{fr ? "Trouver un job" : "Find a job"}</Link>
            </Button>
          )}
        </div>
      </div>

      {/* CLIENT SECTION */}
      {isClient && (
        <section className="space-y-5">
          <SectionHeader
            icon={UserRound}
            title={fr ? "Espace Client" : "Client space"}
            subtitle={fr ? "Suivez vos missions publiées et vos demandes en cours." : "Track your posted missions and pending requests."}
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={Briefcase} label={fr ? "Missions actives" : "Active missions"} value="0" />
            <StatCard icon={Calendar} label={fr ? "En attente" : "Pending"} value="0" />
            <StatCard icon={MessageSquare} label={fr ? "Candidatures" : "Applications"} value="0" />
            <StatCard icon={Star} label={fr ? "Note donnée" : "Rating given"} value="—" />
          </div>

          <Panel title={fr ? "Vos missions publiées" : "Your posted missions"}>
            <EmptyState
              icon={Briefcase}
              title={fr ? "Aucune mission pour le moment" : "No mission yet"}
              description={fr ? "Publiez votre première mission en moins d'une minute." : "Post your first mission in under a minute."}
              cta={fr ? "Publier maintenant" : "Post now"}
              to="/post"
            />
          </Panel>

          <Panel title={fr ? "Inspirations près de chez vous" : "Inspiration near you"}>
            <div className="grid gap-5 sm:grid-cols-2">
              {jobs.slice(0, 2).map((j, i) => <JobCard key={j.id} job={j} index={i} />)}
            </div>
          </Panel>
        </section>
      )}

      {/* WORKER SECTION */}
      {isWorker && (
        <section className="space-y-5">
          <SectionHeader
            icon={HardHat}
            title={fr ? "Espace Travailleur" : "Worker space"}
            subtitle={fr ? "Trouvez des missions, suivez vos gains et votre réputation." : "Find missions, track your earnings and reputation."}
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={Wallet} label={fr ? "Gains du mois" : "Monthly earnings"} value="0 €" />
            <StatCard icon={TrendingUp} label={fr ? "Missions terminées" : "Completed jobs"} value="0" />
            <StatCard icon={Star} label={fr ? "Note moyenne" : "Average rating"} value="—" />
            <StatCard icon={MessageSquare} label={fr ? "Candidatures envoyées" : "Applications sent"} value="0" />
          </div>

          <Panel title={fr ? "Missions recommandées pour vous" : "Recommended missions"}>
            <div className="grid gap-5 sm:grid-cols-2">
              {jobs.slice(0, 4).map((j, i) => <JobCard key={j.id} job={j} index={i} />)}
            </div>
          </Panel>

          <Panel title={fr ? "Vos missions en cours" : "Your ongoing jobs"}>
            <EmptyState
              icon={HardHat}
              title={fr ? "Aucune mission en cours" : "No ongoing job"}
              description={fr ? "Postulez à une mission pour commencer." : "Apply to a mission to get started."}
              cta={fr ? "Voir les jobs" : "Browse jobs"}
              to="/jobs"
            />
          </Panel>
        </section>
      )}

      {/* No active role */}
      {!isClient && !isWorker && (
        <Panel title={fr ? "Choisissez un rôle pour commencer" : "Pick a role to get started"}>
          <p className="text-sm text-muted-foreground mb-4">
            {fr ? "Activez au moins un rôle pour accéder à votre espace personnalisé." : "Enable at least one role to access your personalized space."}
          </p>
          <div className="flex gap-3">
            <Button variant="hero" onClick={() => enableRole("client")}>
              <UserRound className="h-4 w-4" />{fr ? "Devenir client" : "Become client"}
            </Button>
            <Button variant="outline" onClick={() => enableRole("worker")}>
              <HardHat className="h-4 w-4" />{fr ? "Devenir travailleur" : "Become worker"}
            </Button>
          </div>
        </Panel>
      )}
    </div>
  );
};

const SectionHeader = ({ icon: Icon, title, subtitle }: { icon: typeof Star; title: string; subtitle: string }) => (
  <div className="flex items-center gap-3">
    <span className="flex h-11 w-11 items-center justify-center rounded-2xl gradient-warm text-accent-foreground shadow-glow">
      <Icon className="h-5 w-5" />
    </span>
    <div>
      <h2 className="font-display text-2xl font-extrabold">{title}</h2>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  </div>
);

const StatCard = ({ icon: Icon, label, value }: { icon: typeof Star; label: string; value: string }) => (
  <div className="rounded-2xl bg-card border border-border/60 p-5 shadow-card transition-base hover:shadow-elevated hover:-translate-y-0.5">
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      <Icon className="h-4 w-4 text-accent" />
    </div>
    <p className="mt-2 font-display text-3xl font-extrabold">{value}</p>
  </div>
);

const Panel = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl bg-card border border-border/60 p-6 shadow-card">
    <h3 className="font-display font-bold text-lg mb-4">{title}</h3>
    {children}
  </div>
);

const EmptyState = ({
  icon: Icon, title, description, cta, to,
}: { icon: typeof Star; title: string; description: string; cta: string; to: string }) => (
  <div className="text-center py-8">
    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-muted mb-3">
      <Icon className="h-6 w-6 text-muted-foreground" />
    </span>
    <p className="font-semibold">{title}</p>
    <p className="text-sm text-muted-foreground mb-4">{description}</p>
    <Button variant="hero" asChild><Link to={to}>{cta}</Link></Button>
  </div>
);

export default Dashboard;
