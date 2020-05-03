import React from 'react';
import UserContext from './UserContext';

const testUser = {
  username: "test",
  first_name: "test",
  last_name: "test",
  email: "test@email.com",
  photo_url: null
}

const testToken = "test";

function UserProvider({ children, currentUser=testUser, token=testToken }) {
  return (
    <UserContext.Provider value={{currentUser, token}}>
      {children}
    </UserContext.Provider>
  )
};

export { UserProvider };