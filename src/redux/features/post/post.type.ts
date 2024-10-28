import { TUser } from "../auth";

export type TFile = {
  url: string;
  type: "image" | "pdf";
};

export type TPost = {
  _id: string;
  title: string;
  content: string;
  category: string;
  monetization: boolean;
  author: TUser;
  upvoteCount: number;
  downvoteCount: number;
  commentCount: number;
  upvotedBy: TUser[];
  downvotedBy: TUser[];
  status: string;
  files: TFile[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  comments: TComment[];
};

export interface TCreatePostRequest {
  title: string;
  content: string;
  category: "tip" | "story";
  files?: TFile[];
  monetization: boolean;
}

export interface TUpdatePostRequest {
  _id: string;
  title?: string;
  content?: string;
  category?: "tip" | "story";
  files?: TFile[];
  monetization?: boolean;
}

export type TComment = {
  post: TPost;
  author: TUser;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type TCreateCommentRequest = {
  post: string;
  author: string;
  content: string;
};

export type TCreatePostValue = {
  title: string;
  content: string;
  category: string;
  files?: string[];
  monetization?: boolean;
};
