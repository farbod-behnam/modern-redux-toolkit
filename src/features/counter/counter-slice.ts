import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
    value: number;
}

const initialCounterState: CounterState = {
    value: 5
}

const counterSlice = createSlice({
    name: "counter",
    initialState: initialCounterState,
    reducers: {
        incremented(state) {
            state.value++;
        },
        amountAdded(state, action: PayloadAction<number>) {
            state.value += action.payload;
        }
    }
});

export const { incremented } = counterSlice.actions;
export const counterActions = counterSlice.actions;
export const counterReducer = counterSlice.reducer;