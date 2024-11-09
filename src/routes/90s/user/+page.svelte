<script lang="ts">
    import { allThemes } from '$lib/allTheme';
    import { countdown, currentQuestionIndex, score, selectedTheme, visitedThemes } from '$lib/stores';
    import type { Theme } from '$lib/types';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';

    // Animation state variables
    let animateOut = false;
    let animateIn = false;

    let currentQuestion: string = getCurrentQuestion();
    $: if ($currentQuestionIndex !== null) {
        animateOut = true; // Lance l'animation de sortie
    }

    function handleClick(id: number) {
        if ($visitedThemes.includes(id)) return;
		const newSelectedTheme: Theme = allThemes[id];
        selectedTheme.set(newSelectedTheme);
        currentQuestion = getCurrentQuestion();
    }

    // Fonction appelée à la fin de la transition de sortie
    function handleAnimationEnd() {
        if (animateOut) {
            // On change de question après l'animation de sortie
            currentQuestion = getCurrentQuestion();
            
            animateOut = false;
            animateIn = true; // Lance l'animation d'entrée
        } else if (animateIn) {
            animateIn = false; // Animation d'entrée terminée
        }
    }

    function getCurrentQuestion() {
        const activeQuestionIndex = get(currentQuestionIndex);
        if (!$selectedTheme) {
            return 'Thème non trouvé';
        } else if (activeQuestionIndex === null) {
            return 'Prêt ?';
        } else if (activeQuestionIndex < 0) {
            return 'Pause / Reset en cours';
        } else {
            return $selectedTheme.questions[activeQuestionIndex].question;
        }
    }

    onMount(() => {
        animateIn = false;
        animateOut = false;
    });
</script>

<section id="user-90s">
    {#if $selectedTheme === null}
        <div class="theme-container">
            {#each allThemes as theme}
                <button class="theme-item text {$visitedThemes.includes(theme.id) ? 'visited' : ''}" on:click={() => { handleClick(theme.id); }}>
                    {theme.title}
                </button>
            {/each}
        </div>
    {:else}
        <h1 class="text">{$selectedTheme.title}</h1>

        <div class="main-container">
            <div id="current-question">
                {#if $currentQuestionIndex !== null && $currentQuestionIndex >= 0}
                <div class="number-container">
                    <p id="question-number" class="text">N°{$currentQuestionIndex + 1}</p>
                </div>    
                {/if}
                <p class="text {animateOut ? 'out' : ''} {animateIn ? 'in' : ''}" on:transitionend={handleAnimationEnd}>{currentQuestion}</p>
            </div>
    
            <div class="data-container">
                <div id="score"><p>{$score}</p></div>
                <div class="countdown"><p>{$countdown}</p></div>
            </div>
        </div>
    {/if}
</section>

{#if $selectedTheme === null}
    <div id="black-box"></div>
{/if}