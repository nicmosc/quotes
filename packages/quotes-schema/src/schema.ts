// Auth Contract
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export type Login = (args: LoginRequest) => LoginResponse;

// User contract
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserRequest {
  id: User['id'];
}

export interface UserResponse {
  data: User;
}

export type GetUser = (args: UserRequest) => UserResponse;

// Quote contract

export interface Quote {
  id: string;
  // The quotation text
  content: string;
  // The full name of the author
  author: string;
  tags?: string[];
}

export interface QuoteRequest {
  // Comma separated tags
  tags?: string;
}

export interface QuoteResponse {
  data: Quote;
}

export type GetQuote = (args: QuoteRequest) => QuoteResponse;

// Tag contract

export interface Tag {
  id: string;
  name: string;
}

export interface TagsRequest {}

export interface TagsResponse {
  data: Tag[];
}

export type GetTags = (args: TagsRequest) => TagsResponse;
