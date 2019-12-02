/* eslint-disable */

<template>
	<div id="app">
		<navbar v-on:searchEvent="searchhandler"></navbar>

		<!-- <div id="nav">
			<router-link to="/">Home</router-link>
		</div>-->
		<router-view v-on:searchEvent="searchhandler" />
	</div>
</template>
<script>
import "material-icons/iconfont/material-icons.css";
import navbar from "./components/navbar";
export default {
	components: {
		navbar
	},
	data() {
		return {};
	},
	computed: {},
	methods: {
		searchhandler(search) {
			// this.$on("searchEvent", search => {
			const key = search.trim().replace(/ /g, "_");
			console.log("work" + key);
			this.$router.push({ name: "search", params: { keys: key } });

			// });
		}
	}
};
</script>
<style lang="scss">
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	background-color: #00050aec;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
