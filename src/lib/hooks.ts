import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FetchState, MovieCardProps } from "./interfaces";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

function useFetch<T>(
  url: string,
  debouncedSearchValue: string,
  setMovieList: Dispatch<SetStateAction<MovieCardProps[] | null | undefined>>
): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log("api called");
      try {
        const response = await fetch(url);
        const responseJSON = await response.json(); // Only call this once!
        console.log("in hook ", responseJSON);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (responseJSON.Title) {
          console.log("yesss", responseJSON.imdbID);
          setState({ data: responseJSON as T, loading: false, error: null });
        } else {
          setState({ data: null, loading: false, error: null });
        }
      } catch (error) {
        setState({ data: null, loading: false, error: error as Error });
      }
    };

    fetchData();
  }, [url, debouncedSearchValue]);

  return state;
}

function useFetchHook<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log("api called for inside page ");
      try {
        const response = await fetch(url);
        const responseJSON = await response.json(); // Only call this once!
        console.log("in hook ", responseJSON);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (responseJSON.Title) {
          console.log("yesss", responseJSON.imdbID);
          setState({ data: responseJSON as T, loading: false, error: null });
        } else {
          setState({ data: null, loading: false, error: null });
        }
      } catch (error) {
        setState({ data: null, loading: false, error: error as Error });
      }
    };

    fetchData();
  }, [url]);

  return state;
}

export { useDebounce, useFetch, useFetchHook };
