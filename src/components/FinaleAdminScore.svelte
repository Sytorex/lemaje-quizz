<script lang="ts">
    import { finaleScore } from '$lib/stores';
    import { scoreColors } from '$lib/types';
    import { get } from 'svelte/store';

    function incrementScore(index: number) {
        return function () {
            finaleScore.update((scores) => {
                scores[index] += 1;
                return scores;
            });
        };
    }

    function decrementScore(index: number) {
        return function () {
            if (get(finaleScore)[index] == 0) return;
            finaleScore.update((scores) => {
                scores[index] -= 1;
                return scores;
            });
        };
    }
</script>

{#each scoreColors as color, i}
    <div class="admin-score">
        <button class="btn" on:click={decrementScore(i)}>-1</button>
        <span>Score {color}: {$finaleScore[i]}</span>
        <button class="btn" on:click={incrementScore(i)}>+1</button>
    </div>
{/each}