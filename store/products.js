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
    const sortStuffByPrice = obj.stuff.sort((a, b) => {
      return a.price > b.price ? -1 : 1
    })
    state.products.push({
      id: obj.idCategory,
      stuff: sortStuffByPrice
    })
    state.loading = false
  },

  sortByPopular(state) {
    for (let index in state.products) {
      state.products[index].stuff.sort((a, b) => {
        return a.rating > b.rating ? -1 : 1
      })
    }
  },

  sortByPrice(state) {
    for (let index in state.products) {
      state.products[index].stuff.sort((a, b) => {
        return a.price > b.price ? -1 : 1
      })
    }
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
