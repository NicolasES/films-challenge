<template>
    <div id="movie-grid" class="row bg-light">

        <ModalMovieInfo :movie="selected_movie.movie" :genres="selected_movie.genres"></ModalMovieInfo>

        <MovieCard v-for="(movie, index) in movies"  :key="index" 
            :movie="movie" 
            :genres="getMovieGenres(movie)"
            class="col-6 col-sm-4 col-lg-3 mb-3"
            @movieInfoClick="showModal($event)"
        >
        </MovieCard>

    </div>
</template>

<script>
    import MovieCard from './MovieCard.vue'
    import ModalMovieInfo from './ModalMovieInfo.vue'

export default {
    components: {MovieCard, ModalMovieInfo},
    props: {
        movies: {
            type: Array,
            required: true
        },
        genres: {
            type: Array,
            default: () => []
        }
    },
    data(){
        return {
            selected_movie: {movie:{}, genres:[]}
        }
    },
    methods: {
        getMovieGenres(movie) {
            return this.genres.filter(genre => {
                return movie.genre_ids.indexOf(genre.id) != -1
            })
        },
        showModal(dataEvent) {
            this.selected_movie = dataEvent
            this.$bvModal.show('modal-movie-info')
        }
    }
}
</script>

<style>

</style>
