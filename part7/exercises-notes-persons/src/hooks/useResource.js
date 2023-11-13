import { useState } from "react";
import axios from "axios";

export const useResource = baseUrl => {
  const [resources, setResources] = useState([]);

  const getAll = () => {
    axios
      .get(baseUrl)
      .then(response => {
        setResources(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const create = resource => {
    axios
      .post(baseUrl, resource)
      .then(() => {
        getAll();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const service = {
    getAll,
    create
  };

  return [resources, service];
};
