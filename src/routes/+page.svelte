<div id="home">
    <div>
        <h1>Bienvenue sur le site de Quizz</h1>
        
        <div class="container-round">
            <div class="round">
                <h2>Les 90 secondes</h2>
                <a href="/90-secondes/user" target="_blank">Ouvrir la page user</a>
                <a href="/90-secondes/admin" target="_blank">Ouvrir la page admin</a>
            </div>
    
            <div class="round">
                <h2>La finale</h2>
                <a href="/finale/user" target="_blank">Ouvrir la page user</a>
                <a href="/finale/admin" target="_blank">Ouvrir la page admin</a>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    #home {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;

        > div {
            display: flex;
            flex-direction: column;
            gap: 20px;
            width: 80%;
            max-width: 800px;
        }
    }

    h1 {
        color: red;
        text-align: center;
    }

    .container-round {
        display: flex;
        justify-content: space-around;

        .round {
            display: flex;
            flex-direction: column;
            align-items: center;

            a {
                margin: 10px;
            }
        }
    }
</style>