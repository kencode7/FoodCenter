FoodTrust — Marketing Site
==========================

Production-ready marketing site for FoodTrust, an ecosystem enabling verified product search, supplier validation (preventing fake/expired food via blockchain-grade checks), and secure distribution/logistics for restaurants, suppliers, distributors, and regulators.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## UI Components (shadcn/ui)

The project is initialized with shadcn and includes common components.

- Init (already done):

```
npx shadcn@latest init
```

- Add components (examples):

```
npx shadcn@latest add button card input textarea form label select badge alert
```

## Appwrite Integration

Environment variables (create `.env.local` based on below):

```
NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT_ID=
NEXT_PUBLIC_APPWRITE_DATABASE_ID=
NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID=
NEXT_PUBLIC_APPWRITE_LEADS_COLLECTION_ID=
```

Library

- `src/lib/appwrite.ts` provides helpers:
  - `submitLead({ name, email, company, role })` — stores demo requests
  - `getProductByCode(code)` — looks up a product by code
  - `getAccount()` — returns Appwrite `Account` if configured
- Safe fallbacks are included so the site remains functional without Appwrite.

Pages & Sections

- Homepage: Hero, Trust Badges, Features, Verify Product demo, Lead Capture form
- Verify: `/verify` quick verification tool
- Contact: `/contact` reuses lead capture
- Global layout: Navbar, Footer, metadata

Production Notes

- Ensure Tailwind and shadcn CSS variables are present in `src/app/globals.css`.
- Configure Appwrite CORS to allow your domain.
- Create the following Appwrite resources:
  - Database with `products` collection (attribute: `code` string, plus metadata)
  - `leads` collection (attributes: `name`, `email`, `company`, `role`)
  - Optional: enable anonymous sessions or email/password for demos
- Vercel: set env vars in project settings; build with `NEXT_TELEMETRY_DISABLED=1` if desired.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
