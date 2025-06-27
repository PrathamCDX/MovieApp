import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MovieCardProps } from "@/lib/interfaces";

export default function MovieCard({
  imdbID,
  Poster,
  Title,
  Year,
  Genre,
}: MovieCardProps) {
  return (
    <Card className="w-full max-w-sm flex   gap-0 px-3 h-[300px] border-black dark:border-white">
      <CardDescription className=" w-[179px] flex-col h-full break-words   ">
        <CardTitle className="text-2xl overflow-clip w-full py-2">
          {Title}
        </CardTitle>
        <CardDescription className="text-xl ">{Year}</CardDescription>
        <CardDescription>{Genre}</CardDescription>
      </CardDescription>
      <CardDescription className="w-[179px] h-full flex items-center justify-center rounded-2xl overflow-hidden">
        <div className="rounded-2xl overflow-hidden">
          <img
            src={Poster}
            alt={Title + " poster"}
            width={160}
            style={{ objectFit: "cover" }}
          />
        </div>
      </CardDescription>
    </Card>
  );
}
