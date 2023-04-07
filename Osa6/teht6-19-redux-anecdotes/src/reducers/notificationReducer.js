import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotificationInternal(state, action) {
      return action.payload
    },  

    clearNotificationInternal(state, action) {
      return ''
    }  
  },
})

//export const voteAnecdote = anecdote => {

export const setNotification = ( notification, duration ) => {
  return async dispatch => {
    dispatch(setNotificationInternal( notification ))
    setTimeout(() => {
      dispatch(clearNotificationInternal())
    }, duration * 1000)
  }
}

export const { setNotificationInternal, clearNotificationInternal } = notificationSlice.actions
export default notificationSlice.reducer
