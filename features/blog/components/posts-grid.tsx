import Link from "next/link";
import Image from "next/image";
import { Post } from "../schemas/post";
import { Author } from "../schemas/author";

export async function PostsGrid({
  posts,
  authors,
}: {
  posts: Post[];
  authors: Author[];
}) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-16">
      {posts
        .sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime(),
        )
        .map((post) => {
          const author = authors.find((author) => author.id === post.authorId);

          return (
            <Link
              href={"/blog/" + post.slug}
              className="flex flex-col gap-3"
              key={post.slug}
            >
              {post.imageUrl && (
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={1200}
                  height={600}
                  className="w-full h-64 object-cover rounded-xl"
                />
              )}
              <h3 className="text-2xl font-medium mt-1">{post.title}</h3>
              <div className="flex items-center">
                <div>
                  {author?.imageUrl && (
                    <Image
                      src={author.imageUrl}
                      alt={author.name || "author"}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  )}
                </div>
                <p className="text-gray-500 ml-2">
                  {author?.name || "Unknown"}{" "}
                </p>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
