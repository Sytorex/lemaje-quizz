<script lang="ts">
    import '../main.scss';

    const IMAGE_URL_PNG = "https://cdn.discordapp.com/avatars/240125087649497089/a423484e618769bbedf416d06ffb0d7d?size=1024";
    const TITLE = "Quizz";
</script>

<svelte:head>
    <link rel="icon" href={IMAGE_URL_PNG} type="image/png" />
	<title>{TITLE}</title>
</svelte:head>

<slot />