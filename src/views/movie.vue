<template>
	<div>
		<!-- Hero -->

		<section :style="cssVars" class="et-hero-tabs">
			<h1>{{ movie.original_title }}</h1>
			<h3>
				<span v-for="(genre, index) in movie.genres" :key="index"
					>{{ genre.name }} |</span
				>
				{{ movie.release_date }}
			</h3>
			<div class="et-hero-tabs-container">
				<a class="et-hero-tab" @click="active_tab('details')">Details</a>
				<a class="et-hero-tab" @click="active_tab('videos')">Videos</a>
				<a class="et-hero-tab" @click="active_tab('images')">Images</a>
			</div>
		</section>

		<!-- Main -->
		<main class="movie-details" v-show="detailsIsActive">
			<div class="poster">
				<div slot="media">
					<img :src="posterurl" />
				</div>
			</div>
			<div class="description">
				<h1>{{ movie.original_title }}</h1>
				<h3>{{ movie.overview }}</h3>
			</div>
		</main>
		<main class="movie-videos" v-if="videosIsActive">
			<agile
				class="main"
				ref="main"
				:options="options1"
				:as-nav-for="asNavFor1"
			>
				<div
					class="slide"
					v-for="(slide, index) in slides"
					:key="index"
					:class="`slide--${index}`"
				>
					<div class="thumbnail-image">
						<a class="foobox">
							<img :src="thumbnailsUrl(slide.key)" alt />
						</a>

						<div class="overlay">
							<a class="play-icon foobox">
								<i class="fa fa-play"></i>
							</a>
						</div>
					</div>
				</div>
			</agile>
			<agile
				class="thumbnails"
				ref="thumbnails"
				:options="options2"
				:as-nav-for="asNavFor2"
			>
				<div
					class="slide slide--thumbniail"
					v-for="(slide, index) in slides"
					:key="index"
					:class="`slide--${index}`"
					@click="$refs.thumbnails.goTo(index)"
				>
					<div class="thumbnail-image">
						<a class="foobox">
							<img :src="thumbnailsUrl(slide.key)" alt />
						</a>

						<div class="overlay">
							<a class="play-icon foobox">
								<i class="fa fa-play"></i>
							</a>
						</div>
					</div>
				</div>
				<template slot="prevButton">
					<i class="fas fa-chevron-left"></i>
				</template>
				<template slot="nextButton">
					<i class="fas fa-chevron-right"></i>
				</template>
			</agile>
		</main>
	</div>
</template>

<script>
import { VueAgile } from "vue-agile";

const image = "https://image.tmdb.org/t/p/w1400_and_h450_face/";
const poster = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/";

export default {
	components: {
		agile: VueAgile
	},
	data() {
		return {
			asNavFor1: [],
			asNavFor2: [],
			options1: {
				dots: false,
				fade: true,
				navButtons: false
			},
			options2: {
				autoplay: false,
				autoplaySpeed: 5000,
				centerMode: true,
				dots: false,
				navButtons: false,
				slidesToShow: 5,
				responsive: [
					{
						breakpoint: 600,
						settings: {
							slidesToShow: 5
						}
					},
					{
						breakpoint: 1000,
						settings: {
							navButtons: true
						}
					}
				]
			},
			slides: [],
			movie: {},
			detailsIsActive: true,
			videosIsActive: false,
			imagesIsActive: false
		};
	},
	mounted() {
		this.asNavFor1.push(this.$refs.thumbnails);
		this.asNavFor2.push(this.$refs.main);
	},
	created() {
		this.fetchTodo();
		this.fetchVideos();
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
				.then(data => (this.movie = data))
				.catch(function(error) {
					// handle error
					// custom console
					console.log(error);
				});
		},
		urlPath() {
			return `3/movie/${this.$route.params.id}?api_key=${this.$api}`;
		},
		active_tab(arg) {
			if (arg != "images") {
				this.imagesIsActive = false;
			} else {
				this.imagesIsActive = true;
			}

			if (arg != "videos") {
				this.videosIsActive = false;
			} else {
				this.videosIsActive = true;
			}
			if (arg != "details") {
				this.detailsIsActive = false;
			} else {
				this.detailsIsActive = true;
			}
		},
		fetchVideos() {
			this.$http
				.get(
					`https://api.themoviedb.org/3/movie/${this.$route.params.id}/videos?api_key=${this.$api}&language=en-US
`
				)
				.then(
					response =>
						// handle success
						response.data
				)
				.then(data => {
					data.results.forEach(result => {
						this.slides.push(result);
					});
				})
				.catch(function(error) {
					// handle error
					// custom console
					console.log(error);
				});
		},
		thumbnailsUrl(key) {
			return `https://img.youtube.com/vi/${key}/maxresdefault.jpg`;
		}
	},
	computed: {
		imagePath() {
			return image + this.movie.backdrop_path;
		},
		posterurl() {
			return poster + this.movie.poster_path;
		},
		cssVars() {
			return {
				"--bg-image": `url("${image + this.movie.backdrop_path}")`,
				"--color": "blue"
			};
		}
	}
};
</script>

