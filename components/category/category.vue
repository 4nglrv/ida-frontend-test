<template>
  <ul v-if="!loading">
    <div v-for="obj in category" :key="obj.id">
      <nuxt-link
        :to="'/' + obj.id"
        >
        {{ obj.name }}
      </nuxt-link>
    </div>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions({
      fetchCategory: 'category/fetchCategory'
    }),
  },
  computed: {
     ...mapGetters('category', [
      'getCategory',
    ]),
    category() {
      return this.getCategory
    },
  },
  async created() {
    await this.fetchCategory()
    this.loading = false
  }
}
</script>

<style>

</style>
