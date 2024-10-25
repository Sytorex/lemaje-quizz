<script lang="ts">
	import { allThemes } from '$lib/allTheme';
	import { visitedThemes } from '$lib/stores';

	function cancelVisitedTheme(id: number) {
		visitedThemes.update((themes) => themes.filter((themeId) => themeId !== id));
	}
</script>

<section id="admin-90s">
	<h1>Page administrateur</h1>
	<div>
		<h2>Veuillez sélectionner un thème sur la page utilisateur</h2>

		{#if $visitedThemes.length > 0}
			<h3>Annuler un thème déjà validé</h3>
			<div class="cancel-btn-container">
				{#each allThemes as theme}
					<div class="cancel-btn">
						
						{#if $visitedThemes.includes(theme.id)}
							<button class="btn" on:click={() => cancelVisitedTheme(theme.id)}>Annuler {theme.title}</button>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>
