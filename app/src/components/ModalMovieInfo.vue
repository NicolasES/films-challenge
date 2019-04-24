<template>
    <b-modal id="modal-movie-info" :title="movie.title" size="xl" :hide-footer="true">
        <div class="container-fluid">
            <div class="row">

                <!-- POSTER -->
                <div class="col-12 col-lg-4 mb-4">
                    <img class="img-fluid mx-auto d-block" v-if="movie.poster_path" :src="poster">
                </div>
                
                <div class="col-12 col-lg-8">

                    <!-- INFO -->
                    <div class="row">
                        <div class="col-12 col-lg">
                            <div class="row">
                                <div class="col mb-2">
                                    <strong>Titulo:</strong>
                                <br/>
                                    {{ movie.title }}
                                </div>
                            </div>

                            <div class="row">
                                <div class="col mb-2">
                                    <strong>Genero:</strong>
                                <br/>
                                    <ul class="list-inline mb-0">
                                        <template v-for="(genre, index) in genres">
                                            <li :key="index" class="list-inline-item">
                                            {{ genre.name }}
                                            </li>
                                        </template>
                                    </ul>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col mb-2">
                                    <strong>Data de lançamento:</strong>
                                <br/>
                                    {{ movie.release_date | moment("DD/MM/YYYY") }}
                                </div>
                            </div>

                        </div>
                      
                        <!-- BACKDROP IMG -->
                        <div class="col-12 col-lg">
                            <div class="row">
                                <img class="img-fluid" v-if="movie.backdrop_path" :src="backdropImg">
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col mb-2">
                            <strong>Visão geral:</strong>
                            <br/>
                            {{ movie.overview || 'Sem detalhes no momento'}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </b-modal>
</template>

<script>
export default {
    props: {
        movie: {
            type: Object,
            default: () => {}
        },
        genres: {
            type: Array,
            default: () => []
        }
    },

    computed: {
        poster() {
            return 'http://image.tmdb.org/t/p/w300'+this.movie.poster_path
        },
        
        backdropImg(){
            return 'http://image.tmdb.org/t/p/w300'+this.movie.backdrop_path
        }
    }
}
</script>

<style>

</style>
