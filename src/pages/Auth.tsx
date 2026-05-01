import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { Briefcase, Loader2, HardHat, UserRound } from "lucide-react";

const signUpSchema = z.object({
  full_name: z.string().trim().min(2, "Nom trop court").max(80),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  email: z.string().trim().email("Email invalide").max(255),
  password: z.string().min(6, "6 caractères min.").max(72),
  role: z.enum(["client", "worker"]),
});

const signInSchema = z.object({
  email: z.string().trim().email("Email invalide").max(255),
  password: z.string().min(1, "Mot de passe requis").max(72),
});

const AuthPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { user, loading } = useAuth();
  const { lang } = useI18n();
  const fr = lang === "fr";

  const initialTab = params.get("mode") === "signup" ? "signup" : "signin";
  const [tab, setTab] = useState<"signin" | "signup">(initialTab as "signin" | "signup");

  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    full_name: "",
    city: "",
    email: "",
    password: "",
    role: "client" as "client" | "worker",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate("/dashboard", { replace: true });
  }, [user, loading, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = signInSchema.safeParse(signInData);
    if (!parsed.success) {
      toast({ title: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: fr ? "Connexion impossible" : "Sign in failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: fr ? "Bienvenue !" : "Welcome back!" });
    navigate("/dashboard", { replace: true });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = signUpSchema.safeParse(signUpData);
    if (!parsed.success) {
      toast({ title: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          full_name: parsed.data.full_name,
          city: parsed.data.city ?? "",
          role: parsed.data.role,
        },
      },
    });
    setSubmitting(false);
    if (error) {
      toast({ title: fr ? "Inscription impossible" : "Sign up failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({
      title: fr ? "Compte créé 🎉" : "Account created 🎉",
      description: fr ? "Vous êtes connecté." : "You are signed in.",
    });
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="container py-16 max-w-md">
      <Link to="/" className="flex items-center justify-center gap-2 font-bold text-2xl mb-8 group">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl gradient-warm text-accent-foreground shadow-glow transition-spring group-hover:scale-110">
          <Briefcase className="h-6 w-6" />
        </span>
        <span className="font-display">
          Jobi<span className="text-accent">Go</span>
        </span>
      </Link>

      <div className="rounded-3xl bg-card border border-border/60 p-6 md:p-8 shadow-card">
        <Tabs value={tab} onValueChange={(v) => setTab(v as "signin" | "signup")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signin">{fr ? "Connexion" : "Sign in"}</TabsTrigger>
            <TabsTrigger value="signup">{fr ? "Inscription" : "Sign up"}</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="si-email">Email</Label>
                <Input id="si-email" type="email" autoComplete="email" required value={signInData.email}
                  onChange={(e) => setSignInData({ ...signInData, email: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="si-pw">{fr ? "Mot de passe" : "Password"}</Label>
                <Input id="si-pw" type="password" autoComplete="current-password" required value={signInData.password}
                  onChange={(e) => setSignInData({ ...signInData, password: e.target.value })} />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {fr ? "Se connecter" : "Sign in"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="su-name">{fr ? "Nom complet" : "Full name"}</Label>
                <Input id="su-name" required maxLength={80} value={signUpData.full_name}
                  onChange={(e) => setSignUpData({ ...signUpData, full_name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="su-city">{fr ? "Ville" : "City"}</Label>
                <Input id="su-city" maxLength={80} value={signUpData.city}
                  onChange={(e) => setSignUpData({ ...signUpData, city: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="su-email">Email</Label>
                <Input id="su-email" type="email" autoComplete="email" required value={signUpData.email}
                  onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="su-pw">{fr ? "Mot de passe" : "Password"}</Label>
                <Input id="su-pw" type="password" autoComplete="new-password" required minLength={6} value={signUpData.password}
                  onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })} />
              </div>

              <div className="space-y-2">
                <Label>{fr ? "Je suis..." : "I am a..."}</Label>
                <RadioGroup
                  value={signUpData.role}
                  onValueChange={(v) => setSignUpData({ ...signUpData, role: v as "client" | "worker" })}
                  className="grid grid-cols-2 gap-3"
                >
                  <label className={`flex items-center gap-2 rounded-xl border p-3 cursor-pointer transition-base ${signUpData.role === "client" ? "border-accent bg-accent/10" : "border-border hover:bg-muted"}`}>
                    <RadioGroupItem value="client" id="role-client" />
                    <UserRound className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium">{fr ? "Client" : "Client"}</span>
                  </label>
                  <label className={`flex items-center gap-2 rounded-xl border p-3 cursor-pointer transition-base ${signUpData.role === "worker" ? "border-accent bg-accent/10" : "border-border hover:bg-muted"}`}>
                    <RadioGroupItem value="worker" id="role-worker" />
                    <HardHat className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium">{fr ? "Travailleur" : "Worker"}</span>
                  </label>
                </RadioGroup>
                <p className="text-xs text-muted-foreground">
                  {fr ? "Vous pourrez activer l'autre rôle plus tard." : "You can enable the other role later."}
                </p>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {fr ? "Créer mon compte" : "Create account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;
