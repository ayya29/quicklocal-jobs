import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, MapPin, Sparkles, Shield, Zap, ArrowRight, Star } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { jobs, categories } from "@/data/jobs";
import { JobCard } from "@/components/jobs/JobCard";

const Index = () => {
  const { t } = useI18n();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="container relative z-10 grid gap-10 lg:grid-cols-2 items-center py-16 md:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              <Sparkles className="h-3.5 w-3.5" /> {t("hero.badge")}
            </span>
            <h1 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-foreground">
              {t("hero.title")}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">{t("hero.subtitle")}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/jobs">{t("hero.cta.find")} <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/post">{t("hero.cta.post")}</Link>
              </Button>
            </div>

            {/* Search bar */}
            <div className="mt-8 rounded-2xl bg-card border border-border/60 p-2 shadow-card flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center gap-2 px-3">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("hero.search.placeholder")}
                  className="border-0 shadow-none focus-visible:ring-0 px-0"
                />
              </div>
              <div className="flex items-center gap-2 px-3 sm:border-l border-border/60">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("hero.search.city")}
                  className="border-0 shadow-none focus-visible:ring-0 px-0"
                />
              </div>
              <Button asChild variant="hero">
                <Link to="/jobs">{t("hero.search.button")}</Link>
              </Button>
            </div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: "150ms" }}>
            <div className="absolute -inset-4 gradient-warm opacity-20 blur-3xl rounded-full" aria-hidden />
            <img
              src={heroImg}
              alt="Voisins s'entraidant pour des micro-jobs locaux"
              width={1536}
              height={1024}
              className="relative rounded-3xl shadow-elevated w-full h-auto"
            />
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-elevated border border-border/60 p-4 flex items-center gap-3 animate-float">
              <span className="flex h-10 w-10 items-center justify-center rounded-full gradient-warm text-accent-foreground">
                <Zap className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-bold">+1 240</div>
                <div className="text-xs text-muted-foreground">{t("stats.jobs")}</div>
              </div>
            </div>
            <div className="absolute -top-6 -right-2 bg-card rounded-2xl shadow-elevated border border-border/60 p-4 flex items-center gap-3 animate-float" style={{ animationDelay: "1s" }}>
              <Star className="h-5 w-5 fill-accent text-accent" />
              <div>
                <div className="text-sm font-bold">4.9 / 5</div>
                <div className="text-xs text-muted-foreground">{t("stats.rating")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { v: "1 240+", k: "stats.jobs" as const },
            { v: "8 500+", k: "stats.workers" as const },
            { v: "85", k: "stats.cities" as const },
            { v: "4.9 ⭐", k: "stats.rating" as const },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl bg-card border border-border/60 p-5 text-center shadow-card">
              <div className="font-display text-2xl md:text-3xl font-extrabold text-primary">{s.v}</div>
              <div className="mt-1 text-xs md:text-sm text-muted-foreground">{t(s.k)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold">{t("categories.title")}</h2>
          <p className="mt-3 text-muted-foreground">{t("categories.subtitle")}</p>
        </div>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
          {categories.map((c, i) => (
            <Link
              key={c.id}
              to="/jobs"
              className="group rounded-2xl bg-card border border-border/60 p-5 text-center shadow-card hover:shadow-elevated hover:-translate-y-1 transition-spring animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="text-4xl group-hover:scale-110 transition-spring inline-block">{c.emoji}</div>
              <div className="mt-3 font-semibold text-sm">{t(`cat.${c.id}` as const)}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* JOBS */}
      <section className="container py-16">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold">{t("jobs.title")}</h2>
            <p className="mt-2 text-muted-foreground">{t("jobs.subtitle")}</p>
          </div>
          <Button asChild variant="ghost">
            <Link to="/jobs">{t("jobs.viewAll")} <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.slice(0, 6).map((j, i) => <JobCard key={j.id} job={j} index={i} />)}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-surface py-20 mt-8">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold">{t("how.title")}</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((n, i) => (
              <div
                key={n}
                className="relative rounded-2xl bg-card border border-border/60 p-6 shadow-card animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-warm text-accent-foreground font-display font-bold text-lg shadow-glow">
                  {n}
                </div>
                <h3 className="mt-4 font-display font-bold text-lg">
                  {n === 1 ? t("how.step1.title") : n === 2 ? t("how.step2.title") : t("how.step3.title")}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {n === 1 ? t("how.step1.desc") : n === 2 ? t("how.step2.desc") : t("how.step3.desc")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="container py-20">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold">{t("trust.title")}</h2>
            <p className="mt-3 text-muted-foreground max-w-lg">{t("trust.subtitle")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {(["fast", "reliable", "top"] as const).map((b) => (
                <span key={b} className="inline-flex items-center gap-2 rounded-full bg-secondary/40 px-4 py-2 text-sm font-semibold">
                  <Shield className="h-4 w-4 text-primary" /> {t(`trust.badge.${b}` as const)}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl gradient-warm p-1 shadow-glow">
            <div className="rounded-[22px] bg-card p-8">
              <div className="flex items-center gap-1 text-accent">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 fill-accent" />)}
              </div>
              <blockquote className="mt-4 font-display text-xl font-semibold leading-snug">
                « J'ai trouvé quelqu'un en moins d'une heure pour m'aider à monter mon armoire. Service au top ! »
              </blockquote>
              <div className="mt-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/40 font-semibold">SM</span>
                <div>
                  <div className="text-sm font-semibold">Sofia M.</div>
                  <div className="text-xs text-muted-foreground">Lyon</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-20">
        <div className="rounded-3xl gradient-warm p-10 md:p-16 text-center shadow-elevated">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-accent-foreground">
            {t("cta.title")}
          </h2>
          <p className="mt-3 text-accent-foreground/90 max-w-xl mx-auto">{t("cta.subtitle")}</p>
          <Button asChild size="xl" className="mt-7 bg-card text-primary hover:bg-card/90">
            <Link to="/jobs">{t("cta.button")} <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Index;
