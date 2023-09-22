import http from "@services/httpService";
import config from "@config/default.json";

const getContent = (parameters) =>
  http.get(`${config.path}/config`, { params: parameters });

const getResource = (parameters) =>
  http.get(`${config.path}/resource`, { params: parameters });

const getSimilarity = (data) =>
  http.post(`${config.path}/upload/hash`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export default { getContent, getResource, getSimilarity };
