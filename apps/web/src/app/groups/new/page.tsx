import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { groupFormSchema } from "@/lib/schemas/group";
import * as z from "zod";
import { connectDb, GroupModel } from "@edforge/db";
import { clerkClient } from "@clerk/nextjs/server";
import type { Organization } from "@clerk/nextjs/server";

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
      return;
    }

    const { name, slug, description } = result.data;

    await connectDb();
    if (await GroupModel.exists({ slug })) {
      console.log("Slug already exists");
      return;
    }

    console.log("Slug available");
    const client = await clerkClient();
    let organization: Organization;

    try {
      organization = await client.organizations.createOrganization({
        name,
        createdBy: userId,
      });
    } catch (error) {
      console.log("Organization creation failure in clerk", error);
      return;
    }

    try {
      const createdGroupInDB = await GroupModel.create({
        clerkOrgId: organization.id,
        ownerClerkId: userId,
        name,
        slug,
        description,
      });
      console.log("Document created in db", createdGroupInDB.id);
    } catch (saveError) {
      console.log(saveError);
      try {
        const rolledBackOrg = await client.organizations.deleteOrganization(organization.id);
        console.log("Rolledback Id after deletion of org in clerk:", rolledBackOrg.id);
      } catch (deletionError) {
        console.log(
          "The deletion of org in clerk has failed, and org will be an orphan:",
          deletionError,
        );
      }
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
