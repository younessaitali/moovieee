<template>
	<div>
		<!-- Hero -->
		<section class="et-hero-tabs">
			<h1>STICKY SLIDER NAV</h1>
			<h3>Sliding content with sticky tab nav</h3>
			<div class="et-hero-tabs-container">
				<a class="et-hero-tab" href="#tab-es6">ES6</a>
				<a class="et-hero-tab" href="#tab-flexbox">Flexbox</a>
				<a class="et-hero-tab" href="#tab-react">React</a>
				<a class="et-hero-tab" href="#tab-angular">Angular</a>
				<a class="et-hero-tab" href="#tab-other">Other</a>
				<span class="et-hero-tab-slider"></span>
			</div>
		</section>

		<!-- Main -->
		<main class="et-main">
			<section class="et-slide" id="tab-es6">
				<h1>ES6</h1>
				<h3>something about es6</h3>
			</section>
			<section class="et-slide" id="tab-flexbox">
				<h1>Flexbox</h1>
				<h3>something about flexbox</h3>
			</section>
			<section class="et-slide" id="tab-react">
				<h1>React</h1>
				<h3>something about react</h3>
			</section>
			<section class="et-slide" id="tab-angular">
				<h1>Angular</h1>
				<h3>something about angular</h3>
			</section>
			<section class="et-slide" id="tab-other">
				<h1>Other</h1>
				<h3>something about other</h3>
			</section>
		</main>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss">
body {
	font-family: "Century Gothic", "Lato", sans-serif;
}

a {
	text-decoration: none;
}

.et-hero-tabs,
.et-slide {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	position: relative;
	background: #eee;
	text-align: center;
	padding: 0 2em;
	h1 {
		font-size: 2rem;
		margin: 0;
		letter-spacing: 1rem;
	}
	h3 {
		font-size: 1rem;
		letter-spacing: 0.3rem;
		opacity: 0.6;
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