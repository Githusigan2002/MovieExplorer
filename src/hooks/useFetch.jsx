import React, { useEffect, useState } from 'react'

export const useFetch = (apiPath, queryTerm = "") => {
    {
        const [data, setData] = useState([]);
        const key = "8f39312a669841f8a583c34c693dd15c";

        const url = `https://api.themoviedb.org/3/${apiPath}?api_key=${key}&query=${queryTerm}`;

        useEffect(() => {
            async function fetchMovie() {
                fetch(url)
                    .then((res) => res.json())
                    .then((jsonData) => setData(jsonData.results));
            }
            fetchMovie();
        }, [url]);
        return { data };
    }
}
