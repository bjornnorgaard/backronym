<script lang="ts">
    import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
    import { words } from "./wordsStore";
    import { domains } from "./wordsStore.js";

    let listIndex = 0;

    function onChange(e: Event) {
        const target = e.target as HTMLInputElement;
        let value: number = Number(target.value);
        words.set(domains[value]);
    }
</script>

<RadioGroup display="flex" background="" border="" active="variant-filled-surface">
    <RadioItem on:change={(e) => onChange(e)} bind:group={listIndex} name="Humanitarian" value={0}>Humanitarian</RadioItem>
    <RadioItem on:change={(e) => onChange(e)} bind:group={listIndex} name="Technical" value={1}>Technical</RadioItem>
</RadioGroup>