<style lang="scss">
@import "node_modules/vue-agile/dist/VueAgile";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.1/css/all.min.css");
body {
	font-family: "Century Gothic", "Lato", sans-serif;
}

a {
	text-decoration: none;
}
.et-hero-tabs {
	background: var(--bg-image) center center fixed;
	max-height: 70vh;
	background-repeat: no-repeat;
	background-size: cover;
}
.et-hero-tabs {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	position: relative;
	//	background: #eee;
	text-align: center;
	padding: 0 2em;
	h1 {
		font-size: 2rem;
		margin: 0;
		letter-spacing: 1rem;
		color: rgb(255, 255, 255);
		background: rgb(0, 0, 0); /* fallback color */
		background: rgba(0, 0, 0, 0.7);
		padding: 10px;
	}
	h3 {
		font-size: 1rem;
		letter-spacing: 0.3rem;
		opacity: 0.6;
		color: rgb(255, 255, 255);
		background: rgb(255, 255, 255); /* fallback color */
		background: rgba(0, 0, 0, 0.7);
		padding: 10px;
	}
}

.movie-details {
	display: flex;
	.poster {
		flex-grow: 1;
		padding-top: 5%;
		padding-left: 3%;
		padding-right: 3%;
		padding-bottom: 2%;
		img {
			max-height: 60vh;
		}
	}
	.description {
		padding-top: 5%;
		padding-left: 3%;
		padding-right: 3%;
		padding-bottom: 2%;
		padding-top: 4rem;
		flex-grow: 4;
		text-align: left;
		h1 {
			font-size: 1.5rem;
			padding: 1%;
		}
		h3 {
			font-size: 1rem;
			opacity: 0.6;
			padding: 1%;
		}
	}
}
.et-hero-tabs-container {
	display: flex;
	flex-direction: row;
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 70px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
	background: #fff;
	z-index: 10;
	&--top {
		position: fixed;
		top: 0;
	}
}

.et-hero-tab {
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
	color: #000;
	letter-spacing: 0.1rem;
	transition: all 0.5s ease;
	font-size: 0.8rem;
	&:hover {
		color: white;
		background: rgba(102, 177, 241, 0.8);
		transition: all 0.5s ease;
	}
}

.et-hero-tab-slider {
	position: absolute;
	bottom: 0;
	width: 0;
	height: 6px;
	background: #66b1f1;
	transition: left 0.3s ease;
}

@media (min-width: 800px) {
	.et-hero-tabs,
	.movie-details {
		h1 {
			font-size: 3rem;
		}
		h3 {
			font-size: 1rem;
		}
	}
	.et-hero-tab {
		font-size: 1rem;
	}
}
@media (max-width: 600px) {
	.movie-details {
		flex-wrap: wrap;

		.description {
			text-align: center;
		}
	}
	.et-hero-tab {
		font-size: 1rem;
	}
}
.movie-videos {
	font-family: "Lato", sans-serif;
	font-weight: 300;
	margin: 0 auto;
	max-width: 1200px;
	padding: 30px;
	.thumbnail-image {
		position: relative;
		display: inline-block;
	}
	img {
		vertical-align: top;
		max-width: 1200px;
	}
	.play-icon {
		color: #fff;
		text-align: center;
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		-o-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		border-radius: 50%;
		padding: 20px;
		line-height: 1;
		opacity: 1;
		font-size: 9em;
	}
	.thumbnails {
		.play-icon {
			font-size: 2em;
		}
	}

	.play-icon:hover {
		color: rgb(184, 184, 184);
	}
	@media only screen and (max-width: 400px) {
		.thumbnail-image {
			display: block;
		}
	}
}

.main {
	margin-bottom: 5vh;
}
@media only screen and (max-width: 850px) {
	.main {
		margin-bottom: 10px;
	}
}

.thumbnails {
	margin: 0 -5px;
	width: calc(100% + 10px);
}

// Basic VueAgile styles
.agile {
	&__nav-button {
		background: transparent;
		border: none;
		color: #ccc;
		cursor: pointer;
		font-size: 24px;
		transition-duration: 0.3s;

		.thumbnails & {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);

			&--prev {
				left: -45px;
			}

			&--next {
				right: -45px;
			}
		}

		&:hover {
			color: #888;
		}
	}

	&__dot {
		margin: 0 10px;

		button {
			background-color: #eee;
			border: none;
			border-radius: 50%;
			cursor: pointer;
			display: block;
			height: 10px;
			font-size: 0;
			line-height: 0;
			margin: 0;
			padding: 0;
			transition-duration: 0.3s;
			width: 10px;
		}

		&--current,
		&:hover {
			button {
				background-color: #888;
			}
		}
	}
}

// Slides styles
.slide {
	width: 600px;
	align-items: center;
	box-sizing: border-box;
	color: #fff;
	display: flex;
	justify-content: center;

	&--thumbniail {
		cursor: pointer;
		height: 100px;
		padding: 0 5px;
		transition: opacity 0.3s;

		&:hover {
			opacity: 0.75;
		}
	}

	img {
		height: 100%;
		object-fit: cover;
		object-position: center;
		width: 100%;
	}
}
</style>
