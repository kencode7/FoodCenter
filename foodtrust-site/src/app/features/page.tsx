import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FeaturesPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">Features</h1>
        <p className="mt-3 text-muted-foreground">Explore the core capabilities of FoodTrust in depth.</p>
        <div className="mt-8">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="search">
              <AccordionTrigger>Search Verified Products</AccordionTrigger>
              <AccordionContent>
                Find products with verified provenance, expiry, and compliance records. Filter by supplier, category, and certification.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="validation">
              <AccordionTrigger>Supplier Validation</AccordionTrigger>
              <AccordionContent>
                Prevent fake or expired items through blockchain-grade checks, audit trails, and automated alerts for anomalies.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="distribution">
              <AccordionTrigger>Secure Distribution & Logistics</AccordionTrigger>
              <AccordionContent>
                Trace shipments, monitor cold-chain conditions, and enforce tamper-evident handling across the distribution network.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}