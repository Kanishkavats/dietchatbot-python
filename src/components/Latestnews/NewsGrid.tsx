"use client";
import { useFetchAllBlogs } from "@/src/hooks/useBlog";
import NewsCard from "../common/card/NewsCard";
import FadeUpCard from "@/src/animations/FadeButtomUp";

export default function NewsGrid() {
  const { data, isLoading, isError } = useFetchAllBlogs(1, 10);

  if (isLoading) {
    return <p className="text-center">Loading blogs...</p>;
  }

  if (isError) {
    return <p className="text-center text-red">Failed to fetch blogs.</p>;
  }

  return (
    <>
      {data?.blogs.map((card: any, i: number) => {
        return(
          <FadeUpCard key={i} delay={i*0.2}>
          <NewsCard key={i} card={card} />
          </FadeUpCard>
        )
        })}
    </>
  );
}
