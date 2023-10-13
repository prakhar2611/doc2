import { createSlice } from '@reduxjs/toolkit'

export const contentSlice = createSlice({
  name: 'content',
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
    setcontent: (state, action) => {
      state.value = action.payload
      console.log("on click change state ======" ,state.value)
    },
  },
})

// Action creators are generated for each case reducer function
export const { setcontent } = contentSlice.actions

export default contentSlice.reducer