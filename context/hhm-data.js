import React from "react";
import { useQuery } from "react-query";
import {
  getIndicators,
  getIndicatorsWithFilter,
  getCompositeScores,
} from "services/hhm-api";
import { union, without } from "underscore";

const FilteredDataStateContext = React.createContext();
const FilteredDataDispatchContext = React.createContext();

const addTermToState = (state, [key, value]) => {
  return {
    terms: {
      ...state.terms,
      [key]: union([...(state?.terms?.[key] ?? [])], [value]),
    },
  };
};

const removeTermFromState = (state, [key, value]) => {
  return {
    terms: {
      ...state.terms,
      [key]: without([...(state?.terms?.[key] ?? [])], value),
    },
  };
};

function filterReducer(state, action) {
  switch (action.type) {
    case "add-term": {
      return addTermToState(state, action.payload);
    }
    case "remove-term": {
      return removeTermFromState(state, action.payload);
    }
    default: {
      throw new Error(`Unhandled action of type ${action.type}`);
    }
  }
}

function FilteredDataProvider({ children }) {
  const [state, dispatch] = React.useReducer(filterReducer, {});
  return (
    <FilteredDataStateContext.Provider value={state}>
      <FilteredDataDispatchContext.Provider value={dispatch}>
        {children}
      </FilteredDataDispatchContext.Provider>
    </FilteredDataStateContext.Provider>
  );
}

function useDataFilterState() {
  const context = React.useContext(FilteredDataStateContext);
  if (context === undefined) {
    throw new Error(
      "useFilteredDataState must be used within a FilteredDataProvider"
    );
  }
  return context;
}

function useDataFilterDispatch() {
  const context = React.useContext(FilteredDataDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useFilteredDataDispatch must be used within a FilteredDataProvider"
    );
  }
  return context;
}

function useDataFilter() {
  return [useDataFilterState(), useDataFilterDispatch()];
}

function useFilteredData() {
  const filter = useDataFilterState();
  const { isLoading, error, data } = useQuery(
    ["analysis", filter],
    (_, filter) => getCompositeScores(filter)
  );
  return {
    filteredDataLoading: isLoading,
    filteredDataError: error,
    filteredData: data,
  };
}

function useIndicators({ filter = {} }) {
  const { isLoading, error, data } = Object.is(filter, {})
    ? useQuery("indicators", getIndicators)
    : useQuery(["indicators", filter], (_, filter) =>
        getIndicatorsWithFilter(filter)
      );
  return {
    indicatorsLoading: isLoading,
    indicatorsError: error,
    indicators: data,
  };
}

export { useIndicators, useDataFilter, FilteredDataProvider, useFilteredData };
