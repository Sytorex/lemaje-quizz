<script lang="ts">
    import { finaleCountdown, finaleShowScore, finaleTable, initFinaleTable } from "$lib/stores";
    import FinaleAdminScore from "../../../components/FinaleAdminScore.svelte";

	let cellNumber = 1;
	let chronoInterval: number | undefined;
	let flipInterval: number | undefined;
	let tempTableTimeout: number | undefined;

	function randomizeTable() {
		clearInterval(flipInterval);
		flipInterval = undefined;

		clearTimeout(tempTableTimeout);
		tempTableTimeout = undefined;

		finaleTable.update((table) => {
			table.forEach((cell) => {
				cell.flipped = false;
			});
			return table;
		});
		
		// Wait 0.7 seconds
		setTimeout(() => {
			// Delete finaleTable store
			finaleTable.update(() => {
				return initFinaleTable();
			});
		}, 700);
	
	}

	function flipCell(index: number, isFlipped: boolean | undefined = undefined) {
		return function () {
			finaleTable.update((table) => {
				table[index].flipped = isFlipped ?? !table[index].flipped;
				return table;
			});
		};
	}

	function flipTable(isFlipped: boolean) {
		clearInterval(flipInterval);
		flipInterval = undefined;
		
		let index = 0;
		flipInterval = setInterval(() => {
			if (index >= 30) { // Arrête l'intervalle lorsque toutes les cases sont traitées
				clearInterval(flipInterval);
				flipInterval = undefined;
			} else {
				flipCell(index, isFlipped)();
				index++;
			}
		}, 200);
	}

	function flipTempTable() {
		if (tempTableTimeout) {
			return;
		}
		
		// Flip all cells
		flipTable(true);
		// Wait 10 seconds
		tempTableTimeout = setTimeout(() => {
			clearTimeout(tempTableTimeout);
			tempTableTimeout = undefined;

			// Flip back
			flipTable(false);
		}, 10000);
	}

	function toggleShowScore() {
		finaleShowScore.update((show: boolean) => !show);
	}

	function startCountdown() {
        if (!chronoInterval) {
            chronoInterval = setInterval(() => {
                finaleCountdown.update((n) => {
                    if (n === 0) {
                        clearInterval(chronoInterval);
                        chronoInterval = undefined;
                        return 0;
                    }
                    return n - 1;
                });
            }, 1000);
        }
    }

    function pauseCountdown() {
        clearInterval(chronoInterval);
        chronoInterval = undefined;
    }

    function resetCountdown() {
        pauseCountdown();
        finaleCountdown.set(10);
    }
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
