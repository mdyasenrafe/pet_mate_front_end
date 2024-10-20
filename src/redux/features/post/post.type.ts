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
};

export interface TCreatePostRequest {
  title: string;
  content: string;
  category: "tip" | "story";
  files?: TFile[];
  monetization: boolean;
}

export interface TUpdatePostRequest {
  postId: string;
  title?: string;
  content?: string;
  category?: "tip" | "story";
  files?: TFile[];
  monetization?: boolean;
}
