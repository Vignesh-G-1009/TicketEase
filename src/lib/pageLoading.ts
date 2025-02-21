import { writable } from 'svelte/store';

export const isPageLoading = writable(false);

export const startLoading = () => {
    isPageLoading.set(true);
};

export const stopLoading = () => {
    isPageLoading.set(false);
};