<template>
    <div id="app" class="bg-secondary"> 

        <NavBar @newSearch="searchText = $event" ></NavBar>
        
        <div class="container-fluid bg-light"> 
            
            <MovieGrid :movies="movies" :genres="genres" class="pt-3"></MovieGrid>
            
            <div class="row" v-show="!movies.length && !loadingMovies">
                <div class="col">
                    <div class="alert alert-danger" role="alert">
                        Nenhum filme encontrado
                    </div>
                </div>
            </div>

            <div class="row" v-show="loadingMovies">
                <div class="col">
                    <div class="alert alert-success" role="alert">
                        <div class="spinner-border text-success" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        Carregando filmes...
                    </div>
                </div>
            </div>
            
        </div>

    </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import MovieGrid from './components/MovieGrid.vue'

const API_KEY = 'c5850ed73901b8d268d0898a8a9d8bff'

export default {
    name: 'app',
    components: {
        NavBar, MovieGrid
    },

    created(){
        this.loadGenres()
        this.loadMovies(1)
        this.scroll(),
        this.$emit('bv::show::modal-movie-info')
    },

    data() {
        return {
            movies: [],
            genres: [],
            total_results: 0,
            next_page: 1,
            loadingMovies: false,
            searchText: ''
        }
    },

    watch: {
        searchText() {
            this.next_page = 1
            this.movies = []
            this.loadMovies(1)
        }
    },

    methods:{
        scroll() {
            window.onscroll = () => {
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight - 1;
                if (bottomOfWindow) {
                    this.loadMovies(this.next_page)           
                }
            };
        },

        loadMovies(page) {
            if ((this.movies.length >= this.total_results && this.next_page > 1) || this.loadingMovies) {
                return
            }

            if (this.searchText) {
                this.searchMovies(this.searchText, page)
            } else {
                this.newMovies(page)
            }
        },
        
        loadGenres() {
            let url = 'genre/movie/list?api_key='+API_KEY+'&language=pt-BR'
            this.$http.get(url)
                .then(res => {
                   this.genres = res.data.genres
                })
        },

        newMovies(page) {
            this.loadingMovies = true
            let url = 'discover/movie'
            let params = {
                api_key: API_KEY,
                language: 'pt-BR',
                "primary_release_date.gte": new Date().toJSON().slice(0,10),
                page: page
            }

            this.$http.get(url, {params})
                .then(res => {
                    this.movies = this.movies.concat(res.data.results)
                    this.total_results = res.data.total_results
                    this.next_page++
                    this.loadingMovies = false
                })
        },

         searchMovies(searchText, page) {
            this.loadingMovies = true
            let url = 'search/movie'
            let params = {
                api_key: API_KEY,
                language: "pt-BR",
                query: searchText,
                primary_release_year: new Date().getFullYear(),
                page: page
            }

            this.$http.get(url, {params})
                .then(res => {
                    this.movies = this.movies.concat(res.data.results)
                    this.total_results = res.data.total_results
                    this.next_page++
                    this.loadingMovies = false
                })
        }
    }
}
</script>

<style>

.container-fluid {
    max-width: 1250px;
}
</style>
