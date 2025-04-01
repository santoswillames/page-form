import React from "react";
import { Button } from "./ui/button";
import { Share } from "lucide-react";

function PublishFormBtn() {
  return (
    <Button className="gap-2 cursor-pointer text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
      <Share className="size-4" />
      Publicar
    </Button>
  );
}

export default PublishFormBtn;
