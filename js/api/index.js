import { HTTP_METHOD } from "./utils/constant.js";

const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com/api/users";

const $api = (() => {
  const requestWithJsonData = (uri, config) =>
    fetch(uri, config).then((data) => data.json());

  const user = {
    getAll() {
      return requestWithJsonData(BASE_URL);
    },
    create(data) {
      return requestWithJsonData(BASE_URL, HTTP_METHOD.POST(data));
    },
  };

  const todo = {
    getAll(userId) {
      return requestWithJsonData(BASE_URL + `/${userId}/items`);
    },
    create(userId, data) {
      return requestWithJsonData(
        BASE_URL + `/${userId}/items`,
        HTTP_METHOD.POST(data)
      );
    },
    delete(userId, todoId) {
      return requestWithJsonData(
        BASE_URL + `/${userId}/items/${todoId}`,
        HTTP_METHOD.DELETE()
      );
    },
    deleteAll(userId) {
      return requestWithJsonData(
        BASE_URL + `/${userId}/items`,
        HTTP_METHOD.DELETE()
      );
    },
    toggle(userId, todoId) {
      return requestWithJsonData(
        BASE_URL + `/${userId}/items/${todoId}/toggle`,
        HTTP_METHOD.PUT()
      );
    },
    edit(userId, todoId, data) {
      return requestWithJsonData(
        BASE_URL + `/${userId}/items/${todoId}`,
        HTTP_METHOD.PUT(data)
      );
    },
  };

  return {
    user,
    todo,
  };
})();

export default $api;
