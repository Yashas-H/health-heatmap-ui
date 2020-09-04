import { contains } from "underscore";

const statesInOrder = [
  "Jammu and Kashmir",
  "Punjab",
  "Haryana",
  "Uttarakhand",
  "Delhi",
  "Sikkim",
  "Arunachal Pradesh",
  "Rajasthan",
  "Uttar Pradesh",
  "Assam",
  "Nagaland",
  "Bihar",
  "Meghalaya",
  "Manipur",
  "Tripura",
  "Mizoram",
  "Jharkhand",
  "Madhya Pradesh",
  "Gujarat",
  "West Bengal",
  "Chhatisgarh",
  "Andhra Pradesh",
  "Odisha",
  "Maharashtra",
  "Telangana",
  "Goa",
  "Tamil Nadu",
  "Karnataka",
  "Puducherry",
  "Kerala",
];

statesInOrder.reverse()

export const getDomainFromStates = (states) =>
  statesInOrder.filter((s) =>
    contains(states ?? [], s)
  );
