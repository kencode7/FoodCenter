import { ContactForm } from "@/components/site/ContactForm";

export default function ContactPage() {
  return (
    <div>
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight">Contact FoodTrust</h1>
          <p className="mt-3 text-muted-foreground">Send us a message — we’ll get back shortly.</p>
        </div>
        <div className="mt-8">
          <ContactForm />
        </div>
        <div className="mt-12">
          <div className="aspect-video w-full max-w-2xl mx-auto rounded-lg border bg-muted/30" />
        </div>
      </section>
    </div>
  );
}