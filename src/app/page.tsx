import Image from "next/image";
import { Sidenav } from "./sidenav";
import { Navbar } from "./navbar";
import { Statistics } from "./Statistics";

export default function Home() {
  return (
        <>
          <div className="min-h-screen bg-black">
            <Statistics />
            <Navbar />
            <Sidenav/>
          </div>
        </>
  );
}
