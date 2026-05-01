import { Link, NavLink, useLocation } from "react-router-dom";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import { Briefcase, Globe, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/jobs", label: t("nav.jobs") },
    { to: "/post", label: t("nav.post") },
    { to: "/profile", label: t("nav.profile") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg group" aria-label="JobiGo">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl gradient-warm text-accent-foreground shadow-glow transition-spring group-hover:scale-110">
            <Briefcase className="h-5 w-5" />
          </span>
          <span className="font-display text-foreground">
            Jobi<span className="text-accent">Go</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-base",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-base"
            aria-label="Toggle language"
          >
            <Globe className="h-4 w-4" />
            <span className="uppercase">{lang}</span>
          </button>
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            {t("nav.login")}
          </Button>
          <Button variant="hero" size="sm" className="hidden sm:inline-flex">
            {t("nav.signup")}
          </Button>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/50 bg-background animate-fade-up">
          <nav className="container py-4 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-3 rounded-lg text-sm font-medium",
                    isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="flex gap-2 pt-2">
              <Button variant="ghost" size="sm" className="flex-1">{t("nav.login")}</Button>
              <Button variant="hero" size="sm" className="flex-1">{t("nav.signup")}</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
