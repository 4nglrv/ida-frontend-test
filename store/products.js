export const state = () => ({
  products: [],
  loading: true
})

export const actions = {
  async fetchProducts({ commit, state }, idCategory) {
    commit('setLoading')
    console.log('products fetch')
    state.products.forEach(product => {
      if (product.id === idCategory) {
        return commit('setLoading', false)
      }
    })
    const res = await fetch(`https://frontend-test.idaproject.com/api/product?category=${idCategory}`)
    const stuff = await res.json()
    commit('addProducts', { stuff, idCategory })
  }
}

export const mutations = {
  setLoading(state, loading = true) {
    state.loading = loading
  },

  addProducts(state, obj) {
    for (let key in state.products) {
      if (state.products[key].id === obj.idCategory) {
        state.loading = false
        return
      }
    }
    state.products.push({
      id: obj.idCategory,
      stuff: obj.stuff
    })
    state.loading = false
  }
}

export const getters = {
  getProducts: (state) => (idCategory) => {
    for (let index in state.products) {
      console.log(state.products[index].id)
      if (state.products[index].id === idCategory) {
        return state.products[index]
      }
    }
    return false
  },

  getLoading: state => state.loading
}
