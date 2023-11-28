import { api } from "../../api/api"
import { getAverage } from "../../utilities/utilities"
import { CloseLoading, isError, isLoading } from "../../utilities/utilitiesStore"

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")


const initialState = {
  products: [],
  loading: false,
  error: {},
  favoriteCards: [],
  cartProduct: JSON.parse(localStorage.getItem('CartProduct')) === null ? [] : JSON.parse(localStorage.getItem('CartProduct')),
  totalCount: 0
}
export const fetchProduct = createAsyncThunk('products/fetchProduct', async (_, { getState }) => {
  const state = await getState()
  const data = await api.getProductList()
  return { ...data, userId: state.user.data._id }
})

export const fetchChangeProducrLike = createAsyncThunk('products/fetchChangeProducrLike', async (data) => {
  const uppdateCards = data.wasLike ? await api.deleteLike(data.product._id) : await api.addLike(data.product._id)
  return { uppdateCards, wasLike: data.wasLike }
})

export const fetchProductSearch = createAsyncThunk('products/fetchProductSearch', async (search) => {
  return api.searchProduct(search)
})




const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortProducts: (state, ation) => {
      switch (ation.payload) {
        case 'cheap':
          state.products = state.products.sort((a, b) => a.price - b.price)
          break;
        case 'expensive':
          state.products = state.products.sort((a, b) => b.price - a.price)
          break;
        case 'new':
          state.products = state.products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          break;
        case 'discount':
          state.products = state.products.filter((el) => el.tags.includes('sale'))
          break;
        case 'popular':
          state.products = state.products.sort((a, b) => b.likes.length - a.likes.length)
          break;
        case 'rating':
          state.products = state.products.sort((a, b) => getAverage(b.reviews) - getAverage(a.reviews))
          break;
        default:
          state.products = state.products.sort((a, b) => a.price - b.price)
          break;
      }
    },
    addCartProduct: (state, action) => {
      if (state.cartProduct.some((e) => e._id === action.payload._id)) {
        return
      } else {
        action.payload && action.payload.stock > 0 ?
          state.cartProduct = [...state.cartProduct, { ...action.payload, countProduct: 1 }]
          :
          state.cartProduct = [...state.cartProduct, { ...action.payload, countProduct: 0 }]
        const stateJSON = JSON.stringify(state.cartProduct)
        localStorage.setItem('CartProduct', stateJSON)
      }
    },
    deletCartProduct: (state, action) => {
      state.cartProduct = state.cartProduct.filter((e) => e._id !== action.payload)
      const stateJSON = JSON.stringify(state.cartProduct)
      localStorage.setItem('CartProduct', stateJSON)


    },
    setCountPlus: (state, action) => {
      for (let i = 0; i < state.cartProduct.length; i++) {
        if (state.cartProduct[i]._id === action.payload) {
          if (state.cartProduct[i].stock > state.cartProduct[i].countProduct) {
            state.cartProduct[i].countProduct++
          }
          return
        }
      }
    },
    setCountMinus: (state, action) => {
      for (let i = 0; i < state.cartProduct.length; i++) {
        if (state.cartProduct[i]._id === action.payload) {
          if (state.cartProduct[i].countProduct < 1) {
            return
          } else {
            state.cartProduct[i].countProduct--
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.products = action.payload.products
      state.favoriteCards = state.products.filter((e) => e.likes.includes(action.payload.userId))
      state.totalCount = action.payload.total
    })
    builder.addCase(fetchChangeProducrLike.fulfilled, (state, action) => {
      const uppdateCards = action.payload.uppdateCards
      const wasLike = action.payload.wasLike
      state.products = state.products.map((e) => e._id === uppdateCards._id ? uppdateCards : e)
      wasLike ?
        state.favoriteCards = state.favoriteCards.filter((el) => el._id !== uppdateCards._id)
        :
        state.favoriteCards = [...state.favoriteCards, uppdateCards]

    })
    builder.addCase(fetchProductSearch.fulfilled, (state, action) => {
      state.products = action.payload
      action.payload.stateLoadingUser = false
      state.totalCount = action.payload.length
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

export const { sortProducts, addCartProduct, deletCartProduct, setCountPlus, setCountMinus } = productsSlice.actions
export default productsSlice.reducer

