import { contains } from "underscore";

export function getSecondPartOrSame(input) {
  if (contains(input, ".")) {
    return input.split(".")[1];
  } else {
    return input;
  }
}
