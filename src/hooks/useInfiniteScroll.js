import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook for implementing infinite scrolling
 * @param {function} fetchMore - Function to fetch more data
 * @param {boolean} hasMore - Whether there is more data to load
 * @param {boolean} loading - Whether data is currently loading
 * @returns {object} - ref to attach to the sentinel element and loading state
 */
const useInfiniteScroll = (fetchMore, hasMore, loading) => {
  const [isFetching, setIsFetching] = useState(false);
  const observer = useRef(null);

  // Create observer reference
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setIsFetching(true);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, loading]
  );

  // Handle fetching
  useEffect(() => {
    if (!isFetching) return;

    const fetchData = async () => {
      await fetchMore();
      setIsFetching(false);
    };

    fetchData();
  }, [isFetching, fetchMore]);

  return { lastElementRef, isFetching };
};

export default useInfiniteScroll;