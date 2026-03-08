import { useState, useEffect, useCallback, useRef } from 'react';

export const useInfiniteScroll = (fetchFunction) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const observer = useRef();

  useEffect(() => {
    let isMounted = true;
    
    const loadMore = async () => {
      if (!hasMore) return;
      
      setLoading(true);
      try {
        const data = await fetchFunction(page);
        
        if (isMounted && data && data.results) {
          // Filter out duplicates just in case TMDB returns overlapping pages
          setItems((prev) => {
            const existingIds = new Set(prev.map(p => p.id));
            const newItems = data.results.filter(item => !existingIds.has(item.id));
            return [...prev, ...newItems];
          });

          if (data.results.length === 0 || data.page >= data.total_pages) {
            setHasMore(false);
          }
        }
      } catch (error) {
        console.error("Infinite scroll fetch error:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadMore();

    return () => {
      isMounted = false;
    };
  }, [page, fetchFunction]);
  
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return { items, loading, hasMore, lastElementRef };
};
