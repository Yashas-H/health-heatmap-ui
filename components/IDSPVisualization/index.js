import { useContext } from "react";
import { Text, Spinner } from "@chakra-ui/core";

import { BubbleChart } from "@metastring/multidimensional-charts";

import TableOfResults from "./TableOfResults";
import { useData } from "context/hhm-data";
import { getDomainFromStates } from "./states-domain";

export function IDSPVisualization({ filter }) {
  const {loading, error, data} = useData(filter)
  if (loading) return <div>Loading</div>
  if (error) return <div>error.message</div>
  const yDomain = getDomainFromStates(data?.data?.map(d => d["entity.State"]))
  return <BubbleChart data={data?.data} colorParam="diagnosis.id" yParam="entity.State" yDomain={yDomain}/>;
}

export function IDSPTable({filter}) {
  const {loading, error, data} = useData(filter)
  if (loading) return <div>Loading</div>
  if (error) return <div>error.message</div>
  return <TableOfResults results={data?.data} />
}
