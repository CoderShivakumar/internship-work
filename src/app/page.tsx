import Image from "next/image";
import { Sidenav } from "./sidenav";
import { Navbar } from "./navbar";

export default function Home() {
  return (
        <>
          <div className="bg-black  min-h-screen">
            <Navbar />
            <Sidenav/>
          </div>
        </>
  );
}
