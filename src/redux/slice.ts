import {createSlice} from "@reduxjs/toolkit";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const initialState = {
     tasks: [
         {
             id: 1,
             title: 'HTML',
             isDone: true
         },
     ] as TaskType[]
}

const slice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers: (builder) => {}
})

export const reducer = slice.reducer