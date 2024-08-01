import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { observer } from "mobx-lit-element";
import { observable } from "mobx";
import { userStore } from "../stores/UserStore";
import { postStore } from "../stores/PostStore";

@customElement("login-component")
@observer
class LoginComponent extends LitElement {
  static styles = css`
    /* 스타일 정의 */
    input {
      display: block;
      margin-bottom: 10px;
    }
    button {
      margin-right: 10px;
    }
  `;

  @observable state = {
    name: "",
    password: "",
  };

  get data() {
    return userStore.data;
  }

  get isLoggingIn() {
    return userStore.isLoggingIn;
  }

  // computed state 활용
  get isLoggedIn() {
    return userStore.isLoggedIn;
  }

  get postCount() {
    return postStore.posts.length;
  }

  onClick() {
    userStore.login({
      name: this.state.name,
      password: this.state.password,
    });
  }

  onLogout() {
    userStore.logout();
  }

  onChangeName(e) {
    this.state.name = e.target.value;
  }

  onChangePassword(e) {
    this.state.password = e.target.value;
  }

  render() {
    console.log("rendering...");
    return html`
      ${this.isLoggingIn
        ? html`<div>로그인 중...</div>`
        : this.isLoggedIn
        ? html`<div>${this.data.name}</div>`
        : html`<div>로그인 해주세요.</div>`}
      ${!this.isLoggedIn
        ? html`
            <input
              value=${this.state.name}
              @input=${this.onChangeName}
              placeholder="Username"
            />
            <input
              value=${this.state.password}
              type="password"
              @input=${this.onChangePassword}
              placeholder="Password"
            />
            <button @click=${this.onClick}>로그인</button>
          `
        : html`<button @click=${this.onLogout}>로그아웃</button>`}
      <div>게시물 수: ${this.postCount}</div>
    `;
  }
}
