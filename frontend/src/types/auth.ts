export interface User {
    id: string;
    username: string;
    email: string;
    role: 'user' | 'admin';
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials extends LoginCredentials {
    username: string;
  }
  