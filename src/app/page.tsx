import Landing from "@/components/landing";
import { ToggleMode } from "@/components/toogleMode";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="right-0 relative">
        <ToggleMode />
      </div>
      <Landing />
    </div>
  );
}
