<template>
  <div class="product product--card">
    <div class="product__img product__img--card">
      <img
        v-if="showImg"
        :src="'https://frontend-test.idaproject.com' + product.photo"
      />
      <img v-else src="~/assets/Rolling.svg" />
    </div>
    <div>
      <div class="product__title">
        {{ product.name }}
      </div>
      <div class="product__price" style="margin-top: 5px">
        {{ new Intl.NumberFormat("ru-RU").format(product.price) }} ₽
      </div>
      <div class="product__popular" style="margin-top: 10px">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
        >
          <defs>
            <linearGradient
              x1="0"
              x2="0"
              y1="1"
              y2="0"
              :id="'half_grad' + product.id"
            >
              <stop
                :offset="getRating(product.rating) + '%'"
                stop-color="#F2C94C"
              />
              <stop
                :offset="getRating(product.rating) + '%'"
                stop-color="white"
                stop-opacity="0"
              />
            </linearGradient>
          </defs>
          <path
            d="M6.5 11L4 8H8.5L10 5L12 8H16L13.5 11L13 15L10 13.5L6.5 15V11Z"
            :fill="'url(#half_grad' + product.id + ')'"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10 3.125C10.2379 3.125 10.4552 3.26005 10.5605 3.47336L12.3464 7.09154L16.3404 7.67532C16.5758 7.70972 16.7712 7.87473 16.8445 8.10098C16.9179 8.32723 16.8565 8.57552 16.6861 8.74147L13.7966 11.5559L14.4785 15.5318C14.5187 15.7663 14.4223 16.0033 14.2299 16.1432C14.0374 16.283 13.7822 16.3014 13.5716 16.1907L10 14.3124L6.42843 16.1907C6.21785 16.3014 5.96267 16.283 5.77018 16.1432C5.5777 16.0033 5.48129 15.7663 5.52151 15.5318L6.20344 11.5559L3.31394 8.74147C3.14355 8.57552 3.08213 8.32723 3.15549 8.10098C3.22885 7.87473 3.42428 7.70972 3.65963 7.67532L7.6536 7.09154L9.43958 3.47336C9.54487 3.26005 9.76213 3.125 10 3.125ZM10 5.16203L8.62921 7.93914C8.53825 8.12342 8.36251 8.25121 8.15916 8.28093L5.09278 8.72913L7.3111 10.8898C7.45852 11.0334 7.52581 11.2403 7.49102 11.4432L6.96763 14.4948L9.70911 13.0531C9.89122 12.9573 10.1088 12.9573 10.2909 13.0531L13.0324 14.4948L12.509 11.4432C12.4742 11.2403 12.5415 11.0334 12.6889 10.8898L14.9073 8.72913L11.8409 8.28093C11.6375 8.25121 11.4618 8.12342 11.3708 7.93914L10 5.16203Z"
            fill="#F2C94C"
          />
        </svg>
        {{ product.rating }}
      </div>
    </div>
    <button @click="removeProduct(product.id)" class="product__trash">
      <svg
        width="20"
        height="22"
        viewBox="0 0 20 22"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 5C0 4.44772 0.447715 4 1 4H19C19.5523 4 20 4.44772 20 5C20 5.55228 19.5523 6 19 6H1C0.447715 6 0 5.55228 0 5Z"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H13V3C13 2.73478 12.8946 2.48043 12.7071 2.29289C12.5196 2.10536 12.2652 2 12 2H8ZM15 4V3C15 2.20435 14.6839 1.44129 14.1213 0.87868C13.5587 0.31607 12.7956 0 12 0H8C7.20435 0 6.44129 0.31607 5.87868 0.87868C5.31607 1.44129 5 2.20435 5 3V4H3C2.44772 4 2 4.44772 2 5V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H15C15.7957 22 16.5587 21.6839 17.1213 21.1213C17.6839 20.5587 18 19.7957 18 19V5C18 4.44772 17.5523 4 17 4H15ZM4 6V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H15C15.2652 20 15.5196 19.8946 15.7071 19.7071C15.8946 19.5196 16 19.2652 16 19V6H4Z"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 9C8.55228 9 9 9.44772 9 10V16C9 16.5523 8.55228 17 8 17C7.44772 17 7 16.5523 7 16V10C7 9.44772 7.44772 9 8 9Z"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 9C12.5523 9 13 9.44772 13 10V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V10C11 9.44772 11.4477 9 12 9Z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      showImg: false
    };
  },
  props: {
    product: Object
  },
  methods: {
    ...mapMutations("card", ["addProduct", "removeProduct"]),
    getRating(rating) {
      return (rating * 100) / 5;
    }
  },
  mounted() {
    let img = new Image();
    img.src = "https://frontend-test.idaproject.com" + this.product.photo;
    img.onload = () => {
      this.showImg = true;
    };
  }
};
</script>

<style lang="sass" scope>
@import "~/assets/sass/_vars"
.product
	&--card
		margin-left: 0
		width: 100%
		display: flex
	&__trash
		width: 15%
		display: flex
		justify-content: center
		align-items: center
		fill: $grey-light
		transition: .2s ease-in-out
		margin-left: auto
		&:hover
			fill: $black
.product__img--card
	width: 35%
</style>
