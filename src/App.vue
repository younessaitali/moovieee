/* eslint-disable */

<template>
	<div id="app">
		<navbar v-on:searchEvent="searchhandler"></navbar>
		<vs-breadcrumb
			:items="
   [
     {
       title: 'Dashboard',
       url: 'dashboard'
     },
     {
       title: 'Link 1',
       url: 'link-1'
     },
     {
       title: 'Link 2',
       disabled: true
     },
     {
       title: 'Active',
       active: true
     }
   ]"
			align="center"
			v-show="breadcrumbhandler"
		></vs-breadcrumb>
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
		return {
			breadcrumb: true
		};
	},
	computed: {
		breadcrumbhandler() {
			if (this.$route.name === "home") return false;
			else return true;
		}
	},
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
