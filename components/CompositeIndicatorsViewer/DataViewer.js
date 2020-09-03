import { useCompositeScore } from "context/hhm-data";

export default function DataViewer({filter}) {
  const {
    compositeScoreLoading,
    compositeScoreError,
    compositeScores,
  } = useCompositeScore(filter);
  if (compositeScoreLoading) {
    return <div>Loading...</div>;
  }
  if (compositeScoreError) {
    return <div>{compositeScoreError.message}</div>
  }
  return <div>{JSON.stringify(compositeScores)}</div>
}
