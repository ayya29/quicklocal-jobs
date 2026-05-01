import { useState, useMemo } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { jobs, categories } from "@/data/jobs";
import { JobCard } from "@/components/jobs/JobCard";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";

const JobsPage = () => {
  const { t } = useI18n();
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(100);

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const text = (j.title.fr + j.title.en + j.description.fr + j.description.en).toLowerCase();
      if (q && !text.includes(q.toLowerCase())) return false;
      if (city && !j.location.toLowerCase().includes(city.toLowerCase())) return false;
      if (cat !== "all" && j.category !== cat) return false;
      if (j.price > maxPrice) return false;
      return true;
    });
  }, [q, city, cat, maxPrice]);

  return (
    <div className="container py-12">
      <header className="mb-8">
        <h1 className="font-display text-4xl font-extrabold">{t("nav.jobs")}</h1>
        <p className="mt-2 text-muted-foreground">{t("jobs.subtitle")}</p>
      </header>

      <div className="rounded-2xl bg-card border border-border/60 p-5 shadow-card grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="flex items-center gap-2 rounded-lg bg-muted px-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("hero.search.placeholder")} className="border-0 shadow-none focus-visible:ring-0 bg-transparent px-0" />
        </div>
        <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder={t("jobs.filter.location")} />
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="all">{t("jobs.filter.all")}</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{t(`cat.${c.id}` as const)}</option>
          ))}
        </select>
        <div className="flex items-center gap-3 px-1">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <div className="flex-1">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>{t("jobs.filter.price")}</span>
              <span className="font-semibold text-foreground">{maxPrice} €</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[hsl(var(--accent))]"
            />
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
          {t("jobs.empty")}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((j, i) => <JobCard key={j.id} job={j} index={i} />)}
        </div>
      )}
    </div>
  );
};

export default JobsPage;
