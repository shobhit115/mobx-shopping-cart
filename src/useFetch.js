import {useState, useEffect } from 'react';



export default function useFetch(url){
    const[data,setData] = useState([]);
    const[loading,setLoading]=useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        setLoading(true);
        setError(null);

        const fetchData = async ()=>{
            try{
                const res = await fetch(url);
                if(!res.ok){
                    throw new Error(`Http Error: ${res.status}`);

                }
                const json = await res.json();
                setData(json);
            }
            catch(err){
                setError(err.message);
            }
            finally{
                setLoading(false);
            }
        }

        fetchData();
    },[url]);

    return {data,loading,error};
}