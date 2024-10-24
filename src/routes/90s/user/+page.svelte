<script lang="ts">
  import type { Theme } from '$lib/types';
  import themes from '../../../assets/themes.json';
	

	const allThemes: Theme[] = themes.themes;
	let selectedTheme: number | null = null;
	const visitedTheme: number[] = [];

	// Example visited
	visitedTheme.push(0);
	visitedTheme.push(3);
	visitedTheme.push(5);
	visitedTheme.push(14);

	// Fonction appelée lors du clic sur un thème
	function handleClick(index: number) {
		if (visitedTheme.includes(index)) {
			return;
		}
		selectedTheme = index;
		alert(`Clicked on theme index: ${index}`);
		localStorage.setItem('selectedTheme', JSON.stringify(index));
	}
</script>

<section id="user-90s">
	{#if selectedTheme === null}
		<div class="grid-container">
			{#each allThemes as theme, index}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="grid-item {visitedTheme.includes(index) ? 'visited' : ''}" on:click={() => handleClick(index)}>
					{theme.title}
				</div>
			{/each}
		</div>
	<!-- Else -->
	{:else}
		<h1>{allThemes[selectedTheme].title}</h1>

		<p id="current-question">Prêt ?</p>

		<div>
			<span id="chrono"></span>
			<span id="score">0</span>
		</div>
	{/if}
</section>


<style lang="scss">
	.grid-container {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 50px;
		width: 90%;
	}

	.grid-item {
		display: flex;
		align-items: center;
		justify-content: center;
		background-image: linear-gradient(45deg, #466AA4, #7BD5DC);
		font-size: 3.5rem;
		border: 5px solid #ccc;
		padding: 20px;
		cursor: pointer;
		color: #fff;
		font-weight: bold;
		-webkit-text-stroke: 2px black;
		text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
		transition: transform 0.2s;

		&:not(.visited) {
			&:hover {
				transform: scale(1.1);
			}
		}

		&.visited {
			cursor: not-allowed;
			-webkit-text-stroke: 0;
			color: #253857;
			filter: brightness(0.25);
		}
	}
</style>
