<script lang="ts">
    import { finaleTable } from "$lib/stores";
</script>

<div id="black-box">
	<section id="admin-finale">
		<div class="container-table">
			{#each $finaleTable as cell, i}
				<div class="cell {cell}">
					<p>{i + 1}</p>
				</div>
			{/each}
		</div>
	</section>
</div>
