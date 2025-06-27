"use client";

import * as motion from "motion/react-client";
import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/searchBar";
import { ToggleMode } from "@/components/toogleMode";
import { FetchState, MovieCardProps } from "@/lib/interfaces";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import { useDebounce, useFetch } from "@/lib/hooks";
import { sampleMovieData } from "@/lib/data";

function handleClick(imdbID: string) {}

export default function moviesPage() {
  const [searchValue, setSearchValue] = useState("");
  const [movieList, setMovieList] = useState<MovieCardProps[] | null>();
  const [recommendedMovieList, setRecommendedMovieList] = useState<
    MovieCardProps[] | null
  >(sampleMovieData);
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const api_key = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  const response = useFetch<MovieCardProps>(
    `https://www.omdbapi.com/?apikey=${api_key}&t=${debouncedSearchValue}&plot=full`,
    debouncedSearchValue,
    setMovieList
  );

  useEffect(() => {
    if (response.data) {
      console.log("movielist updated : ", response);
      setMovieList([response.data]);
    } else {
      setMovieList([]);
    }
  }, [response.data]);

  useEffect(() => {
    console.log("movieList :   ");
    if (movieList) {
      console.log(movieList[0]?.imdbID);
    }
  }, [movieList]);

  return (
    <div className=" items-center justify-center min-h-screen px-4">
      {/* {header } */}
      <div className="bg-[#ffffff] dark:bg-[#0a0a0a] border border-r-2 z-50 top-0   flex gap-x-2 justify-center items-center  w-full py-5 mb-2 sticky">
        <h1 className="text-4xl font-bold ">Movies Page</h1>
        <div className="w-[60vw]">
          <SearchBar setSearchValue={setSearchValue} />
        </div>
        <div className="right-0 relative">
          <ToggleMode />
        </div>
      </div>
      <div className=" mt-5 flex flex-wrap items-center justify-center gap-6">
        {(!movieList || movieList.length === 0) &&
          recommendedMovieList &&
          recommendedMovieList.map((movie, index) => (
            <Link href={`/movies/${movie.imdbID}`} key={index}>
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <MovieCard
                  imdbID={movie.imdbID}
                  Poster={movie.Poster}
                  Title={movie.Title}
                  Year={movie.Year}
                  Genre={movie.Genre}
                />
              </motion.div>
            </Link>
          ))}
        {movieList &&
          movieList.length > 0 &&
          movieList.map((movie, index) => {
            return (
              <Link href={`/movies/${movie.imdbID}`}>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <MovieCard
                    key={index}
                    imdbID={movie.imdbID}
                    Poster={movie.Poster}
                    Title={movie.Title}
                    Year={movie.Year}
                    Genre={movie.Genre}
                  />
                </motion.div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
