import React from "react";
import { Button } from "./ui/button";
import { View } from "lucide-react";

function PreviewDialogBtn() {
  return (
    <Button variant={"outline"} className="gap-2 cursor-pointer">
      <View className="size-4" />
      Visualizar
    </Button>
  );
}

export default PreviewDialogBtn;
