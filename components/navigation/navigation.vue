<template>
  <nav class="container">
    <h2>TestList</h2>
    <Card />
  </nav>
</template>

<script>
import Card from './card'
export default {
  components: {
    Card
  }
}
</script>

<style scope lang="sass">
@import "~/assets/sass/_vars"
nav
  background: $white
  display: flex
  justify-content: space-between
  padding: 18px 0
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05)
  border-radius: 0px 0px 8px 8px
</style>
