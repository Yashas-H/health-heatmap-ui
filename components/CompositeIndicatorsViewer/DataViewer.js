import { useCompositeScore } from "context/hhm-data";
import { useTable } from "react-table";
import TableOfResults from "./Table";

export default function DataViewer({ filter }) {
  const {
    compositeScoreLoading,
    compositeScoreError,
    compositeScores,
  } = useCompositeScore(filter);
  if (compositeScoreLoading) {
    return <div>Loading...</div>;
  }
  if (compositeScoreError) {
    return <div>{compositeScoreError.message}</div>;
  }
  return (
    <div>
      <TableOfResults results={compositeScores} everything />
    </div>
  );
}
