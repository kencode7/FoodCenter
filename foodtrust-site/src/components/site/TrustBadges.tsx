export function TrustBadges() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm uppercase tracking-wider text-muted-foreground">Trusted by forward-thinking food businesses</p>
        <div className="mt-6 grid grid-cols-2 items-center justify-center gap-6 md:grid-cols-4">
          <div className="text-sm text-muted-foreground">RestaurantCo</div>
          <div className="text-sm text-muted-foreground">SupplyChainX</div>
          <div className="text-sm text-muted-foreground">ColdChainPro</div>
          <div className="text-sm text-muted-foreground">Regulato</div>
        </div>
      </div>
    </section>
  );
}