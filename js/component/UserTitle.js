import Component from "../core/Component.js";
import $store from "../store/index.js";

export default class UserTitle extends Component {
  init() {
    $store.user.subscribe("selected", this.setState.bind(this));
  }

  async render() {
    const { name } = $store.user.selected;

    return `
      <span><strong>${name ? name : ""}</strong>'s Todo List</span>
    `;
  }
}
