export interface user {
  data: {
    user: {
      role: String;
      _id: String;
      username: String;
      email: String;
    };
  };
  role: string;
  token: string;
}
