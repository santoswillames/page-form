import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return <div className="flex flex-grow w-full mx-auto">{children}</div>;
}

export default layout;
