import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";

export default function SearchBar({
  setSearchValue,
}: {
  setSearchValue: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div>
      <Input
        className="w-full"
        placeholder="Search..."
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
    </div>
  );
}
