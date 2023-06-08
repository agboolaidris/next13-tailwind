import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <div className="bg-gray-500">
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-end gap-4 text-white">
        <Link href="/">Home</Link>
        <Link href="/about">about</Link>
      </div>
    </div>
  );
};
