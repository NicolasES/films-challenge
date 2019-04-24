<template>
    <nav class="navbar navbar-dark bg-info sticky-top">
        <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">Próximos lançamentos</span>
            <form class="form-inline">
                <input v-model="search" class="form-control mr-sm-2" type="search" placeholder="Buscar filme" aria-label="Search">
            </form>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            search: ''
        }
    },
    watch: {
        search(){
            this.debouncedGetSearch()
        }
    },
    created: function () {
        this.debouncedGetSearch = this._.debounce(this.getSearch, 500)
    },
    methods: {
        getSearch() {
            this.$emit('newSearch', this.search)
        }
    }
}
</script>

<style scoped>
    nav {
       background-image: linear-gradient(#187e8e, #3aa6b7);
    }
</style>
