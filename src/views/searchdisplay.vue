<template lang="html">
	<div class="container">
		<div>
			<div class="searchInput">
				<vs-input
					size="normal"
					@click="handelSearch"
					icon="search"
					placeholder="Search"
					v-on:keyup.enter="handelSearch"
					v-model="search"
				/>
			</div>
			<vs-collapse type="margin">
				<vs-collapse-item>
					<div slot="header">
						<h4>Advanced Search</h4>
					</div>
					<div class="selectionMenu">
						<vs-select
							v-model="selectgenr"
							color="primary"
							class="selectExample"
							label="Genre:"
						>
							<vs-select-item
								:key="index"
								:value="item.value"
								:text="item.text"
								v-for="(item, index) in genres"
							/>
						</vs-select>
						<vs-select
							v-model="selectorder"
							color="primary"
							class="selectExample"
							label="Order By:"
						>
							<vs-select-item
								:key="index"
								:value="item.value"
								:text="item.text"
								v-for="(item, index) in options"
							/>
						</vs-select>
					</div>
				</vs-collapse-item>
			</vs-collapse>
		</div>
		<vs-divider icon="watch_later"></vs-divider>

		<vs-row
			vs-align="center"
			vs-type="flex"
			vs-justify="space-around"
			vs-w="12"
		>
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
						:id="movie.id"
					>
					</moviecard>
				</div>
			</vs-col>
		</vs-row>

		<span @click="openLoading" class="paginationbutton">
			<vs-pagination
				:total="movies.total_pages"
				v-model="currentx"
				:max="10"
				v-if="pagination"
				goto
			></vs-pagination>
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
			pagination: false,
			search: "",
			movies: [],
			currentx: 1,
			selectgenr: 0,
			selectorder: "",
			genres: [{ text: "All", value: 0 }],
			options: [
				{ text: "Year", value: "year" },
				{ text: "Rating", value: "rating" }
			],
			watch: {
				currentx: function() {
					this.fetchTodo();
				}
			}
		};
	},
	computed: {
		movieFilter() {
			if (this.selectgenr === 0 && this.selectorder === "")
				return this.movies.results;
			else {
				if (this.selectorder === "year") {
					this.sortByYear();
				}
				if (this.selectorder === "rating") {
					this.sortByRating();
				}
				if (this.selectgenr != 0) {
					return this.movies.results.filter(movie =>
						movie.genre_ids.includes(this.selectgenr)
					);
				} else {
					return this.movies.results;
				}
			}
		}
	},
	created() {
		this.$EventBus.$on("searchEvent", search => {
			alert("yeeey am a life" + search);
		});
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
	},
	methods: {
		openLoading() {
			this.$vs.loading();
			setTimeout(() => {
				this.$vs.loading.close();
			}, 2000);
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
				.then(data => {
					this.movies = data;
					this.pagination = true;
				})
				.catch(function(error) {
					// handle error
					// custom console
					console.log(error);
				});
		},
		urlPath() {
			const key = this.$route.params.keys.replace(/_/g, "%20");
			console.log(key);
			return `3/search/movie?api_key=${
				this.$api
			}&language=en-US&query=${key}&page=${
				this.currentx
			}&include_adult=false`;
		},
		handelSearch() {
			if (this.search.trim() === "") return;
			else {
				const key = this.search.trim().replace(/_/g, "%20");
				const url = `3/search/movie?api_key=${
					this.$api
				}&language=en-US&query=${key}&page=${
					this.currentx
				}&include_adult=false`;
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
		},
		sortByYear() {
			this.movies.results.sort(function(a, b) {
				// Turn your strings into dates, and then subtract them
				// to get a value that is either negative, positive, or zero.
				return new Date(b.release_date) - new Date(a.release_date);
			});
		},
		sortByRating() {
			this.movies.results.sort(function(a, b) {
				return b.vote_average - a.vote_average;
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
h4 {
	color: rgb(78, 81, 83);
}
</style>
