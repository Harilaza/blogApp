import { Article } from "../article/article.interface";

export interface User {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
    articles?: Article[];
  }
  