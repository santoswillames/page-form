import { LoaderCircle } from "lucide-react";
import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <LoaderCircle className="size-12 animate-spin" />
    </div>
  );
}

export default Loading;
