<template>
  <div class="pricing">
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div
          v-for="item in data.items"
          :key="item.id"
          class="col-md-6"
          :class="(`col-lg-${( data.col ?  (12/parseInt(data.col)) : '4' )}`)"
        >
          <div
            class="pricing_item text-center mb-4 mb-lg-0"
            :class="(`pricing_item-${( item.status )}`)"
          >
            <div v-if="item.title" class="pricing_item_title h5 text-white py-2">
              <span>{{ item.title }}</span>
            </div>
            <div v-if="item.price" class="pricing_item_price display-4 py-4">
              <span>{{ item.price }}</span>
              <span>{{ data.currency }}</span>
            </div>
            <div v-if="item.caption" class="pricing_item_caption mx-4 py-2">
              <span>{{ item.caption }}</span>
            </div>
            <div v-if="item.btnLabel" class="pricing_item_btn text-center py-4">
              <a :href="item.btnSrc" class="btn btn-primary my-2 my-sm-0">{{ item.btnLabel }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pricingData: {
      type: Object,
      required: true
    }
  },
  mounted() {
    // debugger
  },
  computed: {
    data() {
      return this.$props.pricingData;
    }
  }
};
</script>

<style scoped lang="scss">
@import "assets/styles/base.scss";

$boder-color: lighten($dark, 70%);
$boder-color-active: lighten($vjs-green, 0%);

.pricing {
  &_item {
    position: relative;
    border: 1px solid $boder-color;
    @include transition(background-color linear 0.15s);
    &:hover {
      background-color: lighten($boder-color, 10%);
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-image: url("../../assets/images/misc/grid_stripes_horizontal.png");
      opacity: 0.15;
      z-index: 0;
    }
    &_title,
    &_price,
    &_caption,
    &_btn {
      position: relative;
      z-index: 1;
    }

    &_title {
      background-color: lighten($dark, 30%);
      margin: 0 -1px;
    }
    &_caption {
      border-top: 1px solid $boder-color;
      border-bottom: 1px solid $boder-color;
    }
    &-active {
      border-color: $boder-color-active;
      background-color: lighten($boder-color-active, 70%);
      &:hover {
        background-color: lighten($boder-color-active, 67%);
      }
    }
    &-active > & {
      &_title {
        background-color: $boder-color-active;
      }
      &_price {
        padding: 3.75rem 0 !important;
      }
      &_caption {
        border-top-color: $boder-color-active;
        border-bottom-color: $boder-color-active;
      }
    }
    &-sold {
      opacity: 0.4;
    }
  }
  @include media-breakpoint-down(lg) {
  }
}
</style>
