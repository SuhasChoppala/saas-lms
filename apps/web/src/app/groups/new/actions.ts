"use server";

import { groupFormSchema } from "@/lib/schemas/group";
import * as z from "zod";
import { connectDb, GroupModel } from "@edforge/db";
import { auth, clerkClient, type Organization } from "@clerk/nextjs/server";

export type CreateGroupState = {
  fieldErrors?: { name?: string[]; slug?: string[]; description?: string[] };
  formError?: string;
  submittedValues?: { name?: string; slug?: string; description?: string };
};

const genericErrorMessage = "Something went wrong. Please try again.";

export const createGroup = async (
  _prevState: CreateGroupState,
  formData: FormData,
): Promise<CreateGroupState> => {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const plainObject = Object.fromEntries(formData);
  const submittedValues = {
    name: typeof plainObject.name === "string" ? plainObject.name : "",
    slug: typeof plainObject.slug === "string" ? plainObject.slug : "",
    description: typeof plainObject.description === "string" ? plainObject.description : "",
  };
  const result = groupFormSchema.safeParse(plainObject);

  if (!result.success) {
    return { fieldErrors: z.flattenError(result.error).fieldErrors, submittedValues };
  }

  const { name, slug, description } = result.data;

  await connectDb();
  if (await GroupModel.exists({ slug })) {
    return {
      fieldErrors: {
        slug: ["The slug has already been taken"],
      },
      submittedValues,
    };
  }

  const client = await clerkClient();
  let organization: Organization;

  try {
    organization = await client.organizations.createOrganization({
      name,
      createdBy: userId,
    });
  } catch (clerkError) {
    console.log(clerkError);
    return { formError: genericErrorMessage, submittedValues };
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
    return {};
  } catch (saveError) {
    console.log(saveError);
    try {
      const deletedOrg = await client.organizations.deleteOrganization(organization.id);
      console.log("Org deleted in clerk, and the id of deleted org is:", deletedOrg.id);
      return { formError: genericErrorMessage, submittedValues };
    } catch (clerkDeletionError) {
      console.log(
        "The deletion of org in clerk failed, now it stays as an orphan org, and the id is:",
        organization.id,
        "The error:",
        clerkDeletionError,
      );
      return { formError: genericErrorMessage, submittedValues };
    }
  }
};
