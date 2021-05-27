export const state = () => ({
  card: []
})

export const mutations = {
  addProduct(state, product) {
    state.card.unshift(product)
  },
  removeProduct(state, id) {
    state.card = state.card.filter(el => {
      return el.id !== id
    })
  },
  clearCard(state) {
    state.card = []
  }
}

export const getters = {
  getAllCardProducts: state => state.card,
  getCardLength: state => state.card.length
}
