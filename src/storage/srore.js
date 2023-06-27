import modalSlice from "./slice/modalSlice";
import notificatorSlice from "./slice/notificatorSlice";
import paginationSlise from "./slice/paginationSlise";
import searchSlice from "./slice/searchSlice";

const { configureStore } = require("@reduxjs/toolkit");
const { default: productsSlice } = require("./slice/productsSlice");
const { default: userSlice } = require("./slice/userSlice");


const store = configureStore({
  reducer: {
    user: userSlice,
    products: productsSlice,
    modal: modalSlice,
    search: searchSlice,
    notificator: notificatorSlice,
    pagination : paginationSlise
  }
})

export default store