"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProductByCode } from "@/lib/appwrite";

export function VerifyProductDemo() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function onVerify() {
    setLoading(true);
    setError(null);
    setProduct(null);
    try {
      const res = await getProductByCode(code.trim());
      if (res.ok) setProduct(res.product);
      else setError("No product found for that code.");
    } catch {
      setError("Verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-2xl font-semibold">Quick Product Verification</h2>
        <p className="mt-2 text-sm text-muted-foreground">Enter a product code or scan input to check verification status.</p>
        <div className="mt-6 flex gap-3">
          <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="e.g. PROD-ABC-123" />
          <Button onClick={onVerify} disabled={loading || !code.trim()}>Verify</Button>
        </div>
        {product && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{product.name ?? "Product"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Code:</span>
                <span>{product.code}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Supplier:</span>
                <span>{product.supplier ?? "Unknown"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant="secondary">{product.status ?? "Verified"}</Badge>
              </div>
              {product.expiresAt && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Expires:</span>
                  <span>{new Date(product.expiresAt).toLocaleDateString()}</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </div>
    </section>
  );
}