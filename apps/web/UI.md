# UI conventions

Only rules the codebase already follows. Add a rule here when it's established, not before.

## Components: shadcn only

- Build UI from the shadcn components in `src/components/ui/`
- Need a component that isn't there yet? Add it with the shadcn CLI, from `apps/web/`:

- Colours come from theme tokens (`text-muted-foreground`, `bg-primary`, `text-destructive`, …),
  never raw palette classes like `text-zinc-500`.

## Pages: every page uses `PageShell`

import { PageShell } from "@/components/page-shell";

return <PageShell title="Dashboard">…</PageShell>;

- `PageShell` owns the page width, padding, `<h1>` and the gap under the heading.
  Pages never render their own `<main>` or `<h1>`, and don't add a top margin to their first child.
- It takes only `title` and `children`. No `className` or override props.

## Form errors

Server actions, in which the action run only in the server, and the response is given back to the browser.

- To show individual field errors, we use zod and useActionState on submit of the form.
- Using TypeScript to lock the shape of response which need to be sent back to the useActionState, to make sure the entered inputs are not vanished while the error messages displayed.
- aria-described by is used to focus on the particular field.
- By default when the action return something, the form re-renders and the defualt value is changing after birth, for which baseUi complains. The key is added for form tag, and now whenever the action returns something, and it is assigned to a key, whenever the key changes, React deletes the old form, and builds a new form, and in this case even after several submissions, the input is being freshly created.
- aria-invalid is used on input tags, to make sure it focused the particualar field, when an error exist on it.
