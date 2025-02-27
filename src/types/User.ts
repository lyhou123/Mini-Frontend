// src/store/types.ts
export type User = {
    name: string;
    email: string;
  }
  
  export type State=  {
    token: string | null;
    user: User | null;
  }
  
  export type Credentials = {
    email: string;
    password: string;
  }
  
  export interface UserData extends Credentials  {
    name: string;
  }