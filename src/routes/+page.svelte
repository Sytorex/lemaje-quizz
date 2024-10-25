<section id="home">
    <h1>Bienvenue sur le site de Quizz</h1>
    
    <div class="container-round">
        <div class="round">
            <h2>Les 90 secondes</h2>
            <a href="90s/user" target="_blank">Ouvrir la page user</a>
            <a href="90s/admin" target="_blank">Ouvrir la page admin</a>
        </div>

        <div class="round">
            <h2>La finale</h2>
            <a href="finale/user" target="_blank">Ouvrir la page user</a>
            <a href="finale/admin" target="_blank">Ouvrir la page admin</a>
        </div>
    </div>

    <div>
        <button class="btn" on:click={() => { localStorage.clear(); }}>Reset du site</button>
    </div>
</section>