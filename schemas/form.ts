import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(4, { message: "Nome muito curto" }),
  description: z.string().optional(),
});

export type formSchemaType = z.infer<typeof formSchema>;
