import { useCallback, useMemo, useState } from "react";

/**
 * Hook implementing pagination logic.
 * @param data Any list.
 * @param volume Amount of items per page.
 * @param initialPage Page set on first render.
 */
export const usePagination = <T,>(
  data: T[],
  volume: number = 10
) => {
  /** All pages in total. */
  const totalPages = useMemo(
    () => Math.floor(data.length / volume),
    [volume, data.length]
  );

  const [page, setPage] = useState(0);

  /** Data representing one single page. */
  const slicedData = useMemo(
    () => data.slice(page * volume, page * volume + volume),
    [data, volume, page]
  );

  // Next page handler.
  const onNextPage = useCallback(() => {
    setPage((prevPage: number) => {
      if (prevPage < totalPages) {
        return prevPage + 1;
      }
      return prevPage;
    });
  }, [totalPages]);

  // Previous page handler.
  const onPrevPage = useCallback(() => {
    setPage((prevPage: number) => {
      if (prevPage > 0) {
        return prevPage - 1;
      }
      return prevPage;
    });
  }, []);

  return {
    data: slicedData,
    page,
    totalPages,
    setPage,
    onNextPage,
    onPrevPage,
  };
};
