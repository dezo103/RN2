import {createAction, createSlice} from "@reduxjs/toolkit";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const addTaskAC = createAction<{title: string}>('task/addTask')
export const changeIsDoneAC = createAction<{id: number, isDone: boolean}>('task/changeIsDoneAC')

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
    extraReducers: (builder) => {
        builder
            .addCase(addTaskAC, (state, action)=> {
                const newTask: TaskType = {
                    id: state.tasks.length + 1,
                    title: action.payload.title,
                    isDone: false
                }
                state.tasks.push(newTask)
            })
            .addCase(changeIsDoneAC, (state, action) => {
                const index = state.tasks.findIndex(el => el.id === action.payload.id)
                if(index > -1) {
                    state.tasks[index].isDone = action.payload.isDone
                }
            })
    }
})

export const reducer = slice.reducer