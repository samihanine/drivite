import React from "react";
import { load } from "cheerio";
import { Container } from "@/components/container";
import { Typography } from "@/components/typography";

interface MetaData {
  title: string;
  description: string;
  image: string;
}

interface ArticlePreviewsProps {
  urls: string[];
}

async function fetchMetaData(url: string): Promise<MetaData> {
  const res = await fetch(url);
  const html = await res.text();
  const $ = load(html);
  const title =
    $('meta[property="og:title"]').attr("content") || $("title").text() || "";
  const description =
    $('meta[property="og:description"]').attr("content") ||
    $('meta[name="description"]').attr("content") ||
    "";
  const image = $('meta[property="og:image"]').attr("content") || "";
  return { title, description, image };
}

export default async function Articles({ urls }: ArticlePreviewsProps) {
  const metaDataList = await Promise.all(urls.map((url) => fetchMetaData(url)));

  return (
    <Container className="relative h-full flex flex-col gap-12 items-center py-12">
      <div className="flex flex-col gap-4 items-center mb-5">
        <Typography variant="h2">Ils parlent de nous</Typography>
        <Typography variant="small">
          Découvrez les articles et les interviews qui parlent de Drivite.
        </Typography>
      </div>

      {metaDataList.map((meta, idx) => (
        <a
          key={urls[idx]}
          href={urls[idx]}
          className="flex gap-4 border border-border rounded-xl hover:border-primary transition-colors duration-300 w-full"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex flex-col gap-4 flex-1 p-6">
            <img
              src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${urls[idx]}&size=128`}
              alt="Logo"
              className="w-6 h-6"
            />
            <Typography variant="h5">{meta.title}</Typography>
            <Typography variant="small">{meta.description}</Typography>
          </div>

          {meta.image && (
            <img
              src={meta.image}
              alt={meta.title}
              className="w-96 h-auto object-contain"
            />
          )}
        </a>
      ))}
    </Container>
  );
}
