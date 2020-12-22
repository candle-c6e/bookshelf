import { useCallback, useLayoutEffect, useReducer, useRef } from "react"

function useSafeDispatch(dispatch: any) {
  const mounted = useRef(false)
  useLayoutEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  return useCallback(
    (...args) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch],
  )
}

const defaultInitialState = { status: 'idle', data: null, error: null }

function useAsync(initialState: any) {
  const initialStateRef = useRef({
    ...defaultInitialState,
    ...initialState,
  })

  const [{ status, data, error }, setState] = useReducer((s: any, a: any) => ({ ...s, ...a }), initialStateRef.current)

  const safeSetState = useSafeDispatch(setState)

  const setData = useCallback((data: any) => safeSetState({ data, status: 'resolved' }), [safeSetState])

  const setError = useCallback((error: any) => safeSetState({ error, status: 'rejected' }), [safeSetState])

  const reset = useCallback(() => safeSetState(initialStateRef.current), [safeSetState])

  const run = useCallback((promise: any) => {
    safeSetState({ status: 'pending' })
    return promise.then((data: any) => {
      setData(data)
      return data
    }, (err: any) => {
      setError(err)
      return Promise.reject(err)
    })
  }, [safeSetState, setData, setError])

  return {
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  }
}

export { useAsync }