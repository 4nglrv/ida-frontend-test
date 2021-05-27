<template>
  <div class="body-panel">
    <div class="overlay" />
    <div class="panel">
      <div class="panel__header">
        <h1>Корзина</h1>
        <button @click="toggleShow">&times;</button>
      </div>
      <div v-if="!success" class="panel__body">
        <div class="panel__body--card-empty" v-if="!!!cardLength">
          Пока что вы ничего не добавили в корзину.
          <button @click="toggleShow">Перейти к выбору</button>
        </div>
        <div v-else class="panel__body--stuff">
          <h3>Товары в корзине</h3>
          <div class="panel__body--item">
            <Product v-for="obj in cardProducts" :key="obj.id" :product="obj" />
          </div>
          <h3>Оформить заказ</h3>
          <form
            @submit.prevent="checkForm"
            novalidate="true"
          >
            <input type="text" v-model="order.name" placeholder="Ваше имя" />
            <!-- указал объявленную директиву phone для добавления маски, но почему то не работает(( -->
            <input
              v-model="order.phone"
              placeholder="Телефон"
              autocomplete="tel"
              maxlength="15"
              type="tel"
              v-phone
            />
            <input type="text" v-model="order.address" placeholder="Адрес" />
            <button style="margin-bottom: 8px">Отправить</button>
            <span style="color: red; font-size: 16px">{{ errors[0] }}</span>
          </form>
        </div>
      </div>
      <div class="panel__success" v-else>
        <img src="~/assets/ok-hand.png" />
        <h2>Заявка успешно отправлена</h2>
        <span>Вскоре наш менеджер свяжется с Вами</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import Product from "~/components/product/productCard";

export default {
  data() {
    return {
      order: {
        name: "",
        phone: "",
        address: ""
      },
      errors: [],
      success: false
    };
  },
  components: {
    Product
  },
  methods: {
    ...mapMutations({
      toggleShow: "panel/setIsShow",
      removeProduct: "card/removeProduct",
      clearCard: "card/clearCard"
    }),
    checkForm() {
      this.errors = []

      if (!!!this.order.name.length) {
        this.errors.push('Введите имя');
      }

      if (!!!this.order.phone.length) {
        this.errors.push('Введите номер телефона');
      }

      if (!!!this.order.address.length) {
        this.errors.push('Введите адрес');
      }

      if (!this.errors.length) {
        this.success = true
        this.clearCard()
      }
    },
  },
  computed: {
    ...mapGetters("card", ["getAllCardProducts", "getCardLength"]),
    cardLength() {
      return this.getCardLength;
    },
    cardProducts() {
      return this.getAllCardProducts;
    },
  }
};
</script>

<style lang="sass" scoped>
@import "~/assets/sass/_vars"
.body-panel-fade-enter, .body-panel-fade-leave-to
  transition: all .22s ease-in-out
.body-panel-enter-active, .body-panel-leave-active
  .overlay
    opacity: 0
  .panel
    opacity: 0
    transform: translateX(100%)
.body-panel-leave-active
  transition: all .22s ease-in-out
.body-panel
  position: fixed
  z-index: 1080
  width: 100%
  height: 100%
.overlay
  background: $white
  opacity: 0.8
  width: 100%
  height: 100%
  transition: all .22s ease-in-out
.panel
  overflow-y: auto
  box-shadow: -4px 0px 16px rgba(0, 0, 0, 0.05)
  border-radius: 8px 0px 0px 8px
  background: $white
  position: absolute
  right: 0
  top: 0
  bottom: 0
  padding: 52px 48px
  width: 460px
  height: 100%
  transform: translateX(0)
  transition: all .22s ease-in-out
  &__success
    display: flex
    justify-content: center
    flex-direction: column
    text-align: center
    margin-top: 30vh
    h2
      color: $black
    span
      font-size: 16px
      color: $grey
    img
      object-fit: none
      height: max-content
      margin-bottom: 20px
  &__header
    display: flex
    justify-content: space-between
    > h1
      color: #000
    > button
      color: #000
      font-size: 34px
  &__body
    margin: 24px 0
    button
      font-size: 16px
      background-color: $black
      color: $white
      border-radius: 8px
      padding: 15px 0
      width: 100%
      margin-top: 14px
      transition: .2s ease-in-out
      &:hover
        background-color: $grey
    &--card-empty
      font-size: 22px
    &--stuff
      display: flex
      flex-direction: column
      > h3
        margin-bottom: 16px
        &:nth-of-type(2)
          margin-top: 24px
      form
        input
          width: 100%
          margin: 8px 0
    &--warning
      display: flex
</style>
