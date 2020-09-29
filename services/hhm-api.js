import AppConstant from "constant/AppConstant";
import request from "superagent";
const API_ROOT = AppConstant.config.appBaseUrl;

export const getIndicators = () =>
  fetch(`${API_ROOT}/indicators`).then((res) => res.json());

export const getDimensions = ({ fields, filter }) =>
  request
    .post(`${API_ROOT}/dimensions`)
    .send({ fields, filter })
    .then((res) => res.body)
    .catch((err) => err.response?.body?.errors?.[0] ?? err);

export const getIndicatorsWithFilter = (filter) =>
  getDimensions({
    filter,
    fields: [
      "indicator.id",
      "indicator.Name",
      "indicator.Category",
      "indicator.Sub-Category",
    ],
  });

export const getCompositeScores = (filter) =>
  request
    .post(`${API_ROOT}/analysis/scoring`)
    .send({ filter, dimension: "indicator.id" })
    .then((res) => res.body)
    .catch((err) => {
      return err.response?.body?.errors?.[0] ?? err;
    });

export const getData = (filter, fields) => {
  const req = request.post(`${API_ROOT}/data`);

  if (Array.isArray(fields)) {
    fields.forEach((field) => {
      req.query({ include: field });
    });
  }
  return req
    .send(filter)
    .then((res) => res.body)
    .catch((err) => err.response?.body?.errors?.[0] ?? err);
};
