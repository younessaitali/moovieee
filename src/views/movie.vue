<template>
	<div>
		<!-- Hero -->

		<section :style="cssVars" class="et-hero-tabs">
			<h1>{{movie.original_title}}</h1>
			<h3>
				<span v-for="(genre, index) in movie.genres" :key="index">{{genre.name}} |</span>
				{{movie.release_date}}
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
				<h1>{{movie.original_title}}</h1>
				<h3>{{movie.overview}}</h3>
			</div>
		</main>
		<main class="movie-videos" v-show="videosIsActive">
			<iframe
				width="560"
				height="315"
				src="https://www.youtube.com/embed/eSLe4HuKuK0"
				frameborder="0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</main>
		<main class="movies-images" v-show="imagesIsActive"></main>
	</div>
</template>

<script>
const image = "https://image.tmdb.org/t/p/w1400_and_h450_face/";
const poster = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/";

export default {
	data() {
		return {
			movie: {},
			detailsIsActive: true,
			videosIsActive: false,
			imagesIsActive: false
		};
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
</style>