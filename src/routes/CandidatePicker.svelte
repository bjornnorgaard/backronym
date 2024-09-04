<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";

    export let letter: string;
    export let words: string[];

    const dispatch = createEventDispatcher();
    const filtered = words.filter(word => word.toLowerCase().startsWith(letter.toLowerCase()));

    let pick = "";

    function onSelect(word: string) {
        pick = word;
        dispatch("pick", word);
    }

    onMount(() => {
        pick = filtered[Math.floor(Math.random() * filtered.length)];
        onSelect(pick);
    });
</script>

<div class="space-y-2">
    <div class="border-b-2 border-primary-500 ">
        <span class="text-6xl font-bold text-primary-500">{letter.toUpperCase()}</span>
        <span>is for</span>
        {#if pick}
            <span class="text-primary-500 font-bold">{pick}</span>
        {:else}
            <span class="text-secondary-500 font-bold">Fools</span>
            <span>using dumb symbols</span>
        {/if}
    </div>

    <p class="flex gap-2 flex-wrap ">
        {#each filtered as word}
            <button type="button"
                    class="btn btn-sm"
                    class:variant-soft={pick !== word}
                    class:variant-ghost-primary={pick === word}
                    class:font-bold={pick === word}
                    on:click={() => onSelect(word)}>{word}</button>
        {/each}
    </p>
</div>
