<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import { words } from "./wordsStore";
    import { derived } from "svelte/store";

    export let letter: string;
    const dispatch = createEventDispatcher();
    const filtered = derived(words, (list) => list.filter(word => word.toLowerCase().startsWith(letter.toLowerCase())));
    let pick = "";

    function onSelect(word: string) {
        pick = word;
        dispatch("pick", word);
    }

    onMount(() => {
        return filtered.subscribe(list => {
            onSelect(list[Math.floor(Math.random() * list.length)]);
        })
    });
</script>

<div class="space-y-4">
    <div class="border-b-2 text-left border-primary-500">
        <span class="text-6xl font-bold text-primary-500">{letter.toUpperCase()}</span>
        <span>is for</span>
        {#if pick}
            <span class="font-bold text-primary-500">{pick}</span>
        {:else}
            <span class="font-bold text-secondary-500">Fools</span>
            <span>using dumb symbols</span>
        {/if}
    </div>

    <p class="flex flex-wrap gap-2">
        {#each $filtered as word}
            <button type="button"
                    class="btn btn-sm"
                    class:variant-soft={pick !== word}
                    class:variant-ghost-primary={pick === word}
                    class:font-bold={pick === word}
                    on:click={() => onSelect(word)}>{word}</button>
        {/each}
    </p>
</div>
