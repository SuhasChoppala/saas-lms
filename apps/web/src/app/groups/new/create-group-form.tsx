"use client";

import { useActionState } from "react";
import { createGroup, type CreateGroupState } from "./actions";
import { Button } from "@/components/ui/button";

export const CreateGroupForm = () => {
  const initialState: CreateGroupState = {};

  const [state, formAction, isPending] = useActionState(createGroup, initialState);

  return (
    <>
      <div className="mt-6">
        <form action={formAction} className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            name="name"
            id="name"
            defaultValue={state.submittedValues?.name}
          />
          {state.fieldErrors?.name?.[0] && (
            <p className="text-destructive">{state.fieldErrors?.name[0]}</p>
          )}
          <label htmlFor="slug">Slug</label>
          <input
            required
            type="text"
            name="slug"
            id="slug"
            defaultValue={state.submittedValues?.slug}
          />
          {state.fieldErrors?.slug?.[0] && (
            <p className="text-destructive">{state.fieldErrors?.slug[0]}</p>
          )}
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            defaultValue={state.submittedValues?.description}
          />
          {state.fieldErrors?.description?.[0] && (
            <p className="text-destructive">{state.fieldErrors?.description[0]}</p>
          )}

          {state.formError && <p className="text-destructive">{state.formError}</p>}
          <div>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating.." : "Create Group"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
