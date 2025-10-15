"use client";
import { useFetchAllBlogs } from "@/src/hooks/useBlog";
import NewsCard from "../common/card/NewsCard";
import FadeUpCard from "@/src/animations/FadeButtomUp";
import Pagination from "../common/Pagination";
import { useState } from "react";
interface props{
  cards:any[];
}
export default function NewsGrid({cards}:props) {
  return (
    <>
      {cards?.map((card: any, i: number) => {
        return(
          <FadeUpCard key={i} delay={i*0.2}>
          <NewsCard key={i} card={card} />
          </FadeUpCard>
        )
        })}
    </>
  );
}
