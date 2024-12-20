/// import { updateSummaryAction, deleteSummaryAction } from "@/data/actions/summary-actions";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SubmitButton } from "@/components/layout/submit-button";
import ReactMarkdown from "react-markdown";
// import { DeleteButton } from "@/components/layout/delete-button";

/**
 * A component that renders a summary card form, which is used to update
 * a user's video summary.
 *
 * The form includes a title input, a tabs component with two tabs: one for
 * previewing the summary (using React Markdown), and another for editing the
 * summary markdown. The user can enter a new title and/or update the summary
 * markdown and then submit the form to update the summary.
 *
 * @param {object} props - The component props
 * @param {any} props.item - The summary item to be updated
 * @param {string} [props.className] - The CSS class name to be applied to the
 * component
 *
 * @returns {JSX.Element} A JSX element that renders the summary card form
 */
export const SummaryCardForm = ({
  item,
  className,
}: {
  readonly item: any;
  readonly className?: string;
}) => {
  // const deleteSummaryById = deleteSummaryAction.bind(null, item.documentId);

  return (
    <Card className={cn("mb-8 relative h-auto", className)}>
      <CardHeader>
        <CardTitle>Video Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <form>
            <Input
              id="title"
              name="title"
              placeholder="Update your title"
              required
              className="mb-4"
              defaultValue={item.title}
            />
            <div className="flex-1 flex flex-col">
              <Tabs
                defaultValue="preview"
                className="flex flex-col h-full gap-2">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="markdown">Edit Markdown</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="preview"
                  className="flex-1">
                  <ReactMarkdown
                    className="
                    markdown-preview
                    relative w-full h-[600px]
                    overflow-auto scroll-smooth
                    p-4 px-3 py-2
                    text-sm
                    bg-white dark:bg-gray-800 bg-transparent
                    border border-gray-300 dark:border-gray-700
                    rounded-md
                    shadow-sm
                    mb-4
                    placeholder:text-muted-foreground
                    focus-visible:outline-none
                    focus-visible:bg-gray-50
                    focus-visible:ring-1
                    focus-visible:ring-ring
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  ">
                    {item.summary}
                  </ReactMarkdown>
                </TabsContent>
                <TabsContent
                  value="markdown"
                  className="flex-1">
                  <Textarea
                    name="summary"
                    className="
                      markdown-preview
                      relative w-full h-[600px]
                      overflow-auto scroll-smooth
                      p-4 px-3 py-2
                      text-sm
                      bg-white dark:bg-gray-800 bg-transparent
                      border border-gray-300 dark:border-gray-700
                      rounded-md
                      shadow-sm
                      mb-4
                      placeholder:text-muted-foreground
                      focus-visible:outline-none
                      focus-visible:bg-gray-50
                      focus-visible:ring-1
                      focus-visible:ring-ring
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                    defaultValue={item.summary}
                  />
                </TabsContent>
              </Tabs>
            </div>
            <input
              type="hidden"
              name="id"
              value={item.documentId}
            />
            <SubmitButton
              text="Update Summary"
              loadingText="Updating Summary"
            />
          </form>
          <form>
            {/* <DeleteButton className="absolute right-4 top-4 bg-red-700 hover:bg-red-600" /> */}
          </form>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
