<script lang="ts">
    import { finaleTable } from "$lib/stores";

	function randomizeTable() {
		// Delete finaleTable store
		finaleTable.update(() => {
			return [];
		});
	}
</script>

<section id="admin-finale">
	<h1>Page administrateur</h1>
	<div>
		<div>
			<h2>Veuillez sélectionner une case pour annuler ou retourner</h2>
			<!-- Svelte input -->
			<input type="number" name="cell-number" value="1" />
			<button type="submit">Valider</button>
		</div>

		<button class="btn" on:click={() => randomizeTable() }>Mélanger le tableau</button>				
	
		
	</div>
</section>
