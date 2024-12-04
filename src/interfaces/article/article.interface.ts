import { User } from "../user/user.interface";

export interface Article {
    id: string;
    title: string;
    content: string;
    authorId: string;
    createdAt: Date;
    author?: User;
  }
  