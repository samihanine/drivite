import { Image } from "@/components/image";
import { type Post } from "../schemas/post";
import { type Author } from "../schemas/author";
import { Container } from "@/components/container";

export function Post({ post, author }: { post: Post; author?: Author }) {
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
            <h1 className="text-4xl font-bold mt-10">{post.title}</h1>
            <time className="text-gray-500">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <div dangerouslySetInnerHTML={{ __html: post.body }} />

          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">About the author</h2>
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
