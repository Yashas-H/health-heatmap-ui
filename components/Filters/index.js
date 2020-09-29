import React, { useState } from "react";
import _ from "underscore";
import { Box, Stack, Select, Link, Spinner } from "@chakra-ui/core";

const settlement = ["Rural", "Urban", "Any"];
const caste = ["SC", "ST", "OBC", "General", "Others"];
const gender = ["Male", "Female", "Other"];

function Filters({
  filtersList,
  onFilterChange,
  filterNames,
  filtersSelected,
  isBusy,
}) {
  return (
    <Box className="filter-container">
      <Box className="active" padding="12px">
        <Stack spacing={1} width="100%">
          {_.map(filtersList, (filter, key) => (
            <Stack
              isInline
              spacing={0}
              alignItems="center"
              background="white"
              key={key}
            >
              <Select
                placeholder={`Select ${filterNames[key]}`}
                size="sm"
                value={filtersSelected[key]}
                onChange={(e) =>
                  onFilterChange({ value: e.target.value, filterType: key })
                }
                isDisabled={isBusy}
              >
                {_.map(filter, (f) => (
                  <option value={f} key={f}>
                    {f}
                  </option>
                ))}
              </Select>
              <Box className="clear-filter-btn">
                {isBusy ? (
                  <Spinner size="xs" />
                ) : (
                  <Link
                    isDisabled={!filtersSelected[key]}
                    onClick={(e) =>
                      onFilterChange({ value: "", filterType: key })
                    }
                  >
                    Clear
                  </Link>
                )}
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default Filters;
