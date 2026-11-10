"use client";

import { useActionState } from "react";
import { createGroup, type CreateGroupState } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const CreateGroupForm = () => {
  const initialState: CreateGroupState = {};

  const [state, formAction, isPending] = useActionState(createGroup, initialState);

  return (
    <Card>
      <CardContent>
        <form action={formAction} className="flex flex-col">
          <Label htmlFor="name">Name</Label>
          <Input
            required
            type="text"
            name="name"
            id="name"
            defaultValue={state.submittedValues?.name}
          />
          {state.fieldErrors?.name?.[0] && (
            <p className="text-destructive">{state.fieldErrors?.name[0]}</p>
          )}
          <Label htmlFor="slug">Slug</Label>
          <Input
            required
            type="text"
            name="slug"
            id="slug"
            defaultValue={state.submittedValues?.slug}
          />
          {state.fieldErrors?.slug?.[0] && (
            <p className="text-destructive">{state.fieldErrors?.slug[0]}</p>
          )}
          <Label htmlFor="description">Description</Label>
          <Textarea
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
      </CardContent>
    </Card>
  );
};
