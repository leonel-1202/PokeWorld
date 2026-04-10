import { useState, useEffect, useCallback } from 'react'

function useFetch(url) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchData = useCallback(() => {
        setLoading(true)
        setError(null)

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error('Error al obtener los datos')
            return res.json()
        })
        .then(json => setData(json))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false))
    }, [url])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return { data, loading, error, refetch: fetchData }
}

export default useFetch