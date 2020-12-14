import Component from "../core/Component.js";
import $store from "../store/index.js";

const UserListItem = ({ _id, name, active }) => {
  return `
    <button 
      class="ripple  ${active ? " active" : ""}"
      data-id=${_id}
      data-action="selectUser"
    >
      ${name}
    </button>
  `;
};

export default class UserList extends Component {
  users = [];

  init() {
    this.events = {
      click: [this.createUser, this.selectUser],
    };

    $store.user.subscribe(this.setState.bind(this));
  }

  async createUser() {
    const name = prompt("추가하고 싶은 이름을 입력해주세요.");

    if (!name) return;
    if (name.trim().length < 2) {
      alert("2글자 이상이어야 합니다.");
      return;
    }

    const newUser = await $store.user.create(name);
    $store.user.setSelected(newUser);
  }

  selectUser({ target }) {
    const user = this.findUser(target.dataset.id);
    $store.user.setSelected(user);
  }

  findUser(id) {
    return this.users.find((user) => user._id === id);
  }

  async render() {
    this.users = await $store.user.getAll();

    return `
      ${this.users.map(UserListItem).join("")}
      <button class="ripple user-create-button" data-action="createUser">+ 유저 생성</button>
    `;
  }
}
