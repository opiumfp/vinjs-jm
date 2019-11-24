<template>
    <div class="featured-image">
        <g-image
            :src="image"
            class="thumbnail"
        />
    </div>
</template>

<script>
export default {
    props: {
        image: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>

</style>
