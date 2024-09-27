<script lang="ts">
    import { derived, writable } from "svelte/store";
    import CandidatePicker from "./CandidatePicker.svelte";
    import Backronym from "./Backronym.svelte";
    import Acronym from "./Acronym.svelte";
    import { words } from "./words";

    const input = writable<string>("FFS");
    const letters = derived(input, () => $input.toLowerCase().split(""));
    const selection = writable<string[]>([]);
    const result = derived(selection, () => $selection.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "));
    let data = words;

    letters.subscribe(value => $selection = $selection.slice(0, value.length));

    function updateSelection(i: number, word: string) {
        if (!word) {
            return;
        }
        return $selection[i] = word;
    }

    export function shuffleArray() {
        let array = data;
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [ array[i], array[j] ] = [ array[j], array[i] ];
        }
        data = array;
    }
</script>

<div class="px-4 py-12 space-y-4 mx-auto max-w-screen-sm h-screen">
    <header>
        <hgroup>
            <h2 class="h2 font-bold text-surface-500">Backronyms By Bear</h2>
            <p>The
                <Backronym/>
               Generator is a simple tool that takes a word or phrase and generates a backronym from it.
            </p>
        </hgroup>
    </header>

    <main class="space-y-4">
        {#if $result}
            <div class="space-y-4 text-center">
                <h1 class="h1 text-3xl bg-gradient-to-br font-bold from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone">{$result}</h1>
            </div>
        {/if}

        <label class="label text-center">
            <span>👇
                <Backronym/>
               to make <Acronym/> from 👇
            </span>
            <input type="text" class="input text-surface-500 font-bold text-4xl text-center" bind:value={$input}>
            <span>☝️ Click me to change desired <Acronym/> ☝️</span>
        </label>

        <div class="space-y-4">
            {#each $letters as letter, i}
                <CandidatePicker letter={letter} words={data} on:pick={w => updateSelection(i,w.detail)}/>
            {/each}
        </div>
    </main>
</div>
