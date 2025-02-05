import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { HabitState } from "../interfaces/habitState";
import { Habit } from "../interfaces/habitInterface";



const intialState : HabitState = {
    habits: [],
}

const habitSlice = createSlice({
    name : "habits",
    initialState : intialState,
    reducers : {
        addHabit : (state /* here we can't give this state type of RootState as this will create a circular problem as rootstate is decided from the reducer */, action:PayloadAction<{name:string,frequency:"daily" | "weekly"}> /*this payloadAction must be a generic type like type payloadAction<T>{}*/) => {
              const newHabit : Habit = {
                     id : nanoid(),
                     name : action.payload.name,
                     frequency : action.payload.frequency,
                     completedDates: [],
                     createdAt: new Date().toISOString()
              }

              state.habits.push(newHabit)
        },

        toggleHabit : (state,action: PayloadAction<{id: string,date:string}>) => {
              const habit = state.habits.find(habit => habit.id === action.payload.id)
              if(habit){
                const index = habit.completedDates.indexOf(action.payload.date)

                if(index>-1){
                    habit.completedDates.splice(index,1)
                }
                else{
                    habit.completedDates.push(action.payload.date)
                }
              }     
        } ,

        removeHabit : (state,action:PayloadAction<{id:string}>)=>{
          state.habits = state.habits.filter(habit => habit.id !== action.payload.id)
        }
    }
})

export const {addHabit,toggleHabit,removeHabit} = habitSlice.actions

export default habitSlice.reducer

