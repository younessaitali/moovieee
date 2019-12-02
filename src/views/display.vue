/* eslint-disable */

<template lang="">
	<div class="container">
		<vs-row
  		  vs-align="center"
  		  vs-type="flex" vs-justify="space-around" vs-w="12" >
  			  <vs-col  vs-type="flex" vs-justify="space-around," vs-align="center" vs-w="3" v-for="(movie, index) in movies.results" :key="index" vs-sm="4" vs-xs="12" vs-lg="3" class="item">
					<div class="container">
						<moviecard
							:src="movie.poster_path"
							:title="movie.original_title"
							:id="movie.id"
						></moviecard> 
					</div>
  			  </vs-col>
		</vs-row>

				<span @click="fetchTodo" class="paginationbutton">
					<vs-pagination :total="movies.total_pages" v-model="currentx" :max="10" goto ></vs-pagination>
				</span>
	</div>
</template>
<script>
import moviecard from "../components/moviecard";
export default {
	components: {
		moviecard
	},
	data() {
		return {
			movies: [],
			currentx: 1,
			watch: {
				currentx: function() {
					this.fetchTodo();
				}
			}
		};
	},
	watch: {
		$route() {
			console.log(this.currentx);
			this.currentx = 1;
			this.fetchTodo();
		}
	},
	created() {
		this.fetchTodo();
	},
	methods: {
		fetchTodo() {
			this.$http
				.get(this.urlPath())
				.then(
					response =>
						// handle success
						response.data
				)
				.then(data => (this.movies = data))
				.catch(function(error) {
					// handle error
					// custom console
					console.log(error);
				});
		},
		urlPath() {
			if (this.$route.name === "trending") {
				return `3/trending/movie/week?api_key=${this.$api}&page=${
					this.currentx
				}`;
			}
			if (this.$route.name === "discovery") {
				return `3/discover/movie?sort_by=popularity.desc&page=${
					this.currentx
				}&api_key=${this.$api}`;
			}
			return "";
		}
	}
};
</script>
<style lang="scss" >
.container {
	padding: 2% 5%;
}
.paginationbutton {
}
</style>
