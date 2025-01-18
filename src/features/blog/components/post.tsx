import { Image } from "@/components/image";
import { type Post } from "../schemas/post";
import { type Author } from "../schemas/author";
import { Container } from "@/components/container";
import { Category } from "../schemas/category";

export function Post({
  post,
  author,
  categories,
}: {
  post: Post;
  author?: Author;
  categories: Category[];
}) {
  return (
    <>
      <Container className="py-24">
        <Image
          src={post.imageUrl}
          alt={post.altText || ""}
          width={800}
          height={400}
          className="w-full h-96 object-cover rounded-xl"
        />
        <article className="prose prose-lg max-w-none flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-medium mt-10">{post.title}</h1>
            <div className="flex gap-2 text-gray-500">
              <time className="text-gray-500">
                {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {" | "}
              <div className="flex gap-1">
                {post.categoryIds?.map((id) => {
                  const category = categories.find(
                    (category) => category.id === id,
                  );
                  return (
                    <span key={id} className="">
                      {category?.title}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div dangerouslySetInnerHTML={{ __html: post.body }} />

          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-medium">About the author</h2>
            <div className="flex gap-4 items-center">
              <Image
                src={author?.imageUrl || ""}
                alt={author?.name || ""}
                width={40}
                height={40}
                className="rounded-full"
              />
              <p>{author?.name}</p>
            </div>
          </div>
        </article>
      </Container>
    </>
  );
}
