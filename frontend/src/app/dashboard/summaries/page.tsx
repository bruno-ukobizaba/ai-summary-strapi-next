import { getSummaries } from "@/data/loaders";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { PaginationComponent } from "@/components/layout/pagination-component";
import { Search } from "@/components/layout/search";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Props for the LinkCard component.
 *
 * @interface LinkCardProps
 * @property {string} documentId - The unique identifier for the document.
 * @property {string} title - The title of the document.
 * @property {string} summary - A brief summary or description of the document.
 */
interface LinkCardProps {
  documentId: string;
  title: string;
  summary: string;
}

/**
 * A component that renders a clickable card with a document summary.
 *
 * @component
 * @param {object} props - The component props
 * @param {string} props.documentId - The unique identifier for the document
 * @param {string} props.title - The title of the document
 * @param {string} props.summary - The markdown content summary of the document
 *
 * @returns {JSX.Element} A Link wrapped Card component that displays the document title
 * and a truncated markdown summary with a "read more" suffix. Clicking the card
 * navigates to the full document view.
 */
const LinkCard = ({ documentId, title, summary }: Readonly<LinkCardProps>) => {
  return (
    <Link href={`/dashboard/summaries/${documentId}`}>
      <Card className="relative">
        <CardHeader>
          <CardTitle className="leading-8 text-pink-500">
            {title || "Video Summary"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ReactMarkdown
            className="card-markdown prose prose-sm max-w-none
              prose-headings:text-gray-900 prose-headings:font-semibold
              prose-p:text-gray-600 prose-p:leading-relaxed
              prose-a:text-pink-500 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ul:list-disc prose-ul:pl-4
              prose-ol:list-decimal prose-ol:pl-4">
            {summary.slice(0, 164) + " [read more]"}
          </ReactMarkdown>
        </CardContent>
      </Card>
    </Link>
  );
};

/**
 * Interface representing the properties for search parameters.
 *
 * @property {Object} [searchParams] - Optional search parameters object.
 * @property {string} [searchParams.page] - Optional page number as a string.
 * @property {string} [searchParams.query] - Optional search query string.
 */
interface SearchParamsProps {
  searchParams?: {
    page?: string;
    query?: string;
  };
}

/**
 * Renders the summaries page with search functionality and pagination
 * @param props - The component props
 * @param props.searchParams - The search parameters from the URL
 * @param props.searchParams.query - The search query string
 * @param props.searchParams.page - The current page number
 * @returns A layout with search bar, grid of summary cards, and pagination
 * @throws Will return null if no data is available
 */
const SummariesRoute = async ({ searchParams }: SearchParamsProps) => {
  const search = await searchParams;
  const query = search?.query ?? "";
  const currentPage = Number(search?.page) || 1;

  const { data, meta } = await getSummaries(query, currentPage);
  const pageCount = meta?.pagination?.pageCount;

  if (!data) return null;
  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <Search />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item: LinkCardProps) => (
          <LinkCard
            key={item.documentId}
            {...item}
          />
        ))}
      </div>
      <PaginationComponent pageCount={pageCount} />
    </div>
  );
};

export default SummariesRoute;
