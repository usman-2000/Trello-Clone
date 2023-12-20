"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type State = {
  error?: {
    title?: string[];
  };
  message?: string | null;
};

const CreateBoard = z.object({
  title: z.string().min(3, {
    message: "Minimum length of 3 letters required",
  }),
});

export async function create(prevState: State, formData: FormData) {
  const validatedFields = CreateBoard.safeParse({
    title: formData.get("title"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields",
    };
  }

  const { title } = validatedFields.data;

  try {
    await db?.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    return { message: "Database Error" };
  }

  revalidatePath("/organization/user_2ZO3bf1i45ZsYkFreLWh8EfART2");
  redirect("/organization/user_2ZO3bf1i45ZsYkFreLWh8EfART2");
}