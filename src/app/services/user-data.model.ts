export interface user {
  data: {
    user: {
      role: string;
      _id: string;
      username: string;
      email: string;
    };
  };
  role: string;
  token: string;
}

export interface allUsers {
  data: {
    user: [
      {
        role: string;
        _id: string;
        username: string;
        email: string;
      }
    ];
  };
}
