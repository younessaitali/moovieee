<template  lang="html">
	<div class="container">
		<div>
                        <div class="searchInput">
                            <vs-input size="normal"  icon="search" placeholder="Search" v-model="search"/>
    
                    </div>
			<vs-collapse>
				<vs-collapse-item>
        
				<div class="selectionMenu">
                            <vs-select color="primary" class="selectExample" label="Genre:" >
                                <vs-select-item
                                    :key="index"
                                    :value="item.value"
                                    :text="item.text"
                                    v-for="(item,index) in options1"
                                />
                            </vs-select>
                            <vs-select color="primary" class="selectExample" label="Rating:" >
                                <vs-select-item
                                    :key="index"
                                    :value="item.value"
                                    :text="item.text"
                                    v-for="(item,index) in options1"
                                />
                            </vs-select>
                            <vs-select color="primary" class="selectExample" label="Order By:" >
                                <vs-select-item
                                    :key="index"
                                    :value="item.value"
                                    :text="item.text"
                                    v-for="(item,index) in options2"
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
				v-for="(movie, index) in movies.results"
				:key="index"
				vs-sm="4"
				vs-xs="12"
				vs-lg="3"
				class="item"
			>
				<div class="container">
					<moviecard 
					:src="movie.backdrop_path" 
					:title="movie.original_title" 
					:id="movie.id">
					</moviecard>
				</div>
			</vs-col>
		</vs-row>

		<span @click="fetchTodo" class="paginationbutton">
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
			currentx: 1,
			options1: [
				{ text: "Square", value: 1 },
				{ text: "Rectangle", value: 2 },
				{ text: "Rombo", value: 3 },
				{ text: "Romboid", value: 4 },
				{ text: "Trapeze", value: 5 },
				{ text: "Triangle", value: 6 },
				{ text: "Polygon", value: 7 },
				{ text: "Regular polygon", value: 8 },
				{ text: "Circumference", value: 9 },
				{ text: "Circle", value: 10 },
				{ text: "Circular sector", value: 11 },
				{ text: "Circular trapeze", value: 12 }
			],
			options2: [
				{ text: "Primary", value: "primary" },
				{ text: "Success", value: "success" },
				{ text: "Danger", value: "danger" },
				{ text: "Warning", value: "warning" },
				{ text: "Dark", value: "dark" }
			]
		};
	},
	created() {
		this.$EventBus.$on("searchEvent", search => {
			alert("yeeey am a life" + search);
		});
		this.fetchTodo();
	},
	beforeUpdate() {
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
			return `3/discover/movie?sort_by=revenue.desc&page=${
				this.currentx
			}&api_key=${this.$api}`;
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