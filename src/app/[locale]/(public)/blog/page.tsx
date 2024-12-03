import { Container } from "@/components/container";
import { PostsGrid } from "@/features/blog/components/posts-grid";
import { getAllAuthors } from "@/features/blog/queries/get-authors";
import { getCategories } from "@/features/blog/queries/get-categories";
import { getAllPosts } from "@/features/blog/queries/get-posts";
import { Cta } from "@/features/landing/components/cta";
import { Hero } from "@/features/landing/components/hero";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const data = await params;
  const posts = await getAllPosts({ locale: data.locale });
  const authors = await getAllAuthors({ locale: data.locale });
  const categories = await getCategories({ locale: data.locale });

  return (
    <>
      <Hero
        title="Blog"
        description="Sur cette page, vous trouverez des articles sur les dernières tendances du marché de l'automobile, des conseils pour l'achat et la vente de véhicules, ainsi que des informations sur les services de Drivite."
        backgroundImagePath="/images/landing/question.jpeg"
      />
      <Container className="relative py-28">
        <PostsGrid posts={posts} authors={authors} categories={categories} />
      </Container>
      <Cta />
    </>
  );
}
