<script lang="ts">
    import { writable } from "svelte/store";
    import { onMount } from "svelte";
    import { auth } from "../firebase";
    import type { User } from "firebase/auth";

    const user = writable<User | null>(null);

    const handleSignOut = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error(error);
        }
    };

    onMount(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                user.set(authUser);
            } else {
                user.set(null);
            }
        });

        return () => unsubscribe();
    });

    const getUserName = (displayName: string | null | undefined) => {
        if(!displayName) return { firstname: "", lastname: "" };
        const [firstname, lastname] = displayName.split(" ");
        return { firstname, lastname };
    };
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white/75">
    <div class="mx-12 pt-8">
        <nav class="flex justify-between items-center">
            <div class="text-2xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">MuseumPass</div>
            <div class="flex space-x-8">
                <button>
                    Museums
                </button>
                <button>
                    About
                </button>
                
                {#if $user}
                    <button>
                        Dashboard
                    </button>
                    <button 
                        onclick={handleSignOut}
                        class="px-4 py-2 rounded-lg bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
                        text-white focus:from-red-700 focus:to-red-800 transition-all duration-200"
                    >
                        Sign Out
                    </button>
                {:else}
                    <button 
                        onclick={() => window.location.href = "/login"}
                        class="px-4 py-2 rounded-lg border-[1px] border-white hover:bg-white hover:text-black 
                        focus:bg-white/75 focus:text-black transition-all duration-200"
                    >
                        Sign In
                    </button>
                    <button 
                        onclick={() => window.location.href = "/signup"}
                        class="px-4 py-2 rounded-lg bg-gradient-to-br from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600 
                        text-white focus:from-teal-500 focus:to-green-500 transition-all duration-200"
                    >
                        Sign Up
                    </button>
                {/if}
            </div>
        </nav>
        {#if $user}
            <div class="w-full flex flex-col items-center justify-center mt-80 space-y-4">
                <p class="text-xl">Hello, {$user.displayName ? getUserName($user.displayName).firstname : $user.email}</p>
                <p class="text-xl">Fullname: {$user.displayName} </p>
            </div>
        {:else}
            <div class="w-full flex flex-col items-center justify-center mt-80 space-y-4">
                <p class="text-xl">Welcome to MuseumPass</p>
                <p class="text-xl">Please Login to Continue</p>
            </div>
        {/if}
    </div>
</div>

<svelte:head>
    <title>Home Page</title>
</svelte:head>