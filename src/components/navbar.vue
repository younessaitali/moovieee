<template>
	<div>
		<vs-navbar
			v-model="activeItem"
			color="dark"
			text-color="rgba(255,255,255,.6)"
			active-text-color="rgba(255,255,255,1)"
			class="nabarx"
		>
			<div slot="title">
				<vs-navbar-title>
					<img class="navbrand" src="../assets/images/logo.png" />
				</vs-navbar-title>
			</div>
			<vs-navbar-item index="0">
				<router-link to="/">Home</router-link>
			</vs-navbar-item>
			<vs-navbar-item index="1">
				<router-link to="/discovery">Discovery</router-link>
			</vs-navbar-item>
			<vs-navbar-item index="2">
				<router-link to="/trending">Trending</router-link>
			</vs-navbar-item>
			<vs-spacer></vs-spacer>

			<div class="searchbox">
				<vs-input icon="search" placeholder="Search" v-model="search" />
			</div>
		</vs-navbar>
	</div>
</template>
<script>
export default {
	name: "navBar",
	data: () => ({
		activeItem: 0,
		search: ""
	})
};
</script>
<style lang="scss">
.navbrand {
	max-height: 60px;
	width: auto;
}
.searchbox {
	padding-left: 2%;
	padding-right: 3%;
}
</style>
