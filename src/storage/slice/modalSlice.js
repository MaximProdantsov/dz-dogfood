import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  modalActiv: false
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalActiv:(state, action)=>{
      state.modalActiv = action.payload
    }

    
  }
})


export const {setModalActiv} = modalSlice.actions
export default modalSlice.reducer