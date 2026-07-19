import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { GlassPanel } from "@/components/astral/GlassPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Radar, GraduationCap, School, Rocket, User } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Astral Vision" },
      { name: "description", content: "Sign in or join the Astral Vision Founding School Program as a student, teacher, school or professional." },
    ],
  }),
  component: AuthPage,
});

type Role = "student" | "teacher" | "school" | "professional";
const ROLES: Array<{ value: Role; label: string; blurb: string; icon: typeof User }> = [
  { value: "student", label: "Student", blurb: "Complete missions, earn XP", icon: User },
  { value: "teacher", label: "Teacher", blurb: "Run lessons, track progress", icon: GraduationCap },
  { value: "school", label: "School / Principal", blurb: "School-wide analytics", icon: School },
  { value: "professional", label: "Professional", blurb: "Orbit aerospace tools", icon: Rocket },
];

function AuthPage() {
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/mission-control" });
    });
  }, [navigate]);

  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-md items-center px-4 py-12">
      <GlassPanel tone="strong" className="w-full p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-cyan-grad">
            <Radar className="h-4 w-4 text-primary-foreground" />
          </span>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">Astral Vision</div>
            <div className="font-display text-lg font-semibold leading-tight">Mission Control access</div>
          </div>
        </div>

        <Tabs defaultValue="signin">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign in</TabsTrigger>
            <TabsTrigger value="signup">Join program</TabsTrigger>
          </TabsList>
          <TabsContent value="signin"><SignInForm /></TabsContent>
          <TabsContent value="signup"><SignUpForm /></TabsContent>
        </Tabs>

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
        </div>
        <GoogleButton />

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Want to explore first? <Link to="/demo/classroom" className="text-primary hover:underline">Launch the teacher demo</Link> — no account needed.
        </p>
      </GlassPanel>
    </main>
  );
}

function SignInForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="mt-4 space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);
        if (error) { toast.error(error.message); return; }
        toast.success("Signed in");
        navigate({ to: "/mission-control" });
      }}
    >
      <div>
        <Label htmlFor="si-email">Email</Label>
        <Input id="si-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="si-password">Password</Label>
        <Input id="si-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button type="submit" disabled={loading} className="w-full bg-cyan-grad text-primary-foreground hover:opacity-90">
        {loading ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>("teacher");
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="mt-4 space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signUp({
          email, password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: name, role },
          },
        });
        setLoading(false);
        if (error) { toast.error(error.message); return; }
        toast.success("Welcome to Astral Vision. Check your email to confirm.");
      }}
    >
      <div>
        <Label htmlFor="su-name">Display name</Label>
        <Input id="su-name" required value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="su-email">Email</Label>
        <Input id="su-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="su-password">Password</Label>
        <Input id="su-password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <Label>Role</Label>
        <RadioGroup value={role} onValueChange={(v) => setRole(v as Role)} className="mt-2 grid grid-cols-2 gap-2">
          {ROLES.map((r) => (
            <label
              key={r.value}
              htmlFor={`role-${r.value}`}
              className={
                "flex cursor-pointer items-start gap-2 rounded-md border p-3 text-sm transition " +
                (role === r.value ? "border-primary/60 bg-primary/5" : "border-border hover:bg-secondary/40")
              }
            >
              <RadioGroupItem id={`role-${r.value}`} value={r.value} className="mt-0.5" />
              <div>
                <div className="flex items-center gap-1.5 font-medium">
                  <r.icon className="h-3.5 w-3.5 text-primary" /> {r.label}
                </div>
                <div className="text-[11px] text-muted-foreground">{r.blurb}</div>
              </div>
            </label>
          ))}
        </RadioGroup>
      </div>
      <Button type="submit" disabled={loading} className="w-full bg-cyan-grad text-primary-foreground hover:opacity-90">
        {loading ? "Creating account…" : "Join the program"}
      </Button>
    </form>
  );
}

function GoogleButton() {
  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={async () => {
        try {
          const result = await lovable.auth.signInWithOAuth("google", {
            redirect_uri: window.location.origin,
          });
          if (result.error) { toast.error(result.error.message ?? "Google sign-in failed"); return; }
          if (result.redirected) return;
          window.location.href = "/mission-control";
        } catch (e) {
          toast.error(e instanceof Error ? e.message : "Google sign-in failed");
        }
      }}
    >
      Continue with Google
    </Button>
  );
}
