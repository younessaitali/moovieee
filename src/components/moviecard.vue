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
export default {
	name: "movie-card",
	props: ["src", "title"],
	computed: {
		imagePath: function() {
			return this.src;
		}
	}
};
</script>

<style>
</style>