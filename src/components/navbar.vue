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
				<router-link to="/">
					<vs-navbar-title>
						<img class="navbrand" src="../assets/images/logo.png" />
					</vs-navbar-title>
				</router-link>
			</div>
			<vs-navbar-item index="0">
				<router-link to="/">Home</router-link>
			</vs-navbar-item>
			<vs-navbar-item index="1">
				<router-link to="/discovery">Popular Movies</router-link>
			</vs-navbar-item>
			<vs-navbar-item index="2">
				<router-link to="/trending">Trending</router-link>
			</vs-navbar-item>
			<vs-navbar-item index="3">
				<router-link to="/browse-movies">Browse Movies</router-link>
			</vs-navbar-item>
			<vs-spacer></vs-spacer>

			<div class="searchbox" @click="handelSearch">
				<vs-input v-on:keyup.enter="handelSearch" icon="search" placeholder="Search" v-model="search" />
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
	}),
	methods: {
		handelSearch() {
			if (this.search.trim() === "") return;
			else {
				this.$emit("searchEvent", this.search);
			}
		}
	}
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> parent of 122d37e... pages
@media screen and (max-width: 800px) {
	.searchbox {
		display: flex;
		input {
			width: 50vw;
		}
		justify-content: center;
		align-content: center;
		padding-bottom: 2%;
		padding-left: 0%;
		padding-right: 10%;
	}
}
<<<<<<< HEAD
>>>>>>> parent of 20bc228... Merge pull request #5 from younessaitali/pages
=======
>>>>>>> parent of 122d37e... pages
</style>
