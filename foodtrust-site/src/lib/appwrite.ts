import { Client, Databases, Account, ID, Query } from "appwrite";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const productsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID;
const leadsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_LEADS_COLLECTION_ID;
const contactsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_CONTACTS_COLLECTION_ID;
const postsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION_ID;

function getClient() {
  if (!endpoint || !projectId) return null;
  const client = new Client();
  client.setEndpoint(endpoint).setProject(projectId);
  return client;
}

export async function submitLead(data: {
  name: string;
  email: string;
  company?: string;
  role?: string;
}) {
  const client = getClient();
  if (!client || !databaseId || !leadsCollectionId) {
    return { ok: true, id: "mock-lead-id" };
  }
  const databases = new Databases(client);
  const doc = await databases.createDocument(databaseId, leadsCollectionId, ID.unique(), data);
  return { ok: true, id: doc.$id };
}

export async function submitContact(data: { name: string; email: string; message: string }) {
  const client = getClient();
  if (!client || !databaseId || !contactsCollectionId) {
    return { ok: true, id: "mock-contact-id" };
  }
  const databases = new Databases(client);
  const doc = await databases.createDocument(databaseId, contactsCollectionId, ID.unique(), data);
  return { ok: true, id: doc.$id };
}

export async function getProductByCode(code: string) {
  const client = getClient();
  if (!client || !databaseId || !productsCollectionId) {
    return {
      ok: true,
      product: {
        code,
        name: "Sample Product",
        supplier: "Demo Supplier",
        status: "Verified",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString(),
      },
    };
  }
  const databases = new Databases(client);
  const res = await databases.listDocuments(databaseId, productsCollectionId, [Query.equal("code", code)]);
  const product = res.documents[0];
  if (!product) return { ok: false };
  return { ok: true, product };
}

export function getAccount() {
  const client = getClient();
  if (!client) return null;
  return new Account(client);
}

export async function listPosts({ page = 1, pageSize = 5 }: { page?: number; pageSize?: number }) {
  const client = getClient();
  if (!client || !databaseId || !postsCollectionId) {
    const total = 2;
    const demo = [
      { slug: "welcome-to-foodtrust", title: "Welcome to FoodTrust", content: "# Hello FoodTrust\nThis is a demo post.", excerpt: "Intro to FoodTrust" },
      { slug: "supply-chain-transparency", title: "Supply Chain Transparency", content: "## Why it matters\nDetails...", excerpt: "Why transparency matters" },
    ];
    return { ok: true, total, posts: demo.slice((page - 1) * pageSize, page * pageSize) };
  }
  const databases = new Databases(client);
  const res = await databases.listDocuments(databaseId, postsCollectionId, [Query.orderDesc("$createdAt"), Query.limit(pageSize), Query.offset((page - 1) * pageSize)]);
  return { ok: true, total: res.total, posts: res.documents };
}

export async function getPostBySlug(slug: string) {
  const client = getClient();
  if (!client || !databaseId || !postsCollectionId) {
    const post = { slug, title: slug.replace(/-/g, " "), content: "# Demo\nContent for " + slug };
    return { ok: true, post };
  }
  const databases = new Databases(client);
  const res = await databases.listDocuments(databaseId, postsCollectionId, [Query.equal("slug", slug), Query.limit(1)]);
  const post = res.documents[0];
  if (!post) return { ok: false };
  return { ok: true, post };
}