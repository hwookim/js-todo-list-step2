import $api from "../../api/index.js";
import user from "./user.js";
import filter from "./filter.js";
import watch from "../../utils/watch.js";

const todo = (() => {
  let selectedUserId;

  const init = async () => {
    selectedUserId = user.getSelectedId();
    user.subscribe(() => (selectedUserId = user.getSelectedId()));
  };

  const getFiltered = async () => {
    const todos = await getAll();

    if (filter.isActive()) {
      return todos.filter((todo) => !todo.isCompleted);
    } else if (filter.isCompleted()) {
      return todos.filter((todo) => todo.isCompleted);
    }
    return todos;
  };

  const getAll = async () => {
    return await $api.todo.getAll(selectedUserId);
  };

  const create = async (contents) => {
    const newTodo = await $api.todo.create(selectedUserId, { contents });
    publish();
    return newTodo;
  };

  const deleteTodo = async (todoId) => {
    const deletedTodo = await $api.todo.delete(selectedUserId, todoId);
    publish();
    return deletedTodo;
  };

  const deleteAll = async () => {
    await $api.todo.deleteAll(selectedUserId);
    publish();
  };

  const toggle = async (todoId) => {
    await $api.todo.toggle(selectedUserId, todoId);
    publish();
  };

  const edit = async (todoId, contents) => {
    const editedTodo = await $api.todo.edit(selectedUserId, todoId, {
      contents,
    });
    publish();
    return editedTodo;
  };

  const setPriority = async (todoId, priority) => {
    const todo = await $api.todo.priority(selectedUserId, todoId, { priority });
    publish();
    return todo;
  };

  const subscribe = (method) => {
    watch.subscribe("todo", method);
  };

  const publish = () => {
    watch.publish("todo");
  };

  return {
    init,
    getFiltered,
    getAll,
    create,
    delete: deleteTodo,
    deleteAll,
    toggle,
    edit,
    setPriority,
    subscribe,
  };
})();

export default todo;
