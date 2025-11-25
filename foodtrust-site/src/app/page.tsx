import { Hero } from "@/components/site/Hero";
import { Features } from "@/components/site/Features";
import { TrustBadges } from "@/components/site/TrustBadges";
import { VerifyProductDemo } from "@/components/site/VerifyProductDemo";
import { LeadCaptureForm } from "@/components/site/LeadCaptureForm";

export default function Home() {
  return (
    <div>
      <Hero />
      <TrustBadges />
      <Features />
      <VerifyProductDemo />
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">See FoodTrust in Action</h2>
          <p className="mt-3 text-muted-foreground">Request a demo and we’ll tailor the walkthrough for your role.</p>
        </div>
        <div className="mt-8">
          <LeadCaptureForm />
        </div>
      </section>
    </div>
  );
}
