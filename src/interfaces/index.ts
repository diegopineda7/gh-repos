export interface UserResponse {
  data: UserData;
}

export interface ReposResponse {
  data: ReposData;
}

export interface UserData {
  viewer: User;
}

export interface User {
  name: string;
  login: string;
  avatarUrl: string;
  url: string;
  token: string;
  favorites: string[];
}

export interface ReposData {
  viewer: Viewer;
}

export interface Viewer {
  repositories: Repositories;
}

export interface Repositories {
  nodes: Repo[];
}

export interface Repo {
  id: string;
  name: string;
  url: string;
  primaryLanguage: PrimaryLanguage;
  visibility: string;
}

export interface PrimaryLanguage {
  name: string;
}

export interface Credentials {
  username: string;
}
