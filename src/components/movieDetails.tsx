"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, User, Film, Star } from "lucide-react";
import { MovieDetailProps } from "@/lib/interfaces";

const MovieDetail: React.FC<MovieDetailProps> = ({
  imdbID,
  Title,
  Year,
  Genre,
  Poster,
  Director,
  Actors,
  Plot,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  // Generate a unique key for this movie based on title and year

  // Load rating from localStorage on component mount
  useEffect(() => {
    const savedRating = localStorage.getItem(imdbID);
    if (savedRating) {
      setRating(parseInt(savedRating));
    }
  }, [imdbID]);

  // Save rating to localStorage whenever it changes
  const handleRatingClick = (starRating: number) => {
    setRating(starRating);
    localStorage.setItem(imdbID, starRating.toString());
  };

  return (
    <Card className="w-full p-5 max-w-4xl mx-auto overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="md:flex">
        {/* Poster Section */}
        <div className="md:w-1/3 relative">
          <img
            src={Poster ? Poster : undefined}
            alt={`${Title} poster`}
            className="w-full rounded-lg h-64 md:h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="md:w-2/3 p-6">
          <CardHeader className="p-0 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">
                {Title}
              </CardTitle>
              <Badge variant="secondary" className="w-fit">
                <Calendar className="w-4 h-4 mr-1" />
                {Year}
              </Badge>
            </div>
            <Badge variant="outline" className="w-fit mt-2">
              <Film className="w-4 h-4 mr-1" />
              {Genre}
            </Badge>
          </CardHeader>

          <CardContent className="p-0 space-y-4">
            {/* Rating Section */}
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">
                Your Rating
              </h3>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 rounded transition-colors hover:bg-accent"
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        star <= (hoverRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground hover:text-yellow-400"
                      }`}
                    />
                  </button>
                ))}
                {rating > 0 && (
                  <span className="ml-2 text-sm text-muted-foreground self-center">
                    {rating}/5 stars
                  </span>
                )}
              </div>
            </div>

            {/* Director */}
            <div className="flex items-start gap-2">
              <User className="w-5 h-5 mt-0.5 text-muted-foreground flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Director
                </h3>
                <p className="text-foreground font-medium">{Director}</p>
              </div>
            </div>

            {/* Cast */}
            <div className="flex items-start gap-2">
              <Users className="w-5 h-5 mt-0.5 text-muted-foreground flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Cast
                </h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {Actors.split(",")
                    .map((actor) => actor.trim())
                    .map((actor, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {actor}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>

            {/* Plot Summary */}
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">
                Plot Summary
              </h3>
              <p className="text-foreground leading-relaxed text-sm md:text-base">
                {Plot}
              </p>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default MovieDetail;
