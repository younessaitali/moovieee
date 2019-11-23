/* eslint-disable */

<template>
	<div id="app">
		<navbar></navbar>
		<!-- <div id="nav">
			<router-link to="/">Home</router-link>
		</div>-->
		<router-view />
	</div>
</template>
<script>
import "material-icons/iconfont/material-icons.css";
import navbar from "./components/navbar";
export default {
	components: {
		navbar
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
