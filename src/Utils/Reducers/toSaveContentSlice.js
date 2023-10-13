import { createSlice } from '@reduxjs/toolkit'

export const toSaveContentSlice = createSlice({
  name: 'tosavecontent',
  initialState: {
    value: {}
  },
  reducers: {
  //  start: (state,action) => {
  //   state.value = true
  //  },
  //   finished: (state, action) => {
  //     state.value = falses
  //   },
    setSave: (state, action) => {
      state.value = action.payload
      console.log("on save to db state ======" ,state.value)
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSave } = toSaveContentSlice.actions

export default toSaveContentSlice.reducer