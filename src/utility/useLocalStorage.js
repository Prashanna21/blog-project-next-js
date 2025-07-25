export const saveUserCredential = (newUser) => {
  const existingUsers = JSON.parse(localStorage.getItem("usersInfo")) || [];

  const isAlreadyRegistered = existingUsers.some(
    (user) => user.email === newUser.email
  );

  if (isAlreadyRegistered) {
    return {
      message: (
        <span className="text-red-500">
          User Register Already With This Email
        </span>
      ),
      success: false,
    };
  }

  const updatedUsers = [...existingUsers, newUser];

  localStorage.setItem("usersInfo", JSON.stringify(updatedUsers));

  return {
    message: <span className="text-green-500">Registered successfully</span>,
    success: true,
  };
};

export const getUserCredentials = (email, password) => {
  const existingUsers = JSON.parse(localStorage.getItem("usersInfo")) || [];

  const user = existingUsers.find((user) => user.email === email);

  if (!user) {
    return {
      message: <span className="text-red-500">No such user exists</span>,
      email: null,
    };
  }

  if (user.password !== password) {
    return {
      message: <span className="text-red-500">Incorrect password</span>,
      email: null,
    };
  }

  return {
    message: <span className="text-green-500">Login successful</span>,
    email: user.email,
  };
};
