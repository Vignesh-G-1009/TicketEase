<script lang="ts">
    import { user, signOut } from "$lib/auth";
    import LoadingAnimation from "$lib/loadingAnimation.svelte";
    import { isPageLoading, startLoading, stopLoading } from "$lib/pageLoading";
    import { onMount } from "svelte";

    onMount(() => {
        stopLoading();
    });

    const handleSignOut = async () => {
        try {
            startLoading();
            await signOut();
            window.location.href = "/";
        } catch (error) {
            console.error("Failed to Sign Out: ", error);
        }
    };

    const getUserName = (name: string) => {
        const names = name.trim().split(/\s+/);
        if(names.length === 1) {
            return { firstname: names[0], lastname: ""};
        }

        const firstname = names.slice(0, -1).join(" ");
        const lastname = names[names.length - 1];

        return { firstname, lastname };
    };

    const handleSignIn = () => {
        try {
            startLoading();
            window.location.href = "/login";
        } catch (error) {
            stopLoading();
            console.error("Failed to Sign In: ", error);
        }
    }

    const handleSignUp = () => {
        try {
            startLoading();
            window.location.href = "/signup";
        } catch (error) {
            stopLoading();
            console.error("Failed to Sign Up: ", error);
        }
    }
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white/75">    
    {#if $isPageLoading}
        <div class="absolute flex items-center justify-center w-full h-screen bg-black/75 backdrop-blur-sm">
            <LoadingAnimation />
        </div>
    {/if}
    <div class="mx-12 pt-8">
        <nav class="flex justify-between items-center">
            <div class="text-2xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">MuseumPass</div>
            <div class="flex space-x-8">
                <button onclick={() => window.location.href = "/booknow"}>
                    Book Now
                </button>
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
                        onclick={handleSignIn}
                        class="px-4 py-2 rounded-lg border-[1px] border-white hover:bg-white hover:text-black 
                        focus:bg-white/75 focus:text-black transition-all duration-200"
                    >
                        Sign In
                    </button>
                    <button 
                        onclick={handleSignUp}
                        class="px-4 py-2 rounded-lg bg-gradient-to-br from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600 
                        text-white focus:from-teal-500 focus:to-green-500 transition-all duration-200"
                    >
                        Sign Up
                    </button>
                {/if}
            </div>
        </nav>
        <div class="flex flex-col items-center text-center mb-20">
            <h1>Discover India's Heritage</h1>
        </div>
    </div>
</div>

<svelte:head>
    <title>Home Page</title>
</svelte:head>