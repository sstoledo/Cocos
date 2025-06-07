export interface UserResponse {
  ok:   boolean;
  user: User;
}

export interface User {
  id:       string;
  name:     string;
  email:    string;
  password: string;
  isActive: boolean;
  roles:    string[];
}
