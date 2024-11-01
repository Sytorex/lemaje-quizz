<script lang="ts">
    import { finaleTable } from "$lib/stores";
    import Cell from "../../../components/Cell.svelte";

	function flipCell(index: number) {
		return function () {
			finaleTable.update((table) => {
				table[index].flipped = !table[index].flipped;
				return table;
			});
		};
	}
</script>

<div class="black-box">
	<section id="admin-finale">
		<div class="container-table">
			{#each $finaleTable as cell, i}
				<button class="flip-container" on:click={flipCell(i)}>
					<div class="flipper" class:flipped={cell.flipped}>
						<div class="front">
							<Cell text={i + 1} />
						</div>
						<div class="back bg-{cell.color}">
							<Cell text={i + 1} />
						</div>
					</div>
				</button>
			{/each}
		</div>
	</section>
</div>