import { writable } from "svelte/store";
import { technical } from "./technical";
import { humanitarian } from "./humanitarian";

export const domains = [humanitarian, technical];
export const words = writable<string[]>(domains[0]);
