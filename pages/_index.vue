<template>
  <div class="catalog__right" v-if="!loading">
    <Product v-for="obj in products.stuff" :key="obj.id" :product="obj" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  methods: {
    ...mapActions('products', ["fetchProducts"])
  },
  computed: {
    ...mapState(
      'products', ['loading']
    ),
    ...mapGetters('products', [
      'getProducts',
      'getLoading'
    ]),
    id() {
      return Number(this.$route.params.index);
    },
    products() {
      return this.getProducts(this.id)
    }
  },
  async mounted() {
    await this.fetchProducts(this.id)
  }
};
</script>

<style lang="sass">
@import "~/assets/sass/_vars"
</style>
