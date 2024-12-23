"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  pageCount: number;
}

interface PaginationArrowProps {
  direction: "left" | "right";
  href: string;
  isDisabled: boolean;
}

/**
 * A pagination arrow component that displays a left or right arrow.
 *
 * @param {{ direction: "left" | "right", href: string, isDisabled: boolean }} props
 * The component props.
 * @param {string} props.direction - The direction of the arrow.
 * @param {string} props.href - The href attribute of the underlying anchor element.
 * @param {boolean} props.isDisabled - Whether the button is disabled.
 * @returns The pagination arrow component.
 */
const PaginationArrow: FC<PaginationArrowProps> = ({
  direction,
  href,
  isDisabled,
}) => {
  const router = useRouter();
  const isLeft = direction === "left";
  const disabledClassName = isDisabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <Button
      onClick={() => router.push(href)}
      className={`bg-gray-100 text-gray-500 hover:bg-gray-200 ${disabledClassName}`}
      aria-disabled={isDisabled}
      disabled={isDisabled}>
      {isLeft ? "«" : "»"}
    </Button>
  );
};

/**
 * A pagination component that displays navigation controls for multiple pages.
 *
 * @component
 * @param {object} props - The component props
 * @param {number} props.pageCount - The total number of pages
 *
 * @example
 * ```tsx
 * <PaginationComponent pageCount={5} />
 * ```
 *
 * The component uses URL search parameters to manage the current page state.
 * It displays the current page number and provides navigation arrows to move
 * between pages. The arrows are disabled when at the first or last page.
 *
 * @returns A pagination interface with previous/next arrows and current page display
 */
export const PaginationComponent = ({
  pageCount,
}: Readonly<PaginationProps>) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationArrow
            direction="left"
            href={createPageURL(currentPage - 1)}
            isDisabled={currentPage <= 1}
          />
        </PaginationItem>
        <PaginationItem>
          <span className="p-2 font-semibold text-gray-500">
            Page {currentPage}
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationArrow
            direction="right"
            href={createPageURL(currentPage + 1)}
            isDisabled={currentPage >= pageCount}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
