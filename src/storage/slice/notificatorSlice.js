import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  NotificatorActiv: false,
  text: '',
}

const notificatorSlice = createSlice({
  name: 'notificator',
  initialState,
  reducers: {
    setNotificatorActiv:(state, action)=>{
      state.NotificatorActiv = action.payload.NotificatorActiv
      state.text = action.payload.text
    }

    
  }
})


export const {setNotificatorActiv} = notificatorSlice.actions
export default notificatorSlice.reducer