import { filterReducer } from "./hhm-data";

describe("filter reducer", () => {
  it("remove-term-entirely should not let a term remain", () => {
    const state = {
      terms: {
        "indicator.id": ["something", "something else"],
        "entity.State": ["Something"],
      },
    };
    const newState = filterReducer(state, {
      type: "remove-term-entirely",
      payload: ["indicator.id"],
    });

    expect(newState).toEqual({
      terms: {
        "entity.State": ["Something"],
      },
    });
  });
});
