export const state = () => ({
    panelIsShow: false
})

export const mutations = {
  setIsShow(state) {
    const { body } = document
    state.panelIsShow = !state.panelIsShow
    if (state.panelIsShow) {
      body.style.overflowY = 'hidden'
    } else {
      body.style.overflowY = 'auto'
    }
  }
}

export const getters = {
  getShow(state) {
    return state.panelIsShow
  }
}
