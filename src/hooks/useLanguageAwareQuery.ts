import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLanguage } from '@/src/contexts/LanguageContext';

/**
 * Custom hook for language-aware API queries
 * Automatically refetches data when language changes
 */
export const useLanguageAwareQuery = <T>(
  queryKey: (string | number | boolean | undefined)[],
  queryFn: () => Promise<T>,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    cacheTime?: number;
  }
) => {
  const { currentLanguage } = useLanguage();
  const queryClient = useQueryClient();

  // Include language in query key to trigger refetch when language changes
  const languageAwareQueryKey = [...queryKey, currentLanguage];

  console.log('🔍 Language-aware query:', {
    queryKey: languageAwareQueryKey,
    language: currentLanguage,
    enabled: options?.enabled
  });

  const query = useQuery({
    queryKey: languageAwareQueryKey,
    queryFn,
    enabled: options?.enabled,
    staleTime: options?.staleTime,
    cacheTime: options?.cacheTime,
  });

  return query;
};

/**
 * Hook to invalidate all queries when language changes
 * This ensures fresh data is fetched with the new language
 */
export const useLanguageInvalidation = () => {
  const queryClient = useQueryClient();
  const { currentLanguage } = useLanguage();

  const invalidateAllQueries = () => {
    queryClient.invalidateQueries();
  };

  const invalidateQueriesByKey = (queryKey: string[]) => {
    queryClient.invalidateQueries({ queryKey });
  };

  return {
    invalidateAllQueries,
    invalidateQueriesByKey,
  };
};
