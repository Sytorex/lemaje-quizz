<script lang="ts">
    import { countdown, currentQuestionIndex, score, selectedTheme, visitedThemes } from '$lib/stores';
    import type { Theme } from '$lib/types';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';

    export let currentTheme: Theme;

    let interval: number | undefined;
    let chronoLastQuestionIndex: number | null = null;

    function startChrono() {
        startCountdown();
    }

    function pauseChrono() {
        pauseCountdown();
        chronoLastQuestionIndex = get(currentQuestionIndex);
        currentQuestionIndex.set(-1);
    }

    function resetChrono() {
        resetCountdown();
        chronoLastQuestionIndex = get(currentQuestionIndex);
        currentQuestionIndex.set(-1);
    }

    function startCountdown() {
        if (!interval) {
            interval = setInterval(() => {
                countdown.update((n) => {
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
        countdown.set(90);
    }


    function incrementScore() {
        score.update((n) => n + 1);
    }

    function decrementScore() {
        if (get(score) == 0) return;
        score.update((n) => n - 1);
    }

    function nextQuestion() {
        const countdownValue = get(countdown);
        if (countdownValue === 0) {
            alert('Temps écoulé');
            return;
        }

        // chronoLastQuestionIndex est l'index de la question si on a reset le chrono
        if (chronoLastQuestionIndex !== null) {
            // On remet l'index de la question à la valeur sauvegardée
            currentQuestionIndex.set(chronoLastQuestionIndex);
            startChrono();
            chronoLastQuestionIndex = null;

            return;
        }

        let index = get(currentQuestionIndex);

        // Si on n'a pas encore sélectionné de question
        if (index === null) {
            startChrono();
            currentQuestionIndex.set(0);
            return;
        }

        if (index < currentTheme.questions.length - 1) {
            const newIndex = index + 1;
            currentQuestionIndex.set(newIndex);
        } else {
            alert('Plus de questions disponibles');
        }
    }

    function previousQuestion() {
        let index = get(currentQuestionIndex);

        if (index === null) {
            alert('Vous n\'avez pas commencé');
            return;
        }

        if (index > 0) {
            const newIndex = index - 1;
            currentQuestionIndex.set(newIndex);
        } else {
            alert('Vous êtes arriver à la première question de ce thème');
        }
    }

    function resetTheme() {
        resetCountdown();
        score.set(0);
        currentQuestionIndex.set(null);
        selectedTheme.set(null);
    }

    function validateTheme() {
        visitedThemes.update((themes) => [...themes, currentTheme.id]);
        resetTheme();
    }

    function cancelTheme() {
        // selectedTheme.set(null);
        resetTheme();
    }

    function handlePress(event: KeyboardEvent) {
        if (event.code === 'ArrowUp') incrementScore();
        else if (event.code === 'ArrowDown') decrementScore();
        else if (event.code === 'Space') nextQuestion();
    }

    onMount(() => {
        let keydown = false;

        function handleKeyup() {
            keydown = false;
        }

        function handleKeydown(event: KeyboardEvent) {
            if (!keydown) {
                keydown = true;
                handlePress(event);
            }
        }

        window.addEventListener('keydown', handleKeydown);
        window.addEventListener('keyup', handleKeyup);

        return () => {
            window.removeEventListener('keydown', handleKeydown);
            window.removeEventListener('keyup', handleKeyup);
            clearInterval(interval);
        };
    });
</script>


<div>
    <h2>Thème choisis: {currentTheme.title}</h2>
    <div class="admin-main-container">
        <div class="admin-navigation">
            <button class="btn" on:click={previousQuestion}>Question précédente</button>
            <!-- <button class="btn" on:click={nextQuestion}>Question suivante</button> -->
        </div>
        <div class="admin-chrono">
            <button class="btn" on:click={pauseChrono}>Mettre en pause le chrono</button>
            <button class="btn" on:click={resetChrono}>Réinitialiser le chrono</button>
            <p>Temps restant: {$countdown} seconde{#if $countdown > 1}s{/if}</p>
        </div>
        <div class="admin-score">
            <button class="btn" on:click={decrementScore}>-1</button>
            <span>Score: {$score}</span>
            <button class="btn" on:click={incrementScore}>+1</button>
        </div>
        <div class="admin-theme-btn">
            <button class="btn" on:click={validateTheme}>Valider le thème</button>
            <button class="btn" on:click={cancelTheme}>Annuler le thème</button>
        </div>
    </div>
</div>

<style>
    p {
        text-align: center;
    }

    .admin-main-container {
        font-size: 2vw;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 2vw;
    }
</style>