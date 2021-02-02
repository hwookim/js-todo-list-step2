import $api from "../../api/index.js";
import userState from "./userState.js";

const todoState = (() => {
  let selectedUserId = {};
  const subscriber = [];

  const init = async () => {
    userState.subscribe(setSelectedUserId);
    await setSelectedUserId();
  };

  const setSelectedUserId = async () => {
    const { _id } = userState.getSelectedUser();
    selectedUserId = _id;
  };

  const createTodo = async (contents) => {
    await $api.todo.create(selectedUserId, { contents });
    publish();
  };

  const toggleTodo = async (id) => {
    await $api.todo.toggle(selectedUserId, id);
    publish();
  };

  const deleteTodo = async (id) => {
    await $api.todo.delete(selectedUserId, id);
    publish();
  };

  const getTodos = async () => {
    return await $api.todo.getAll(selectedUserId);
  };

  const subscribe = (method) => {
    subscriber.push(method);
  };

  const publish = () => {
    subscriber.forEach(async (method) => await method());
  };

  return {
    init,
    createTodo,
    toggleTodo,
    deleteTodo,
    getTodos,
    subscribe,
  };
})();

export default todoState;
