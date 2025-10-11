// lib/sanity.js
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your_project_id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  useCdn: false, // set to false when using tokens
});

// Create a separate client for mutating data
export const writeClient = client.withConfig({
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
});

// Helper untuk generate URL gambar dari Sanity
const builder = imageUrlBuilder(client);

// Replace urlFor with a safe wrapper to avoid "Malformed asset _ref ''" runtime errors
function isValidImageSource(src: any): boolean {
  // null/undefined
  if (!src) return false;

  // string asset id like "image-...-jpg" or full url
  if (typeof src === "string") {
    // sanity image ids start with "image-"
    if (src.trim().length === 0) return false;
    return src.startsWith("image-") || src.includes("image-");
  }

  // object with asset._ref
  if (src.asset && typeof src.asset._ref === "string" && src.asset._ref.trim().length > 0) {
    return true;
  }

  // object with direct _ref (rare)
  if (typeof src._ref === "string" && src._ref.trim().length > 0) {
    return true;
  }

  return false;
}

// A lightweight, chainable fallback that mimics the shape used by callers: .width().height().url()
function emptyImageBuilder() {
  const chain: any = {
    width() {
      return chain;
    },
    height() {
      return chain;
    },
    url() {
      return "";
    },
    auto() {
      return chain;
    },
    fit() {
      return chain;
    },
    // maintain compatibility if some code calls .image() on returned value
    image() {
      return chain;
    },
  };
  return chain;
}

export function urlFor(source: any) {
  // If the source is invalid (null/empty/malformed), return a safe chainable fallback
  if (!isValidImageSource(source)) {
    return emptyImageBuilder();
  }

  // Otherwise, try to build the URL normally, but guard against runtime errors
  try {
    return builder.image(source);
  } catch (err) {
    // Log for debugging but don't throw — return fallback to avoid crashing UI
    console.warn("urlFor: failed to build image url for source:", source, err);
    return emptyImageBuilder();
  }
}

// Update return types and parameters for all functions
export async function getAllPosts(): Promise<any> {
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      "author": author->{name, slug, image},
      "categories": categories[]->{
        _id,
        title,
        slug {
          current
        }
      },
      "excerpt": array::join(string::split((pt::text(body)), "")[0..200], "") + "..."
    }
  `);
  console.log("Posts with categories:", JSON.stringify(posts, null, 2));
  return posts;
}

// Query untuk mengambil single post berdasarkan slug
export async function getPostBySlug(slug: any): Promise<any> {
  const query = `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      body,
      "author": author->{
        _id,
        name, 
        slug, 
        image, 
        bio
      },
      "categories": categories[]->{
        _id,
        title,
        "slug": slug.current
      }
    }
  `;

  try {
    const post = await client.fetch(query, { slug });
    console.log("Post data:", JSON.stringify(post, null, 2)); // Debug log
    if (!post?.categories) {
      console.log("No categories found for post:", slug);
    }
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}

// Query untuk mengambil posts berdasarkan category
export async function getPostsByCategory(categorySlug: any): Promise<any> {
  const query = `
    *[_type == "post" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      publishedAt,
      "author": author->{
        name,
        "slug": slug.current,
        image
      },
      "excerpt": array::join(string::split((pt::text(body)), "")[0..200], "") + "..."
    }
  `;

  try {
    const posts = await client.fetch(query, { categorySlug });
    console.log("Category posts:", JSON.stringify(posts, null, 2));
    return posts;
  } catch (error) {
    console.error("Error fetching category posts:", error);
    throw error;
  }
}

// Query untuk mengambil posts berdasarkan author
export async function getPostsByAuthor(authorSlug: any): Promise<any> {
  const query = `
    *[_type == "post" && author->slug.current == $authorSlug] | order(publishedAt desc) {
      _id,
      title,
      slug {
        current
      },
      mainImage,
      publishedAt,
      "author": author->{
        name,
        "slug": slug.current,
        image
      },
      "categories": categories[]->{
        title,
        "slug": slug.current
      },
      "excerpt": array::join(string::split((pt::text(body)), "")[0..200], "") + "..."
    }
  `;

  try {
    const posts = await client.fetch(query, { authorSlug });
    console.log("Posts by author:", JSON.stringify(posts, null, 2));
    return posts;
  } catch (error) {
    console.error("Error fetching author posts:", error);
    throw error;
  }
}

// Query untuk mengambil semua categories
export async function getAllCategories(): Promise<any> {
  const query = `
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      "postCount": count(*[_type == "post" && references(^._id)])
    }
  `;

  try {
    const categories = await client.fetch(query);
    console.log("Categories:", JSON.stringify(categories, null, 2)); // Debug log
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

// Query untuk mengambil single category
export async function getCategoryBySlug(slug: any): Promise<any> {
  const query = `
    *[_type == "category" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      "postCount": count(*[_type == "post" && references(^._id)])
    }
  `;

  try {
    const category = await client.fetch(query, { slug });
    console.log("Category detail:", JSON.stringify(category, null, 2));
    return category;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
}

// Query untuk mengambil semua authors
export async function getAllAuthors(): Promise<any> {
  const authors = await client.fetch(`
    *[_type == "author"] | order(name asc) {
      _id,
      name,
      slug,
      image,
      bio,
      "postCount": count(*[_type == "post" && author._ref == ^._id])
    }
  `);
  return authors;
}

// Query untuk mengambil single author
export async function getAuthorBySlug(slug: any): Promise<any> {
  const query = `
    *[_type == "author" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      image,
      bio,
      "postCount": count(*[_type == "post" && author._ref == ^._id])
    }
  `;

  try {
    const author = await client.fetch(query, { slug });
    console.log("Author detail:", JSON.stringify(author, null, 2));
    return author;
  } catch (error) {
    console.error("Error fetching author:", error);
    throw error;
  }
}
