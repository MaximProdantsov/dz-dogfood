import { api } from "../../api/api"
import { CloseLoading, isError, isLoading } from "../../utilities/utilitiesStore"

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")


const initialState = {
  data: {},
  loading: false,
  error: {},
  isAuthorization: false
}

export const getUser = createAsyncThunk('user/getUser', async () => {
  return await api.getUserMe()
})

export const uppdateUser = createAsyncThunk('user/uppdateUser', async (data) => {
  return await api.uppdateUserMe({ name: data.name, about: data.about })
})

export const uppdateAvatar = createAsyncThunk('user/uppdateAvatar', async (data) => {
  return await api.uppdateUserAvatar({ avatar: data.avatar })
})

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthorization: (state, action) => {
      state.isAuthorization = action.payload
    }
  },
  extraReducers: (builder) => {

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.data = action.payload
    })
    builder.addCase(uppdateUser.fulfilled, (state, action) => {
      state.data = action.payload
    })
    builder.addCase(uppdateAvatar.fulfilled, (state, action) => {
      state.data = action.payload
    })
    builder.addMatcher(isLoading, (state, action) => {
      state.loading = true
    })
    builder.addMatcher(CloseLoading, (state, action) => {
      state.loading = false
    })
    builder.addMatcher(isError, (state, action) => {
      state.loading = false
      state.error = action
      alert('Ошибка какая то')
      console.log(action);
    })
  }
})

export const { setAuthorization } = userSlice.actions
export default userSlice.reducer