<template>
	<div class="hero">
		<div class="s130">
			<form>
				<div class="inner-form">
					<div class="input-field first-wrap">
						<div class="svg-wrapper">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path
									d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
								/>
							</svg>
						</div>
						<input v-model="search" id="search" type="text" placeholder="Movie name ?" />
					</div>
					<div class="input-field second-wrap">
						<button class="btn-search" type="button" @click="handelSearch">SEARCH</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src

export default {
	name: "home",
	components: {},
	data() {
		return {
			search: ""
		};
	},
	methods: {
		handelSearch() {
			if (this.search === "") return;
			else {
				this.$EventBus.$emit("searchEvent", this.search);
			}
		}
	}
};
</script>
<style >
.hero {
	position: relative;
	background: url(http://www.philippefercha.com/cd/toggle-menu-bg.jpg)
		no-repeat center center fixed;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	background-size: cover;
	text-align: center;
	color: #fff;
	padding-top: 110px;
	min-height: 500px;
	letter-spacing: 2px;
}
.s130 {
	min-height: 100vh;
	display: -ms-flexbox;
	display: flex;
	-ms-flex-pack: center;
	justify-content: center;
	font-family: "Poppins", sans-serif;
	padding: 15px;
}

.s130 form {
	width: 100%;
	max-width: 790px;
	padding-top: 24vh;
}

.s130 form .inner-form {
	display: -ms-flexbox;
	display: flex;
	width: 100%;
	-ms-flex-pack: justify;
	justify-content: space-between;
	-ms-flex-align: center;
	align-items: center;
	box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
	border-radius: 34px;
	overflow: hidden;
	margin-bottom: 30px;
}

.s130 form .inner-form .input-field {
	height: 68px;
}

.s130 form .inner-form .input-field input {
	height: 100%;
	background: transparent;
	border: 0;
	display: block;
	width: 100%;
	padding: 10px 0;
	font-size: 16px;
	color: #000;
}

.s130 form .inner-form .input-field input.placeholder {
	color: #222;
	font-size: 16px;
}

.s130 form .inner-form .input-field input:-moz-placeholder {
	color: #222;
	font-size: 16px;
}

.s130 form .inner-form .input-field input::-webkit-input-placeholder {
	color: #222;
	font-size: 16px;
}

.s130 form .inner-form .input-field input:hover,
.s130 form .inner-form .input-field input:focus {
	box-shadow: none;
	outline: 0;
}

.s130 form .inner-form .input-field.first-wrap {
	-ms-flex-positive: 1;
	flex-grow: 1;
	display: -ms-flexbox;
	display: flex;
	-ms-flex-align: center;
	align-items: center;
	background: #f7f0f0;
}

.s130 form .inner-form .input-field.first-wrap input {
	-ms-flex-positive: 1;
	flex-grow: 1;
}

.s130 form .inner-form .input-field.first-wrap .svg-wrapper {
	min-width: 80px;
	display: -ms-flexbox;
	display: flex;
	-ms-flex-pack: center;
	justify-content: center;
	-ms-flex-align: center;
	align-items: center;
}

.s130 form .inner-form .input-field.first-wrap svg {
	width: 36px;
	height: 36px;
	fill: #222;
}

.s130 form .inner-form .input-field.second-wrap {
	min-width: 216px;
}

.s130 form .inner-form .input-field.second-wrap .btn-search {
	height: 100%;
	width: 100%;
	white-space: nowrap;
	font-size: 16px;
	color: #fff;
	border: 0;
	cursor: pointer;
	position: relative;
	z-index: 0;
	background: #03243f;
	transition: all 0.2s ease-out, color 0.2s ease-out;
	font-weight: 300;
}

.s130 form .inner-form .input-field.second-wrap .btn-search:hover {
	background: #195fc9;
}

.s130 form .inner-form .input-field.second-wrap .btn-search:focus {
	outline: 0;
	box-shadow: none;
}

.s130 form .info {
	font-size: 15px;
	color: #ccc;
	padding-left: 26px;
}

@media screen and (max-width: 992px) {
	.s130 form .inner-form .input-field {
		height: 50px;
	}
}

@media screen and (max-width: 767px) {
	.s130 form .inner-form .input-field.first-wrap .svg-wrapper {
		min-width: 40px;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-pack: center;
		justify-content: center;
		-ms-flex-align: center;
		align-items: center;
		padding: 0 10px;
	}

	.s130 form .inner-form .input-field.first-wrap svg {
		width: 26px;
		height: 26px;
		fill: #222;
	}

	.s130 form .inner-form .input-field.second-wrap {
		min-width: 100px;
	}

	.s130 form .inner-form .input-field.second-wrap .btn-search {
		font-size: 13px;
	}
}

svg:not(:root) {
	overflow: hidden;
}

button,
input,
optgroup,
select,
textarea {
	font-family: sans-serif;
	/* 1 */
	font-size: 100%;
	/* 1 */
	line-height: 1.15;
	/* 1 */
	margin: 0;
	/* 2 */
}

button,
input {
	/* 1 */
	overflow: visible;
}
</style>