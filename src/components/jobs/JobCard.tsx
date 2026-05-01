import { Link } from "react-router-dom";
import { Star, MapPin, Clock } from "lucide-react";
import { Job, categories } from "@/data/jobs";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/button";

const emojiFor = (id: Job["category"]) => categories.find((c) => c.id === id)?.emoji ?? "💼";

export const JobCard = ({ job, index = 0 }: { job: Job; index?: number }) => {
  const { lang, t } = useI18n();
  return (
    <article
      className="group relative flex flex-col rounded-2xl bg-card border border-border/60 p-5 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-spring animate-fade-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-2xl">
          {emojiFor(job.category)}
        </span>
        <span className="rounded-full bg-accent/10 text-accent px-3 py-1 text-sm font-bold">
          {job.price} €
        </span>
      </div>

      <h3 className="mt-4 font-display font-bold text-lg leading-snug text-foreground group-hover:text-primary transition-base">
        {job.title[lang]}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{job.description[lang]}</p>

      <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
        <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{job.duration[lang]}</span>
        <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-accent text-accent" />{job.author.rating}</span>
      </div>

      <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/40 text-xs font-semibold text-foreground">
            {job.author.avatar}
          </span>
          <span className="text-xs text-muted-foreground">{job.author.name}</span>
        </div>
        <Button asChild size="sm" variant="soft">
          <Link to={`/jobs/${job.id}`}>{t("jobs.detail")}</Link>
        </Button>
      </div>
    </article>
  );
};
