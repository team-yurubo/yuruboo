import {useState, useEffect} from 'react'

const AxiosGet = (url: string) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData(url: string) {
      const response = await fetch(url, { credentials: "include" });
      const data = await response.json();
      setData(data);
    }

    const interval = setInterval(() => {
      fetchData(url);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return data ? <div>{data["time"]}</div> : <div>Loading...</div>;
}

export default AxiosGet;