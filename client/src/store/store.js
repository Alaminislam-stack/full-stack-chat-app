import { configureStore } from '@reduxjs/toolkit'
import userReducer from './silce/user/user.silce'
import messagesReducer from './silce/messages/messages.silce'
import sockitReducer from './silce/sockit/sockit.silce'

export default configureStore({
  reducer: {
    user:userReducer,
    messages:messagesReducer,
    sockit:sockitReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['sockit.socket'],
      },
    }),
})