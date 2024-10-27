import Image from "next/image";
import { type Post } from "../schemas/post";
import { type Author } from "../schemas/author";

export function Post({ post }: { post: Post; author?: Author }) {
  return (
    <>
      <article className="prose prose-lg max-w-none">
        <time className="text-gray-500 mb-10">
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </article>
    </>
  );
}
