<template>
    <div class="movie-card">
        <div class="card h-100">
            <img :src="'http://image.tmdb.org/t/p/w300'+movie.poster_path" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">{{ movie.title }}</h5>
                <p class="card-text" v-if="genres.length">
                    Genero:<br/>
                    
                    <ul class="list-inline">
                        <template v-for="(genre, index) in genres">
                            <li :key="index" class="list-inline-item">
                                <small   class="text-muted">{{ genre.name }}</small>
                            </li>
                        </template>
                    </ul>
                </p>

                <p class="card-text">
                    Data de lançamento:<br/>
                    <small class="text-muted">{{ movie.release_date | moment("DD/MM/YYYY") }}</small>
                </p>
                <a href="#" class="btn btn-info btn-sm">Detalhes</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        movie: {
            type: Object,
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
