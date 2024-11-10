import { notFound } from "next/navigation";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import { getAuthorByPostSlug } from "@/features/blog/queries/get-author-by-post-slug";
import { getPostBySlug } from "@/features/blog/queries/get-post-by-slug";
import { getAllPosts } from "@/features/blog/queries/get-posts";
import { Post } from "@/features/blog/components/post";
import { getCategoriesByPostSlug } from "@/features/blog/queries/get-categories-by-post-slug";

export async function generateMetadata({
  params,
}: {
  params: {
    post: string;
    locale: string;
  };
}): Promise<Metadata> {
  const post = await getPostBySlug({
    locale: params.locale,
    slug: params.post,
  });

  if (!post) {
    return {};
  }

  const author = await getAuthorByPostSlug({
    postSlug: post.slug,
    locale: params.locale,
  });

  return {
    title: post.title + " - TVL Conseils",
    creator: author?.name,
    description: post.description,
    openGraph: {
      title: post.title + " - TVL Conseils",
      description: post.description,
      images: post.imageUrl,
      locale: params.locale,
    },
    twitter: {
      card: "summary_large_image",
      site: "@tvlconseils",
      creator: "@tvlconseils",
      images: post.imageUrl,
    },
    authors: [
      {
        name: author?.name,
        url: "/authors/" + author?.slug,
      },
    ],
  };
}

export async function generateStaticParams({}: {
  params: {
    locale: string;
  };
}) {
  const slugEn = (await getAllPosts({ locale: "fr" })).map((post) => ({
    slug: post.slug,
    locale: "en",
  }));

  const slugFr = (await getAllPosts({ locale: "en" })).map((post) => ({
    slug: post.slug,
    locale: "fr",
  }));

  return [...slugEn, ...slugFr];
}

export default async function PostPage({
  params,
}: {
  params: {
    post: string;
    locale: string;
  };
}) {
  const locale = params.locale;
  setStaticParamsLocale(locale);
  const post = await getPostBySlug({ locale, slug: params.post });
  const author = await getAuthorByPostSlug({ postSlug: params.post, locale });
  const categories = await getCategoriesByPostSlug({
    postSlug: params.post,
    locale,
  });

  if (!post) {
    return notFound();
  }

  return (
    <>
      <Post post={post} categories={categories} author={author || undefined} />
    </>
  );
}

export const dynamic = "force-dynamic";
