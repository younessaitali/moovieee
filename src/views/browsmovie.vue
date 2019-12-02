<template  lang="html">
	<div class="container">
		<div>
                        <div class="searchInput">
                            <vs-input 
							size="normal"
							icon="search"
							placeholder="Search"
							v-model="search"
							@click="handelSearch"
							v-on:keyup.enter="handelSearch"/>
    
                    </div>
			<vs-collapse>
				<vs-collapse-item>
						<div slot="header">
						Advanced Search
					</div>
				<div class="selectionMenu">
                            <vs-select color="primary" v-model="genremodel" class="selectExample" label="Genre:" >
                                <vs-select-item
                                    :key="index"
                                    :value="item.value"
                                    :text="item.text"
                                    v-for="(item,index) in genres"
                                />
                            </vs-select>
                            <vs-select color="primary" v-model="ratingmodel" class="selectExample" label="Rating:" >
                                <vs-select-item
                                    :key="index"
                                    :value="item.value"
                                    :text="item.text"
                                    v-for="(item,index) in rating"
                                />
                            </vs-select>
                            <vs-select color="primary" v-model="sortmodel" class="selectExample" label="Sort By:" >
                                <vs-select-item
                                    :key="index"
                                    :value="item.value"
                                    :text="item.text"
                                    v-for="(item,index) in sort"
                                />
                            </vs-select>
                </div>
					
				</vs-collapse-item>
			</vs-collapse>
		</div>
		<vs-divider icon="watch_later"></vs-divider>

		<vs-row vs-align="center" vs-type="flex" vs-justify="space-around" vs-w="12">
			<vs-col
				vs-type="flex"
				vs-justify="space-around,"
				vs-align="center"
				vs-w="3"
				v-for="(movie, index) in movieFilter"
				:key="index"
				vs-sm="4"
				vs-xs="12"
				vs-lg="3"
				class="item"
			>
				<div class="container">
					<moviecard 
					:src="movie.poster_path" 
					:title="movie.original_title" 
					:id="movie.id">
					</moviecard>
				</div>
			</vs-col>
		</vs-row>

		<span @click="openLoading" class="paginationbutton">
			<vs-pagination :total="movies.total_pages" v-model="currentx" :max="10" goto></vs-pagination>
		</span>
	</div>
</template>

<script>
import moviecard from "../components/moviecard";

export default {
	name: "search",
	components: { moviecard },
	data() {
		return {
			search: "",
			movies: [],
			sortmodel: "popular",
			genremodel: 0,
			ratingmodel: 0,
			currentx: 1,
			genres: [{ text: "All", value: 0 }],
			sort: [
				{ text: "Popular", value: "popular" },
				{ text: "Rating", value: "rating" },
				{ text: "Year", value: "year" },
				{ text: "Revenue", value: "revenue" }
			],
			rating: [{ text: "All", value: 0 }],
			watch: {
				currentx: function() {
					this.fetchTodo();
				}
			}
		};
	},
	computed: {
		movieFilter() {
			if (
				!(
					this.sortmodel === "popular" &&
					this.genremodel === 0 &&
					this.ratingmodel === 0
				)
			) {
				let str = "";
				if (this.ratingmodel != 0)
					str += `&vote_count.gte=${this.ratingmodel}`;
				if (this.genremodel != 0)
					str += `&with_genres=${this.genremodel}`;
				if (this.sortmodel != "popular") {
					if (this.sortmodel === "rating")
						str += "&sort_by=vote_count.desc";
					else if (this.sortmodel === "year")
						str += "&sort_by=release_date.desc";
					else if (this.sortmodel === "revenue")
						str += "&sort_by=revenue.desc";
				}
				this.filter(str);
				return this.movies.results;
			} else {
				this.fetchTodo();
				return this.movies.results;
			}
		}
	},
	created() {
		this.fetchTodo();
	},
	mounted() {
		//* to fill genres array from api
		const url = `3/genre/movie/list?api_key=${this.$api}&language=en-US`;
		this.$http
			.get(url)
			.then(
				response =>
					// handle success
					response.data.genres
			)
			.then(data => {
				console.log(data);
				data.forEach(genre => {
					let inputt = new Object();
					inputt.text = genre.name;
					inputt.value = genre.id;
					this.genres.push(inputt);
				});
			})
			.catch(function(error) {
				// handle error
				// custom console
				console.log(error);
			});
		for (let i = 1; i < 10; i++) {
			let inputtt = new Object();
			inputtt.text = `+${i}`;
			inputtt.value = i;
			this.rating.push(inputtt);
		}
	},

	methods: {
		openLoading() {
			this.$vs.loading();
			setTimeout(() => {
				this.$vs.loading.close();
			}, 1000);
			this.fetchTodo();
		},
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
			return `https://api.themoviedb.org/3/discover/movie?api_key=${
				this.$api
			}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${
				this.currentx
			}`;
		},
		handelSearch() {
			if (this.search.trim() === "") return;
			else {
				this.$emit("searchEvent", this.search);
			}
		},
		filter(str) {
			let url = `https://api.themoviedb.org/3/discover/movie?api_key=${
				this.$api
			}&language=en-US&include_adult=false&include_video=false&page=${
				this.currentx
			}${str}`;
			this.$http
				.get(url)
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
		}
	}
};
</script>

<style lang="scss">
.selectionMenu {
	display: flex;
	justify-content: space-around;
	padding: 2% 2%;
}
.searchInput {
	display: flex;
	justify-content: center;
	align-content: center;
	padding-top: 2%;
	padding-right: 30%;
	input {
		width: 50vw;
		min-width: 250px;
		align-content: center;
	}
}
</style>