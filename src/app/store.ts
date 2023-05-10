import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "../features/counter/counter-slice";
import { dogApiSlice } from "../features/dogs/dogs-api-slice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [dogApiSlice.reducerPath]: dogApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(dogApiSlice.middleware);
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
