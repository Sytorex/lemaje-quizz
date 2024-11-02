<script lang="ts">
    import { finaleCountdown, finaleShowScore, finaleTable, initFinaleTable } from "$lib/stores";
    import FinaleAdminScore from "../../../components/FinaleAdminScore.svelte";

	function randomizeTable() {
		flipTable(false);
		
		// Wait 0.7 seconds
		setTimeout(() => {
			// Delete finaleTable store
			finaleTable.update(() => {
				return initFinaleTable();
			});
			console.log("Tableau réinitialisé");
		}, 700);
	
	}

	function flipCell(index: number) {
		return function () {
			finaleTable.update((table) => {
				table[index].flipped = !table[index].flipped;
				return table;
			});
		};
	}

	function flipTable(isFlipped: boolean) {
		finaleTable.update((table) => {
			table.forEach((cell) => {
				cell.flipped = isFlipped;
			});
			return table;
		});
	}

	function flipTempTable() {
		// Flip all cells
		flipTable(true);
		// Wait 10 seconds
		setTimeout(() => {
			// Flip back
			flipTable(false);
		}, 10000);
	}

	function toggleShowScore() {
		finaleShowScore.update((show: boolean) => !show);
	}

	function startCountdown() {
        if (!interval) {
            interval = setInterval(() => {
                finaleCountdown.update((n) => {
                    if (n === 0) {
                        clearInterval(interval);
                        interval = undefined;
                        return 0;
                    }
                    return n - 1;
                });
            }, 1000);
        }
    }

    function pauseCountdown() {
        clearInterval(interval);
        interval = undefined;
    }

    function resetCountdown() {
        pauseCountdown();
        finaleCountdown.set(90);
    }

	let cellNumber = 1;
	let interval: number | undefined;
</script>

<section id="admin-finale">
	<h1>Page administrateur</h1>
	<div>
		<div>
			<h2>Veuillez sélectionner une case pour la retourner ou la cacher</h2>
			<input type="number" bind:value={cellNumber} name="cell-number" min="1" max="30" />
			<button class="btn" on:click={() => flipCell(cellNumber - 1)() }>{$finaleTable[cellNumber - 1].flipped ? 'Cacher' : 'Retourner'}</button>
		</div>

		<button class="btn" on:click={() => randomizeTable() }>Mélanger le tableau</button>				
		<button class="btn" on:click={() => flipTempTable() }>Afficher toutes les cases pendant 10 secondes</button>

		<FinaleAdminScore />

		<div class="admin-chrono">
			<button class="btn" on:click={startCountdown}>Démarrer le chrono</button>
            <button class="btn" on:click={pauseCountdown}>Mettre en pause le chrono</button>
            <button class="btn" on:click={resetCountdown}>Réinitialiser le chrono</button>
            <p>Temps restant: {$finaleCountdown} seconde{#if $finaleCountdown > 1}s{/if}</p>
        </div>

		<button class="btn" on:click={() => toggleShowScore() }>{$finaleShowScore ? 'Cacher' : 'Afficher'} le score</button>
	</div>
</section>
