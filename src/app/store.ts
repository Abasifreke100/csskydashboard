import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
// import tokenExpirationMiddleware from '../api/tokenExpiration'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tokenExpirationMiddleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch