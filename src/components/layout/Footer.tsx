import { Briefcase } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { Link } from "react-router-dom";

export const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border/50 bg-surface mt-24">
      <div className="container py-12 grid gap-8 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl gradient-warm text-accent-foreground">
              <Briefcase className="h-5 w-5" />
            </span>
            <span className="font-display">Jobi<span className="text-accent">Go</span></span>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">{t("footer.tagline")}</p>
        </div>
        <FooterCol title={t("footer.product")} items={["Jobs", "Categories", "Pricing"]} />
        <FooterCol title={t("footer.company")} items={["About", "Blog", "Careers"]} />
        <FooterCol title={t("footer.legal")} items={["Privacy", "Terms", "Cookies"]} />
      </div>
      <div className="border-t border-border/50">
        <div className="container py-5 text-xs text-muted-foreground flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} JobiGo. {t("footer.rights")}</span>
          <span>Made with ♥ for local communities</span>
        </div>
      </div>
    </footer>
  );
};

const FooterCol = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <h4 className="font-semibold text-sm mb-3">{title}</h4>
    <ul className="space-y-2 text-sm text-muted-foreground">
      {items.map((i) => (
        <li key={i}><a href="#" className="hover:text-foreground transition-base">{i}</a></li>
      ))}
    </ul>
  </div>
);
