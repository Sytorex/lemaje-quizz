<script lang="ts">
    import { dev } from '$app/environment';

    function getHref(path: string) {
        return dev ? path : `${path}.html`;
    }

    function resetSite() {
        localStorage.clear();
        alert('Il faut rafraîchir chaque page pour que les changements soient pris en compte');
    }
</script>

<section id="home">
    <h1>Bienvenue sur le site de Quizz</h1>
    
    <div class="container-round">
        <div class="round">
            <h2>Les 90 secondes</h2>
            <a href={getHref('90s/user')} target="_blank">Ouvrir la page user</a>
            <a href={getHref('90s/admin')} target="_blank">Ouvrir la page admin</a>
        </div>

        <div class="round">
            <h2>La finale</h2>
            <a href={getHref('finale/user')} target="_blank">Ouvrir la page user</a>
            <a href={getHref('finale/admin')} target="_blank">Ouvrir la page admin</a>
        </div>
    </div>

    <div>
        <button class="btn" on:click={resetSite}>Réinitialiser le site</button>
    </div>
</section>