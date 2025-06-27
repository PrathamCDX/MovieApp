"use client";

import * as motion from "motion/react-client";
import MovieDetail from "@/components/movieDetails";
import { FetchState, MovieDetailProps } from "@/lib/interfaces";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFetchHook } from "@/lib/hooks";

export default function Page() {
  const params = useParams();
  const imdbID = params.id as string;
  const api_key = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  const response = useFetchHook<MovieDetailProps>(
    `https://www.omdbapi.com/?apikey=${api_key}&i=${imdbID}&plot=full`
  );

  const [movieDetails, setMovieDetails] = useState<MovieDetailProps | null>(
    null
  );
  useEffect(() => {
    if (response.data) {
      setMovieDetails(response.data);
    }
  }, [response.data]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
      className="pt-10"
    >
      {movieDetails && <MovieDetail {...movieDetails} />}
    </motion.div>
  );
}
