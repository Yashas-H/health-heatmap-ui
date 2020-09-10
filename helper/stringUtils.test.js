const { getSecondPartOrSame } = require("./stringUtils");

describe("getSecondPartOrSame", () => {
  it("returns same if no second part", () => {
    expect(getSecondPartOrSame("something")).toBe("something");
  });
  it("returns second part if present", () => {
    expect(getSecondPartOrSame("something.second")).toBe("second");
  });
  it("returns empty string if second part is empty", () => {
    expect(getSecondPartOrSame("something.")).toBe("");
  });
});
