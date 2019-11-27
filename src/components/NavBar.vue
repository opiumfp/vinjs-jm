<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="http://vinnytsiajs.org">
        <g-image src="../../assets/images/logo/vinjs19-logo-inline.png" width="150" fit="contain" background="none" />
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mr-auto">
            <b-nav-item v-for="item in $props.navData.items" :key="item.id" :href="item.src" v-if="item.active">{{item.title}}</b-nav-item>
        </b-navbar-nav>
        <b-button variant="outline-success" class="btn my-2 my-sm-0">Tickets</b-button>
    </b-collapse>
  </b-navbar>


</div>
</template>

<script>

export default {
    props: {
        navData: {
        type: Object,
        required: true
        }
    },
    mounted() {
      console.log('this.$props.navData ::: ', this.$props.navData);
    //   debugger
    }
}
</script>

<style scoped lang="scss">
    
</style>
