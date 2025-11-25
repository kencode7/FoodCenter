"use client";
import { useState } from "react";
import { z } from "zod";
import { submitContact } from "@/lib/appwrite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function set<K extends keyof typeof values>(key: K, v: string) {
    setValues((prev) => ({ ...prev, [key]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await submitContact(parsed.data);
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
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
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" value={values.message} onChange={(e) => set("message", e.target.value)} placeholder="How can we help?" />
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={status === "submitting"}>Send Message</Button>
        {status === "success" && <span className="text-sm text-green-600">Message sent. We’ll reply soon.</span>}
        {status === "error" && <span className="text-sm text-red-600">Please check inputs and try again.</span>}
      </div>
    </form>
  );
}