"use client";

import supabase from "@/config/supabaseClient";
import Link from "next/link";
import {useEffect, useState} from "react";

export default function ClientPosts() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const {data} = await supabase.from("hero_bg_Image").select("*");
        setPosts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <p>
            <Link href={`/static/${post.id}`}>{post.title}</Link>
          </p>
        </div>
      ))}
    </div>
  );
}
