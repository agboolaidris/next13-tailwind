import { useQuery, dehydrate, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const { data, isLoading, error, isError, isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.data);
    },
    //cacheTime: 2000,
    // staleTime: 300,
    //refetchOnMount: false,
    //cacheTime: 5000,
    //refetchInterval: 5000,
    // refetchIntervalInBackground: true,
    // enabled: false,
    //onError: () => console.log("err"),

    //onSuccess: () => null,
  });

  //if (isError) return <h1>{error?.message}</h1>;
  return (
    <div className="bg-gray-300 min-h-screen w-full">
      <div className="bg-slate-500 p-8 w-full">
        <Link className="bg-yellow-700 p-4 rounded text-white" href="/">
          Home
        </Link>
        <Link
          href="/about"
          className="bg-yellow-700 p-4 ml-2  rounded text-white"
        >
          About
        </Link>
      </div>
      <div className="container mx-auto bg-slate-500">
        {isLoading && <p>Loading........</p>}
        {!isLoading && (
          <div className="flex  justify-center flex-wrap">
            {data.map((d: any) => (
              <p key={d.id} className="bg-slate-400 p-4 rounded m-4 w-[200px]">
                {d.title}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["posts"], () => {
    return fetch("https://jsonplaceholder.typicode.com/posts").then((res) => {
      //console.log(res.json(), "ggggg");
      return res.json();
    });
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
