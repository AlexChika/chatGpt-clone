import useSWR from "swr";

const fetcher = () => fetch("/api/getEngines").then((res) => res.json());

export default fetcher;
