1. First, let's create the auth slice (authSlice.js):

```javascript
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Simulated API call
const loginAPI = async (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        credentials.username === "user" &&
        credentials.password === "password"
      ) {
        resolve({ id: 1, name: "John Doe", username: "user" });
      } else {
        reject("Invalid credentials");
      }
    }, 1000);
  });
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const user = await loginAPI(credentials);
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
```

2. Next, let's set up the Redux store (store.js):

```javascript
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
```

3. Now, let's create a Login component (Login.js):

```javascript
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  if (status === "loading") {
    return <div>Logging in...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
};

export default Login;
```

4. Let's create a UserInfo component to display user information and logout button (UserInfo.js):

```javascript
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./authSlice";

const UserInfo = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  if (!user) return null;

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Username: {user.username}</p>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default UserInfo;
```

5. Finally, let's create the main App component (App.js):

```javascript
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import Login from "./Login";
import UserInfo from "./UserInfo";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Redux Login Example</h1>
        <Login />
        <UserInfo />
      </div>
    </Provider>
  );
}

export default App;
```

This implementation provides a complete login/logout functionality using Redux:

- The `authSlice` manages the authentication state, including the async login process and synchronous logout.
- The `Login` component allows users to input credentials and dispatches the login action.
- The `UserInfo` component displays user information when logged in and provides a logout button.
- The `App` component brings everything together and provides the Redux store to the entire application.

To test this:

1. Run the app and you'll see the login form.
2. Enter username "user" and password "password" to log in successfully.
3. You'll see the user information displayed and a logout button.
4. Click the logout button to log out.
5. Try incorrect credentials to see error handling in action.

This example demonstrates how to manage authentication state in Redux, handle async operations with createAsyncThunk, and connect React components to the Redux store using hooks like useSelector and useDispatch.
