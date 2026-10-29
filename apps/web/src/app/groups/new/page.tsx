import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { groupFormSchema } from "@/lib/schemas/group";
import * as z from "zod";

export default async function GroupNewPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const groupCreation = async (formData: FormData) => {
    "use server";
    const { userId, redirectToSignIn } = await auth();
    if (!userId) return redirectToSignIn();

    const plainObject = Object.fromEntries(formData);
    const result = groupFormSchema.safeParse(plainObject);
    if (!result.success) {
      console.log(z.prettifyError(result.error));
    } else {
      console.log(result.data);
    }
  };

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-semibold">Create a new Group</h1>
      <div className="mt-6">
        <form action={groupCreation} className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input required type="text" name="name" id="name" />
          <label htmlFor="slug">Slug</label>
          <input required type="text" name="slug" id="slug" />
          <label htmlFor="description">Description</label>
          <input type="text" name="description" id="description" />

          <div>
            <Button type="submit">Create Group</Button>
          </div>
        </form>
      </div>
    </main>
  );
}
