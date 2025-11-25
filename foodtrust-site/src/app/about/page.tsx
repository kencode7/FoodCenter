export default function AboutPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">Our Mission</h1>
        <p className="mt-4 text-muted-foreground">
          FoodTrust exists to ensure safe, transparent, and trusted food supply chains. We help every stakeholder — restaurants, suppliers, distributors, and regulators — verify products, validate suppliers, and manage secure logistics.
        </p>
        <h2 className="mt-10 text-2xl font-semibold">Story</h2>
        <p className="mt-2 text-muted-foreground">
          Born out of real-world challenges in handling provenance and expiry, FoodTrust brings blockchain-grade checks and practical workflows to daily operations.
        </p>
        <h2 className="mt-10 text-2xl font-semibold">Values</h2>
        <ul className="mt-2 list-disc pl-6 text-muted-foreground">
          <li>Trust through verification</li>
          <li>Transparency by default</li>
          <li>Ease-of-use and speed</li>
          <li>Security and compliance</li>
        </ul>
        <h2 className="mt-10 text-2xl font-semibold">Team</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="font-medium">Alex Chen</p>
            <p className="text-sm text-muted-foreground">Founder & Supply Chain</p>
          </div>
          <div>
            <p className="font-medium">Priya Singh</p>
            <p className="text-sm text-muted-foreground">Engineering Lead</p>
          </div>
        </div>
      </div>
    </section>
  );
}