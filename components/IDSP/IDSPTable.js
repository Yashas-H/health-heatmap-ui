import { useData } from "context/hhm-data";
import { Skeleton, Box } from "@chakra-ui/core";
import TableOfResults from "./TableOfResults";

export default function IDSPTable({ filter }) {
  const { isLoading, error, data } = useData(filter, ["meta.original"]);
  if (error) return <div>{error.message}</div>;
  return (
    <Box>
      <Skeleton isLoaded={!isLoading}>
        <TableOfResults results={data?.data} />
      </Skeleton>
    </Box>
  );
}
