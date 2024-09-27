<script lang="ts">
    import { derived, writable } from "svelte/store";
    import CandidatePicker from "./CandidatePicker.svelte";
    import Backronym from "./Backronym.svelte";
    import Acronym from "./Acronym.svelte";
    import { words } from "./wordsStore";
    import DomainPicker from "./DomainPicker.svelte";

    const input = writable<string>("FFS");
    const letters = derived(input, () => $input.toLowerCase().split(""));
    const selection = writable<string[]>([]);
    const result = derived(selection, () => $selection.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "));

    letters.subscribe(value => $selection = $selection.slice(0, value.length));

    function updateSelection(i: number, word: string) {
        if (!word) {
            return;
        }
        return $selection[i] = word;
    }

    export function shuffleArray() {
        let array = $words;
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [ array[i], array[j] ] = [ array[j], array[i] ];
        }
        words.set(array);
    }
</script>

<div class="mx-auto h-screen max-w-screen-sm px-4 py-12 space-y-4">
    <header>
        <hgroup>
            <h2 class="font-bold h2 text-surface-500">Backronyms By Bear</h2>
            <p>The
                <Backronym/>
               Generator is a simple tool that takes a word or phrase and generates a backronym from it.
            </p>
        </hgroup>
    </header>

    <main class="space-y-4">
        <label class="box">
            <span>👇 <Backronym/> to make <Acronym/> from 👇</span>
            <input type="text" class="text-center text-3xl font-bold variant-ghost input" bind:value={$input}>
            <DomainPicker/>
            <span>👆 Click me to change domain 👆</span>
        </label>

        {#if $result}
            <div class="box">
                <span>🎉 Your generated <Backronym/> 🎉</span>
                <h1 class="bg-gradient-to-br from-red-500 to-yellow-500 box-decoration-clone bg-clip-text text-3xl font-bold text-transparent h1">{$result}</h1>
            </div>
        {/if}

        <div class="box">
            {#each $letters as letter, i}
                <CandidatePicker letter={letter} on:pick={w => updateSelection(i,w.detail)}/>
            {/each}
        </div>
    </main>
</div>

<style lang="postcss">
    .box {
        @apply p-4 text-center card;
    }
</style>
