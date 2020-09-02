import { useFilteredData } from "context/hhm-data";

export default function DataViewer() {
  const {
    filteredDataLoading,
    filteredDataError,
    filteredData,
  } = useFilteredData();
  if (filteredDataLoading) {
    return <div>Loading...</div>;
  }
  if (filteredDataError) {
    return <div>{filteredDataError.message}</div>
  }
  return <div>{JSON.stringify(filteredData)}</div>
}
