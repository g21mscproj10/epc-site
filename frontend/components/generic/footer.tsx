import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="w-[100vw] bg-gray-900 gap-28 fixed bottom-0 h-[50px] flex justify-center items-center">
        <Link href="/about">
          <span className="text-white pr-3 cursor-pointer hover:underline">
            About Us
          </span>
        </Link>
        <Link href="/faq">
          <span className="text-white cursor-pointer hover:underline">FAQ</span>
        </Link>
      </div>
    </footer>
  );
}
