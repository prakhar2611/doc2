import { configureStore } from '@reduxjs/toolkit'
import contentReducer  from './Reducers/contentSlice'
import directorySlice from './Reducers/directorySlice'
import editorReducer  from './Reducers/editoeSlice'
import pageReducer  from './Reducers/pageSlice'
import toSaveContentSlice from './Reducers/toSaveContentSlice'



export default configureStore({
  reducer: {
    content : contentReducer,
    page : pageReducer,
    editor :editorReducer,
    directory : directorySlice,
    tosavecontent : toSaveContentSlice,

  },
})