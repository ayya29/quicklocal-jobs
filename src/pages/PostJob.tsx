import { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { categories } from "@/data/jobs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PostJobPage = () => {
  const { t } = useI18n();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("✨ Mission publiée (démo)");
      (e.target as HTMLFormElement).reset();
    }, 600);
  };

  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="font-display text-4xl font-extrabold">{t("nav.post")}</h1>
      <p className="mt-2 text-muted-foreground">Décrivez votre besoin en quelques champs.</p>

      <form onSubmit={onSubmit} className="mt-8 rounded-3xl bg-card border border-border/60 p-6 md:p-8 shadow-card grid gap-5">
        <Field label="Titre">
          <Input required maxLength={80} placeholder="Ex : Aide pour déménagement (2h)" />
        </Field>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Prix (€)">
            <Input type="number" min={5} max={500} required defaultValue={30} />
          </Field>
          <Field label={t("jobs.filter.location")}>
            <Input required placeholder="Paris 11e" />
          </Field>
        </div>

        <Field label={t("jobs.filter.category")}>
          <select required className="h-10 rounded-md border border-input bg-background px-3 text-sm">
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{t(`cat.${c.id}` as const)}</option>
            ))}
          </select>
        </Field>

        <Field label="Description">
          <Textarea required maxLength={1000} rows={5} placeholder="Décrivez votre besoin…" />
        </Field>

        <Button type="submit" variant="hero" size="lg" disabled={submitting} className="justify-self-start">
          {submitting ? "…" : "Publier la mission"}
        </Button>
      </form>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="grid gap-2">
    <span className="text-sm font-semibold text-foreground">{label}</span>
    {children}
  </label>
);

export default PostJobPage;
