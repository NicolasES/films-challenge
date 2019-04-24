<template>
    <div id="app" class="bg-secondary"> 
        
        <NavBar></NavBar>
        
        <div class="container-fluid bg-light"> 
            
            <MovieGrid :movies="movies" :genres="genres" class="pt-3"></MovieGrid>
            
            <div class="row" v-show="loadingMovies">
                <div class="col">
                    <div class="alert alert-success" role="alert">
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
        this.scroll()
    },

    data() {
        return {
            movies: [],
            genres: [],
            total_results: 0,
            next_page: 1,
            loadingMovies: false
        }
    },

    methods:{
        scroll() {
            window.onscroll = () => {
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
                if (bottomOfWindow) {
                    this.loadMovies(this.next_page)           
                }
            };
        },

        loadMovies(page) {
            if (this.movies.length >= this.total_results && this.next_page > 1) {
                return
            }
            this.loadingMovies = true
            let url = 'discover/movie?api_key='+API_KEY+'&language=pt-BR&primary_release_date.gte=2019-04-23&page='+page
            this.$http.get(url)
                .then(res => {
                    this.movies = this.movies.concat(res.data.results)
                    this.total_results = res.data.total_results
                    this.next_page++
                    this.loadingMovies = false
                })
        },
        
        loadGenres() {
            let url = 'genre/movie/list?api_key='+API_KEY+'&language=pt-BR'
            this.$http.get(url)
                .then(res => {
                   this.genres = res.data.genres
                })
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.container-fluid {
    max-width: 1250px;
}
</style>
