import React from "react";
import { Button } from "./ui/button";
import { Save } from "lucide-react";

function SaveFormBtn() {
  return (
    <Button variant={"outline"} className="gap-2 cursor-pointer">
      <Save className="size-4" />
      Salvar
    </Button>
  );
}

export default SaveFormBtn;
