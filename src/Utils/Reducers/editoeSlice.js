import { createSlice } from '@reduxjs/toolkit'
// import {Editor} from "novel"


// function GetEditor({sd}) {
//   return(
//     <Editor
//     defaultValue={sd}
//     disableLocalStorage = {true} 
//     />
//     // onDebouncedUpdate={(editor) => onChange(editor)} />
//   )
// }

export const editorSlice = createSlice({
  name: 'Editor',
  initialState: {
    value: {
        'reload' : false
    },
},
  reducers: {
    setReload: (state,action) => {
      state.value.reload = !(state.value.reload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { setReload } = editorSlice.actions

export default editorSlice.reducer