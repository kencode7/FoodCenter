import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-[#0b3438] text-white">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <p className="text-sm text-white">© {new Date().getFullYear()} Nibia</p>
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <Link href="/" className="text-white hover:text-white/80">Home</Link>
          <Link href="/about" className="text-white hover:text-white/80">About</Link>
          <Link href="/features" className="text-white hover:text-white/80">Features</Link>
          <Link href="/pricing" className="text-white hover:text-white/80">Pricing</Link>
          <Link href="/blog" className="text-white hover:text-white/80">Blog</Link>
          <Link href="/contact" className="text-white hover:text-white/80">Contact</Link>
          <Link href="/privacy" className="text-white hover:text-white/80">Privacy</Link>
          <Link href="/terms" className="text-white hover:text-white/80">Terms</Link>
        </div>
      </div>
    </footer>
  );
}