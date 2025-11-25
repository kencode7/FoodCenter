"use client";
import { z } from "zod";
import { useState } from "react";
import { submitLead } from "@/lib/appwrite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  role: z.string().optional(),
});

export function LeadCaptureForm() {
  const [values, setValues] = useState({ name: "", email: "", company: "", role: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await submitLead(parsed.data);
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  function set<K extends keyof typeof values>(key: K, v: string) {
    setValues((prev) => ({ ...prev, [key]: v }));
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={values.name} onChange={(e) => set("name", e.target.value)} placeholder="Jane Doe" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={values.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@company.com" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="company">Company</Label>
          <Input id="company" value={values.company} onChange={(e) => set("company", e.target.value)} placeholder="Company Inc." />
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <Input id="role" value={values.role} onChange={(e) => set("role", e.target.value)} placeholder="Restaurant, Supplier, etc." />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={status === "submitting"}>Request Demo</Button>
        {status === "success" && <span className="text-sm text-green-600">Thanks! We’ll be in touch.</span>}
        {status === "error" && <span className="text-sm text-red-600">Please check your inputs and try again.</span>}
      </div>
    </form>
  );
}