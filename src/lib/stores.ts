import { writable } from 'svelte/store';
import type { FinaleCell, Theme } from './types';

// Fonction pour créer un store synchronisé avec le localStorage
function createLocalStorageStore<T>(key: string, initialValue: T) {
    // Vérifie si `localStorage` est disponible (côté client)
    const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

    const storedValue = isBrowser ? localStorage.getItem(key) : null;
    const store = writable<T>(storedValue ? JSON.parse(storedValue) : initialValue);

    // Sauvegarde la nouvelle valeur dans le localStorage à chaque mise à jour
    if (isBrowser) {
        store.subscribe((value) => {
            if (value === null || value === undefined) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, JSON.stringify(value));
            }
        });

        // Écouteur d'événement 'storage' pour synchroniser les stores quand localStorage est modifié dans d'autres onglets
        window.addEventListener('storage', (event) => {
            if (event.key === key) {
                const storeNewValue = (event.newValue) ? JSON.parse(event.newValue) : initialValue;
                store.set(storeNewValue);
            }
        });
    }

    return store;
}

export function initFinaleTable() {
    // Fill table
    const finale_table: string[] = [];
	for (let index = 0; index < 6; index++) {
		finale_table.push('blue');
		finale_table.push('red');
		finale_table.push('yellow');
		finale_table.push('white');
		finale_table.push('white');
	}

    // Shuffle the table
    return finale_table
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => {
            return {color: value, flipped: false};
        });
}

// Epreuve : 90s
export const selectedTheme = createLocalStorageStore<Theme | null>('selectedTheme', null);
export const countdown = createLocalStorageStore<number>('countdown', 90);
export const score = createLocalStorageStore<number>('score', 0);
export const visitedThemes = createLocalStorageStore<number[]>('visitedThemes', []);
export const currentQuestionIndex = createLocalStorageStore<number | null>('currentQuestionIndex', null);

// Epreuve : finale
export const finaleScore = createLocalStorageStore<number[]>('finaleScore', [0, 0, 0]);
export const finaleTable = createLocalStorageStore<FinaleCell[]>('finaleTable', initFinaleTable());
export const finaleCountdown = createLocalStorageStore<number>('finaleCountdown', 90);
export const finaleShowScore = createLocalStorageStore<boolean>('finaleShowScore', false);