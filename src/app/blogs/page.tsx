import { Main } from "@/types/blog";
import React from "react";

export default async function page() {
  const blogs = await getBlogs();
  return <div>{JSON.stringify(blogs)}</div>;
}

const getBlogs = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/blog`);
  const blogs: Main[] = await res.json();
  return blogs;
};
