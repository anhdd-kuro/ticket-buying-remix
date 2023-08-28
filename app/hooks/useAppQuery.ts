import { useMemo } from 'react'
import { useQuery } from 'react-query'
import type { UseQueryOptions, UseQueryResult } from 'react-query'

type AppQueryOptions<TData> = {
  url: string
  fetchInit?: RequestInit
  reactQueryOptions?: UseQueryOptions<TData>
}

type AppQueryResult<TData> = UseQueryResult<TData, unknown>

/**
 * A hook for querying your custom app data.
 * @desc A thin wrapper around useAuthenticatedFetch and react-query's useQuery.
 *
 * @param {Object} options - The options for your query. Accepts 3 keys:
 *
 * 1. url: The URL to query. E.g: /api/widgets/1`
 * 2. fetchInit: The init options for fetch.  See: https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters
 * 3. reactQueryOptions: The options for `useQuery`. See: https://react-query.tanstack.com/reference/useQuery
 *
 * @returns Return value of useQuery.  See: https://react-query.tanstack.com/reference/useQuery.
 */
export const useAppQuery = <TData>({
  url,
  fetchInit = {},
  reactQueryOptions,
}: AppQueryOptions<TData>): AppQueryResult<TData> => {
  const _fetch = useMemo(() => {
    return async () => {
      const response = await fetch(url, fetchInit)
      return response.json() as Promise<TData>
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, JSON.stringify(fetchInit)])

  return useQuery<TData>(url, _fetch, {
    ...reactQueryOptions,
    refetchOnWindowFocus: false,
  })
}
