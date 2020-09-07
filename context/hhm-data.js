import React from "react";
import { useQuery } from "react-query";
import {
  getIndicators,
  getIndicatorsWithFilter,
  getCompositeScores,
  getData,
  getDimensions,
} from "services/hhm-api";
import { union, without } from "underscore";

const addTermToState = (state, [key, value]) => {
  return {
    ...state,
    terms: {
      ...state.terms,
      [key]: union([...(state?.terms?.[key] ?? [])], [value]),
    },
  };
};

const setTermInState = (state, [key, values]) => {
  return {
    ...state,
    terms: {
      ...state.terms,
      [key]: values
    }
  }
}

const removeTermEntirelyInState = (state, term) => {
  const {term: removedTerm, ...newTerms} = state?.terms
  return {
    ...state,
    terms: newTerms
  }
}

const removeTermFromState = (state, [key, value]) => {
  return {
    ...state,
    terms: {
      ...state.terms,
      [key]: without([...(state?.terms?.[key] ?? [])], value),
    },
  };
};

const addRangeToState = (state, [dimension, operator, rangeValue]) => {
  return {
    ...state,
    ranges: {
      ...state.ranges,
      [dimension]: {
        ...(state?.ranges?.[dimension] ?? {}),
        [operator]: rangeValue
      }
    }
  }
}

function filterReducer(state, action) {
  switch (action.type) {
    case "add-term": {
      return addTermToState(state, action.payload);
    }
    case "remove-term": {
      return removeTermFromState(state, action.payload);
    }
    case "add-range-date": {
      return addRangeToState(state, action.payload)
    }
    case "remove-term-entirely": {
      return removeTermEntirelyInState(state, action.payload)
    }
    case "set-term": {
      return setTermInState(state, action.payload)
    }
    default: {
      throw new Error(`Unhandled action of type ${action.type}`);
    }
  }
}

export function useDataFilter(initialFilter = {}) {
  return React.useReducer(filterReducer, initialFilter);
}

export function useCompositeScore(filter) {
  const { isLoading, error, data } = useQuery(
    ["analysis", filter],
    (_, filter) => getCompositeScores(filter)
  );
  return {
    compositeScoreLoading: isLoading,
    compositeScoreError: error,
    compositeScores: data,
  };
}

export function useData(filter, fieldsToInclude) {
  const { isLoading, error, data } = useQuery(["data", filter, fieldsToInclude], (_, filter) =>
    getData(filter, fieldsToInclude)
  );
  return {
    dataLoading: isLoading,
    dataError: error,
    data,
  };
}

export function useIndicators({ filter = {} }) {
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

export function useDimensionValues({ fields = [], filter = {} }) {
  return useQuery(
    ["dimension", fields, filter],
    (_, fields, filter) => getDimensions({ fields, filter })
  );
}
