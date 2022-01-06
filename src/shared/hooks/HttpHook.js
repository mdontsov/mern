import { useState, useCallback, useRef, useEffect } from 'react'

export const useHttpClient = () => {
    var [isLoading, setIsLoading] = useState(false)
    var [isError, setError] = useState()

    var activeHttpRequests = useRef([])

    var sendRequest = useCallback(
        async function (
            requestUrl,
            requestMethod = 'GET',
            requestBody = null,
            requestHeaders = {}
        ) {
            setIsLoading(true)

            var httpAbortCtrl = new AbortController()
            activeHttpRequests.current.push(httpAbortCtrl)

            try {

                var response = await fetch(
                    requestUrl,
                    {
                        method: requestMethod,
                        body: requestBody,
                        headers: requestHeaders,
                        signal: httpAbortCtrl.signal
                    }
                )

                var responseData = await response.json()

                activeHttpRequests.current = activeHttpRequests.current.filter(
                    predicate => predicate !== httpAbortCtrl
                )

                if (!response.ok) {
                    throw new Error(responseData.message)
                }

                setIsLoading(false)
                return responseData

            } catch (error) {
                setError(error.message)
                setIsLoading(false)
                throw error
            }
        }, [])

    function clearError() {
        setError(null)
    }

    useEffect(
        () => {
            return () => {
                activeHttpRequests.current.forEach(httpAbortCtrl => httpAbortCtrl.abort())
            }
        }, []
    )

    return { isLoading, isError, sendRequest, clearError }
}