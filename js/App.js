import Component from "./core/Component.js";
import $store from "./store/index.js";

import UserTitle from "./component/UserTitle.js";
import UserList from "./component/UserList.js";
import TodoInput from "./component/TodoInput.js";
import TodoList from "./component/TodoList.js";

export default class App extends Component {
  init() {
    this.components = {
      UserTitle: new UserTitle("#user-title"),
      UserList: new UserList("#user-list"),
      TodoInput: new TodoInput("#todo-input"),
      TodoList: new TodoList("#todo-list"),
    };

    this.events = {
      click: [this.deleteAllTodo],
    };
  }

  //TODO: 전체 삭제 버튼 별도 컴포넌트로 분리
  async deleteAllTodo({ target }) {
    if (target.dataset.action !== "deleteAllTodo") {
      return;
    }

    await $store.todo.deleteAll();
  }

  render() {
    return `
      <h1 id="user-title">
      </h1>
      <section>
        <div id="user-list">
        </div>
      </section>

      <section class="todoapp">
        <section id="todo-input" class="input-container">
        </section>
        <section id="todo-list" class="main">
        </section>
        <div class="count-container">
          <span class="todo-count">총 <strong>0</strong> 개</span>
          <ul class="filters">
            <li>
              <a href="/#" class="all selected">전체보기</a>
            </li>
            <li>
              <a href="#active" class="active">해야할 일</a>
            </li>
            <li>
              <a href="#completed" class="completed">완료한 일</a>
            </li>
          </ul>
          <button class="clear-completed" data-action="deleteAllTodo">모두 삭제</button>
        </div>
      </section>
    `;
  }
}
