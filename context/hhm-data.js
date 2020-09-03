import React from "react";
import { useQuery } from "react-query";
import {
  getIndicators,
  getIndicatorsWithFilter,
  getCompositeScores,
} from "services/hhm-api";
import { union, without } from "underscore";

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
