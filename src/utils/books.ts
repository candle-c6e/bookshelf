import { useMutation, useQuery, useQueryClient } from "react-query";
import { getToken } from "../auth-provider";
import { client } from "./api-client";


const bookQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
}

function useBookSearch(query = "react") {
  const queryClient = useQueryClient()
  const token = getToken()

  const { isLoading, data } = useQuery({
    queryKey: ['bookSearch', { query }],
    queryFn: async () => client(`${process.env.REACT_APP_API}/search?search=${query || 'react'}&maxResults=40`, { token }),
    onSuccess(books) {
      if (books) {
        for (let book of books.data) {
          queryClient.setQueryData(['book', { bookId: String(book.id) }], book)
        }
      }
    },
    ...bookQueryConfig
  })

  return {
    isLoading,
    data: data ?? []
  }
}

function useBookmark() {
  const token = getToken()

  const { isLoading, data } = useQuery({
    queryKey: ['bookmark'],
    queryFn: async () => client(`${process.env.REACT_APP_API}/bookmark`, { token }),
    ...bookQueryConfig
  })

  return {
    isLoading,
    data: data ?? []
  }
}

function useBook(bookId: string) {
  const { isLoading, data } = useQuery({
    queryKey: ["book", { bookId }],
    queryFn: async () => client(`${process.env.REACT_APP_API}/book/${bookId}`, {}),
    ...bookQueryConfig
  })

  return {
    data: data?.data ? data.data : data,
    isLoading,
  }
}

function useUpdateBookmark() {
  const queryClient = useQueryClient()
  const token = getToken()
  const { mutate } = useMutation((bookId: string) => client(`${process.env.REACT_APP_API}/bookmark`, {
    token,
    data: {
      bookId
    },
    options: {
      method: 'PUT'
    }
  }), {
    onMutate: (bookId) => {
      const previousValue = queryClient.getQueryData(['book', { bookId }])

      queryClient.setQueryData(['book', { bookId }], (old: any) => {
        let oldData = old?.data ? old.data : old

        return {
          ...oldData,
          data: {
            ...oldData,
            isBookmark: !oldData.isBookmark
          },
        }
      })
      return previousValue
    },
    onSuccess: () => {
      queryClient.invalidateQueries('bookmark')
    }
  })
  return { mutate }
}

export { useBookSearch, useBook, useUpdateBookmark, useBookmark }