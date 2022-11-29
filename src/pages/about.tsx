import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React from "react";

function About() {
  const { data, isLoading, error, isError, isFetching, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get("https://jsonplaceholder.typicode.com/posts");
    },
    //cacheTime: 2000,
    enabled: false,
    select(data) {
      return data.data.map((post: any) => post.id);
    },
  });
  console.log(isLoading, isFetching);
  return (
    <>
      <div className="bg-slate-500 p-8 flex">
        <Link className="bg-yellow-700 p-4   rounded text-white" href="/">
          Home
        </Link>
        <Link
          href="/about"
          className="bg-yellow-700 p-4 ml-2  rounded text-white"
        >
          About
        </Link>
        <button
          onClick={() => refetch()}
          className="bg-yellow-700  p-4 ml-2  rounded text-white"
        >
          refresh
        </button>
      </div>

      {!isLoading && <p>{JSON.stringify(data)}</p>}
    </>
  );
}

export default About;
