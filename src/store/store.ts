import { api } from '@/services/api/baseApi'
import { rtkQueryErrorLogger } from '@/services/api/middleware'
import { configureStore } from '@reduxjs/toolkit'
import alertDialogReducer from '../features/alertDialog/alertDialogSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        alertDialog: alertDialogReducer,
        auth: authReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, rtkQueryErrorLogger)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch