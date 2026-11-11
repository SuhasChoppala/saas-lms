"use client";

import { useActionState } from "react";
import { createGroup, type CreateGroupState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: CreateGroupState = {};

export const CreateGroupForm = () => {
  const [state, formAction, isPending] = useActionState(createGroup, initialState);
  const errors = state.fieldErrors;

  return (
    <form
      action={formAction}
      className="flex flex-col gap-6"
      key={JSON.stringify(state.submittedValues)}
    >
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={state.submittedValues?.name}
          aria-invalid={!!errors?.name}
          aria-describedby={errors?.name ? "name-error" : undefined}
        />
        {errors?.name?.[0] && (
          <p id="name-error" className="text-sm text-destructive">
            {errors.name[0]}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          name="slug"
          required
          defaultValue={state.submittedValues?.slug}
          aria-invalid={!!errors?.slug}
          aria-describedby={errors?.slug ? "slug-error" : undefined}
        />
        {errors?.slug?.[0] && (
          <p id="slug-error" className="text-sm text-destructive">
            {errors.slug[0]}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={state.submittedValues?.description}
          aria-invalid={!!errors?.description}
          aria-describedby={errors?.description ? "description-error" : undefined}
        />
        {errors?.description?.[0] && (
          <p id="description-error" className="text-sm text-destructive">
            {errors.description[0]}
          </p>
        )}
      </div>

      {state.formError && <p className="text-sm text-destructive">{state.formError}</p>}

      <div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating…" : "Create Group"}
        </Button>
      </div>
    </form>
  );
};
