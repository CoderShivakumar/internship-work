import Image from "next/image";
import { Sidenav } from "./sidenav";
import { Navbar } from "./navbar";

export default function Home() {
  return (
        <>
          <div className="min-h-screen bg-black">
            <Navbar />
            <Sidenav/>
          </div>
        </>
  );
}
