export interface admin {
  id?: number | null;
  name?: string;
  email?: string;
  password?: string;
}
export interface consumer {
  id?: number | null;
  name?: string;
  email?: string;
  password?: string;
}
export interface adminlogin {
  email: string;
  password: string;
}
export interface UserStore {
  admin: {
    all: admin[];
    loggedin: admin | null;
  };
  consumer: {
    all: consumer[];
    loggedin: consumer | null;
  };
}
