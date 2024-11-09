<script lang="ts">
    import { finaleCountdown, finaleScore, finaleShowScore, finaleTable } from "$lib/stores";
    import { scoreColors } from "$lib/types";
    import Cell from "../../../components/Cell.svelte";

	function flipCell(index: number) {
		return function () {
			finaleTable.update((table) => {
				table[index].flipped = true;
				return table;
			});
		};
	}

	// Map french colors to english colors for blue, red, yell
	const colorMap: Record<string, string> = {
		"bleu": "blue",
		"rouge": "red",
		"jaune": "yellow"
	};
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

<div class="external-data-container">
	<div id="finale-scores" style="display: {$finaleShowScore ? 'flex' : 'none'}">
		{#each scoreColors as color, i}
			<div class="score bg-{colorMap[color]}">
				<p>{$finaleScore[i]}</p>
			</div>
		{/each}
	</div>
	<div class="countdown"><p>{$finaleCountdown}</p></div>
</div>