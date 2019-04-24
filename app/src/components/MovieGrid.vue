<template>
    <div id="movie-grid" class="row bg-light">

        <MovieCard v-for="(movie, index) in movies"  :key="index" 
            :movie="movie" 
            :genres="genres"
            class="col-6 col-sm-4 col-lg-3 mb-3"
        >
        </MovieCard>

    </div>
</template>

<script>
    import MovieCard from './MovieCard.vue'

export default {
    components: {MovieCard},
    props: {
        movies: {
            type: Array,
            required: true
        },
        genres: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<style>

</style>
