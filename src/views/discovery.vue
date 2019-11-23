/* eslint-disable */


<template lang="">
	<div>
		<moviecard src="http://place-puppy.com/2000x2000" title="superman"></moviecard>
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
			data: []
		};
	},
	created: function() {
		this.fetchTodo();
	},
	methods: {
		fetchTodo() {
			this.$http
				.get(`3/movie/550?api_key=${this.$api}`)
				.then(function(response) {
					// handle success
					console.log(response);
				})
				.catch(function(error) {
					// handle error
					// custom console
					console.log(error);
				})
				.finally(function() {
					// always executed
				});
		},
		ts() {
			console.log(this.$api);
		}
	}
};
</script>
<style lang=""></style>
