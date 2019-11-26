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
				<a class="et-hero-tab">ES6</a>
				<a class="et-hero-tab">Flexbox</a>
				<a class="et-hero-tab">React</a>
				<a class="et-hero-tab">Angular</a>
				<a class="et-hero-tab">Other</a>
			</div>
		</section>

		<!-- Main -->
		<main class="et-main">
			<section class="et-slide" id="tab-es6">
				<div class="poster">
					<vs-images :hover="blur">
						<vs-image :src="`https://picsum.photos/400/400?image=35`" />
					</vs-images>
				</div>
				<div class="description">
					<h1>ES6</h1>
					<h3>something about es6</h3>
				</div>
			</section>
		</main>
	</div>
</template>

<script>
const image = "https://image.tmdb.org/t/p/w1400_and_h450_face/";
const poster = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/";

export default {
	data() {
		return {
			movie: {}
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
.et-slide {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: lightslategray;
	height: 93vh;

	text-align: center;
	padding: 0 2em;
	.description {
		flex-grow: 1;
		h1 {
			font-size: 2rem;
			margin: 0;
			letter-spacing: 1rem;
			color: rgb(255, 255, 255);
		}
		h3 {
			font-size: 1rem;
			letter-spacing: 0.3rem;
			opacity: 0.6;
			color: rgb(255, 255, 255);
		}
	}
	.poster {
		flex-grow: 1;

		.vs-image--img {
			min-width: 100%;
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
	.et-slide {
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
</style>