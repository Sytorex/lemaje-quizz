<script lang="ts">
    import type { Theme } from "$lib/types";
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import themes from "../../../assets/themes.json";

    const selectedTheme = writable<Theme | null>(null);
    const score = writable(0);
    let chrono = 0;
    let interval: number | undefined;

    onMount(() => {
        const index = JSON.parse(localStorage.getItem("selectedTheme") || "null");
        const theme: Theme = themes.themes[index];
        if (theme) {
            selectedTheme.set(theme);
        }

        window.addEventListener("storage", (event) => {
        if (event.key === "selectedTheme") {
            selectedTheme.set(JSON.parse(event.newValue || "null"));
        }
        });

        return () => {
        window.removeEventListener("storage", () => {});
        clearInterval(interval);
        };
    });

    function startChrono() {
        interval = setInterval(() => {
            chrono += 1;
        }, 1000);
    }

    function resetChrono() {
        clearInterval(interval);
        chrono = 0;
    }

    function incrementScore() {
        score.update((n) => n + 1);
    }

    function decrementScore() {
        score.update((n) => n - 1);
    }

    function validateTheme() {
        localStorage.removeItem("selectedTheme");
        selectedTheme.set(null);
        resetChrono();
    }

    function cancelTheme() {
        localStorage.removeItem("selectedTheme");
        selectedTheme.set(null);
        resetChrono();
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.code === "Space") {
        alert("Next question");
        }
    }

    onMount(() => {
        window.addEventListener("keydown", handleKeydown);
        return () => {
        window.removeEventListener("keydown", handleKeydown);
        };
    });
</script>

<section id="admin-90s">
    <h1>Admin Page</h1>
    {#if $selectedTheme}
        <div>
            <h2>Selected Theme: {$selectedTheme.title}</h2>
            <div>
                <button on:click={startChrono}>Play Chrono</button>
                <button on:click={resetChrono}>Reset Chrono</button>
                <p>Chrono: {chrono} seconds</p>
            </div>
            <div>
                <button on:click={decrementScore}>-1</button>
                <span>Score: {$score}</span>
                <button on:click={incrementScore}>+1</button>
            </div>
            <div>
                <button on:click={validateTheme}>Validate Theme</button>
                <button on:click={cancelTheme}>Cancel Theme</button>
            </div>
        </div>
    {:else}
        <div>
            <h1>Veuillez sélectionner un thème dans la page utilisateur</h1>

            <h3>Annuler un thème</h3>
            <ul class="multi-column">
                {#each themes.themes as theme}
                    <li>
                        {theme.title} : 
                        <button class="btn" on:click={() => localStorage.setItem("selectedTheme", JSON.stringify(theme))}>Annuler</button>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</section>
