import React from "react";
import { GetFormById } from "@/app/actions/form";
import FormBuilder from "@/components/form-builder";

async function BuilderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const form = await GetFormById(Number(id));

  if (!form) {
    throw new Error("formulário não encontrado");
  }

  return <FormBuilder form={form} />;
}

export default BuilderPage;
