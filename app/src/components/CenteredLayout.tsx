import React from "react";

export default function CenteredLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-[80vh] w-full items-center justify-center">
      <h1 className="text-2xl font-bold mb-6 mt-4 text-center w-full">{title}</h1>
      <div className="flex-1 flex flex-col justify-center items-center w-full">
        {children}
      </div>
    </div>
  );
}
