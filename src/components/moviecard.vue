<template>
	<vs-card actionable class="cardx">
		<div slot="media">
			<img :src="imagePath" />
		</div>
		<div>
			<span>
				<h1>{{title}}</h1>
			</span>
		</div>
	</vs-card>
</template>

<script>
const image = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/";
export default {
	name: "movie-card",
	props: ["src", "title"],
	computed: {
		imagePath() {
			return image + this.src;
		}
	}
};
</script>

<style>
</style>