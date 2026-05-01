import { Link, useParams } from "react-router-dom";
import { jobs, categories } from "@/data/jobs";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock, Star, Calendar, MessageCircle } from "lucide-react";
import { JobCard } from "@/components/jobs/JobCard";
import NotFound from "./NotFound";

const JobDetailPage = () => {
  const { id } = useParams();
  const { t, lang } = useI18n();
  const job = jobs.find((j) => j.id === id);
  if (!job) return <NotFound />;
  const emoji = categories.find((c) => c.id === job.category)?.emoji ?? "💼";
  const similar = jobs.filter((j) => j.category === job.category && j.id !== job.id).slice(0, 3);

  return (
    <div className="container py-10">
      <Button asChild variant="ghost" size="sm" className="mb-6">
        <Link to="/jobs"><ArrowLeft className="h-4 w-4" /> {t("detail.back")}</Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <article className="rounded-3xl bg-card border border-border/60 p-8 shadow-card">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-3xl">{emoji}</span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {t(`cat.${job.category}` as const)}
                </span>
                <h1 className="font-display text-2xl md:text-3xl font-extrabold mt-1">{job.title[lang]}</h1>
              </div>
            </div>
            <span className="rounded-full gradient-warm text-accent-foreground px-5 py-2 text-lg font-bold shadow-glow">
              {job.price} €
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{job.location}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" />{job.duration[lang]}</span>
            <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" />{t("jobs.posted")} {job.postedAt}</span>
          </div>

          <hr className="my-6 border-border/60" />

          <h2 className="font-display text-lg font-bold mb-3">{t("detail.about")}</h2>
          <p className="text-foreground/90 leading-relaxed">{job.description[lang]}</p>
        </article>

        <aside className="space-y-5">
          <div className="rounded-2xl bg-card border border-border/60 p-6 shadow-card">
            <div className="text-xs uppercase font-semibold text-muted-foreground">{t("detail.posted_by")}</div>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/40 font-bold">
                {job.author.avatar}
              </span>
              <div>
                <div className="font-semibold">{job.author.name}</div>
                <div className="text-xs text-muted-foreground inline-flex items-center gap-1">
                  <Star className="h-3 w-3 fill-accent text-accent" /> {job.author.rating} · {job.author.completed} {t("profile.completed")}
                </div>
              </div>
            </div>
            <div className="mt-5 grid gap-2">
              <Button variant="hero" size="lg">{t("jobs.apply")}</Button>
              <Button variant="outline" size="lg"><MessageCircle className="h-4 w-4" />{t("detail.contact")}</Button>
            </div>
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-extrabold mb-6">{t("detail.similar")}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((j, i) => <JobCard key={j.id} job={j} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default JobDetailPage;
