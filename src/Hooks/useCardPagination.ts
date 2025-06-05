import { useCallback, useEffect, useState } from "react";
import { TCard } from "../types/TCard";

type UseCardPaginationProps = {
  allCards: TCard[]; // All available cards
  itemsPerPage?: number; // Items per page
  initialPage?: number; // Starting page number
  filterFn?: (card: TCard) => boolean; // Custom filter function
  searchKeyword?: string; // For search functionality
  resetOn?: any[]; // Dependencies that reset pagination
  mobileBreakpoint?: number; // Added mobile breakpoint option
};

/**
 * Universal hook for card pagination with optional filtering and infinite scroll
 */
const useCardPagination = ({
  allCards,
  itemsPerPage = 6,
  initialPage = 1,
  filterFn,
  searchKeyword = "",
  resetOn = [],
  mobileBreakpoint = 640,
}: UseCardPaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [visibleCards, setVisibleCards] = useState(itemsPerPage);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" &&
      window.matchMedia(`(max-width: ${mobileBreakpoint}px)`).matches,
  );
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(
        window.matchMedia(`(max-width: ${mobileBreakpoint}px)`).matches,
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileBreakpoint]);
  // Filter cards based on provided filter function or search keyword
  const filteredCards = filterFn
    ? allCards.filter(filterFn)
    : searchKeyword
      ? allCards.filter(
          (card) =>
            card.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            card.subtitle.toLowerCase().includes(searchKeyword.toLowerCase()),
        )
      : allCards;

  // Reset pagination when filter criteria change
  useEffect(() => {
    setCurrentPage(1);
    setVisibleCards(itemsPerPage);
  }, [searchKeyword, itemsPerPage, ...resetOn]);

  // Calculate pagination values
  const totalItems = filteredCards.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCards.slice(indexOfFirstItem, indexOfLastItem);

  // Page change handler for regular pagination
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Load more handler for infinite scroll
  const loadMore = useCallback(() => {
    setVisibleCards((prev) =>
      prev + itemsPerPage > totalItems ? totalItems : prev + itemsPerPage,
    );
  }, [itemsPerPage, totalItems]);

  const itemsToDisplay = isMobile
    ? filteredCards.slice(0, visibleCards)
    : currentItems;

  return {
    // Pagination state
    currentPage,
    totalPages,
    totalItems,

    // Methods
    onPageChange, // For regular pagination
    loadMore, // For infinite scroll

    // For custom needs
    isMobile,
    itemsToDisplay,
  };
};

export default useCardPagination;
