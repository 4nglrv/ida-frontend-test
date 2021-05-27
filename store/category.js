export const state = () => ({
  loading: true,
  category: []
})

export const actions = {
  async fetchCategory({ commit }) {
    console.log('category fetching')
    const res = await fetch("https://frontend-test.idaproject.com/api/product-category")
    const category = await res.json()
    commit('setCategory', category)
  },
}

export const mutations = {
  setCategory(state, category) {
    state.category = category
    state.loading = false
    console.log('fetching complete ' + state.category)
  },

  setLoading(state) {
    state.loading = true
  }
}

export const getters = {
  getCategory(state) {
    return state.category
  },

  getLoading: state => state.loading
}
