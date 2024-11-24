export interface User {
  firstname: string;
  lastname: string;
  email: string;
  dob: string;
  profile: string | ArrayBuffer | null;
}
export interface CreateUser {
  firstname: string;
  lastname: string;
  email: string;
  dob: string;
  password: string;
}
