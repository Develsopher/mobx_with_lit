import { makeObservable, observable, action, computed } from "mobx";
import { postStore } from "./PostStore";

class UserStore {
  data = null;
  isLoggingIn = false;

  constructor() {
    makeObservable(this, {
      data: observable,
      isLoggingIn: observable,
      login: action,
      logout: action,
      isLoggedIn: computed,
    });
  }

  login(data) {
    this.isLoggingIn = true;
    setTimeout(() => {
      this.data = data;
      this.isLoggingIn = false;
      // 로그인과 동시에 글 생성할 수 도 있음(다른 store 추가 가능)
      postStore.addPost({
        content: `Post by ${data.name}`,
        author: data.name,
      });
    }, 2000);
  }

  logout() {
    this.data = null;
  }

  get isLoggedIn() {
    return this.data !== null;
  }
}

export const userStore = new UserStore();
