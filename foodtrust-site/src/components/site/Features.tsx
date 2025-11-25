import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Search Verified Products",
    desc: "Find products with verified provenance, expiry, and compliance records.",
  },
  {
    title: "Validate Suppliers",
    desc: "Prevent fake or expired items with blockchain-grade verification and audits.",
  },
  {
    title: "Secure Distribution & Logistics",
    desc: "Trace shipments, monitor cold-chain, and ensure tamper-evident handling.",
  },
  {
    title: "Role-based Access",
    desc: "Tailored views for restaurants, suppliers, distributors, and regulators.",
  },
];

export function Features() {
  return (
    <section id="features" className="container mx-auto px-4 py-16">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Core Features</h2>
        <p className="mt-3 text-muted-foreground">
          Built to instill trust and transparency while keeping operations simple.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <Card key={f.title}>
            <CardHeader>
              <CardTitle className="text-lg">{f.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}