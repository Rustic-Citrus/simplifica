export const validateUsername = (username: string) => {
  return /^[a-zA-Z][a-zA-Z0-9_]{4,19}$/.test(username);
};

export const validatePassword = (password: string) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    password
  );
};
