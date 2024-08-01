import { observable, action } from "mobx";

class PostStore {
  @observable posts = [];

  @action
  addPost(post) {
    this.posts.push(post);
  }
}

export const postStore = new PostStore();
