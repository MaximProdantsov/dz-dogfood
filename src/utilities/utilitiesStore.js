

export const isLoading = ((action) => {
  return action.type.endsWith('pending')
})

export const CloseLoading = ((action) => {
  return action.type.endsWith('fulfilled')
})

export const isError = ((action) => {
  return action.type.endsWith('rejected')
})