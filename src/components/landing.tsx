"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Film, Star, Calendar, Users, Play, ArrowRight } from "lucide-react";

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-black dark:via-gray-950 dark:to-gray-900 p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-extrabold mb-4 text-gray-900 dark:text-white flex items-center justify-center gap-2">
          <Film className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          Movie Explorer
        </h1>
        <p className="text-lg text-black dark:text-gray-300 mb-8">
          Discover, search, and rate your favorite movies. Dive into a world of
          cinema and find your next watch!
        </p>
        <Button
          className="px-8 py-3 text-lg font-semibold flex items-center gap-2"
          asChild
        >
          <a href="/movies">
            Get Started <ArrowRight className="w-5 h-5" />
          </a>
        </Button>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="w-4 h-4" /> Rate Movies
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Calendar className="w-4 h-4" /> Latest Releases
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="w-4 h-4" /> Community Picks
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Play className="w-4 h-4" /> Watch Trailers
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Landing;
