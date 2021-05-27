<template>
  <div>
    <transition name="body-panel">
      <Panel class="body-panel" v-if="isShow" />
    </transition>
    <Navigation />
    <div class="container">
      <div class="header">
        <h1>Каталог</h1>
        <div class="sorting">
          Сортировать по:
          <button @click="setDropdown">
            {{ dropdown.bySort }}
            <div>&#9660;</div>
          </button>
          <transition name="sorting__dropdown">
            <div v-if="dropdown.isShow" class="sorting__dropdown">
              <ul>
                <li v-on:click="setBySort('цене')">По цене</li>
                <li v-on:click="setBySort('популярности')">По популярности</li>
              </ul>
            </div>
          </transition>
        </div>
      </div>
      <div class="catalog">
        <div class="catalog__left">
          <Category />
        </div>
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Category from "~/components/category/category"

export default {
  components: {
    Category
  },
  computed: {
    ...mapGetters({
      isShow: "panel/getShow",
      getLoading: "category/getLoading"

    }),
    loadingCategory() {
      return this.getLoading
    },
  },
  data() {
    return {
      dropdown: {
        isShow: false,
        bySort: 'цене'
      }
    }
  },
  methods: {
    ...mapMutations(
      'products', ['sortByPopular', 'sortByPrice']
    ),
    setDropdown() {
      this.dropdown.isShow = !this.dropdown.isShow
    },
    setBySort(str) {
      this.dropdown.bySort = str
      if(str === 'цене') this.sortByPrice()
      if(str === 'популярности') this.sortByPopular()
      this.dropdown.isShow = false
    },
  },
}
</script>

<style lang="sass">
@import "../assets/sass/_vars"
html
  font-family: 'PT Sans', sans-serif
  font-size: 14px
  word-spacing: 1px
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  box-sizing: border-box
  -moz-box-sizing: border-box

*,
*::before,
*::after
  box-sizing: border-box
  margin: 0
  padding: 0
body input:focus:required:invalid,
body textarea:focus:required:invalid
  color: #666
body input:required:valid,
body textarea:required:valid
  color: #666
input
  color: $black
  border: none
  border-radius: 8px
  background-image: none
  background-color: $grey-extra-light
  padding: 14px
  font-size: 16px
  -webkit-box-shadow: none
  -moz-box-shadow: none
  box-shadow: none
  &:focus
    outline: none
  &:placeholder
    color: $grey-light
button
  padding: 0
  border: none
  font: inherit
  color: inherit
  background-color: transparent
  outline: none
  cursor: pointer
  &:disabled
    cursor: not-allowed
    background-color: $grey-light !important
  &:hover
    border: none
    outline: none
  &:active
    border: none
    outline: none
  &:focus
    outline: none
    border: none
h3
  font-size: 18px
  color: $grey
  font-weight: 500
h2
  font-size: 22px
  color: $grey
h1
  font-size: 32px
  color: $grey
.container
  padding-left: calc(50% -  630px)
  padding-right: calc(50% -  630px)
.header
  display: flex
  justify-content: space-between
  align-items: center
  margin-top: 32px
  .sorting
    font-size: 16px
    color: $black
    > button
      color: $grey
      > div
        display: inline-block
        font-size: 6px
        position: relative
        bottom: 1px
    &__dropdown-fade-enter, &__dropdown-fade-leave-to
      transform: translateY(20px)
      opacity: 0
      transition: all .2s ease-in-out
    &__dropdown-enter-active, &__dropdown-leave-active
      opacity: 0
      transform: translateY(-10px)
      transition: all .2s ease-in-out
    &__dropdown
      transition: all .2s ease-in-out
      position: absolute
      padding: 8px 0
      box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05)
      border-radius: 8px
      z-index: 1
      background: $white
      ul
        list-style: none
        li
          padding: 4px 32px 4px 12px
          transition: .22s ease-in-out
          cursor: pointer
          &:hover
            background: $grey-extra-light
.catalog
  margin-top: 24px
  display: flex
  &__left
    margin-right: 24px
    width: calc(14% - 24px)
    ul
      list-style: none
      div
        padding: 16px 0
        .nuxt-link-exact-active
          color: $black
          text-decoration: underline
          &:hover
            color: $black
        a
          color: $grey-light
          font-size: 16px
          text-decoration: none
          transition: .22s ease-in-out
          &:hover
            color: $grey
  &__right
    width: 86%
    display: flex
    flex-wrap: wrap
</style>
