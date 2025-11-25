import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Free",
    price: "$0",
    features: ["Browse verified products", "Basic supplier lookup", "Email support"],
  },
  {
    name: "Pro",
    price: "Contact Us",
    features: ["Advanced validation", "Logistics tracing", "Role-based access", "Priority support"],
  },
];

export default function PricingPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-bold tracking-tight">Pricing</h1>
        <p className="mt-3 text-muted-foreground">Start free, scale with enterprise capabilities.</p>
      </div>
      <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
        {tiers.map((t) => (
          <Card key={t.name}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{t.name}</span>
                <span className="text-xl font-semibold">{t.price}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="text-muted-foreground">• {f}</li>
                ))}
              </ul>
              <Button className="mt-6" variant={t.name === "Pro" ? "default" : "secondary"}>
                {t.name === "Pro" ? "Contact Sales" : "Get Started"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}