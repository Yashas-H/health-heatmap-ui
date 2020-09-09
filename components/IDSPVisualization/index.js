import { useContext } from "react";
import { Text, Spinner, Button, Box, Flex } from "@chakra-ui/core";

import { BubbleChart } from "@metastring/multidimensional-charts";

import TableOfResults from "./TableOfResults";
import { useData } from "context/hhm-data";
import { getDomainFromStates } from "./states-domain";
import { uniq } from "underscore";

export function IDSPVisualization({ filter }) {
  const { loading, error, data } = useData(filter, ["meta.original"]);
  if (loading) return <div>Loading</div>;
  if (error) return <div>error.message</div>;
  const useDistrict = filter?.terms?.["entity.State"]?.length > 0 ?? false;
  const yDomain = useDistrict
    ? uniq(data?.data?.map((d) => d["entity.Name"]))
    : getDomainFromStates(data?.data?.map((d) => d["entity.State"]));
  const yParam = useDistrict ? "entity.Name" : "entity.State";
  return (
    <Flex direction="column">
      <Button marginLeft="auto">View Legend</Button>
      <BubbleChart
        data={data?.data}
        colorParam="diagnosis.id"
        yParam={yParam}
        yDomain={yDomain}
      />
      ;
    </Flex>
  );
}

export function IDSPTable({ filter }) {
  const { loading, error, data } = useData(filter, ["meta.original"]);
  if (loading) return <div>Loading</div>;
  if (error) return <div>error.message</div>;
  return <TableOfResults results={data?.data} />;
}
