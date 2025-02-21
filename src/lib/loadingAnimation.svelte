<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { Palette, Frame, Camera, Clock, Ticket } from "lucide-svelte";

	let currentIcon = 0;
	let isLoading = false;
	let interval: NodeJS.Timeout;

	const icons = [
		{ component: Frame, text: "Locating stunning gallery masterpieces...", rotation: "-rotate-90" },
		{ component: Camera, text: "Verifying available guided tours...", rotation: "rotate-0" },
		{ component: Ticket, text: "Preparing tickets for your visit...", rotation: "rotate-180" },
		{ component: Palette, text: "Curating and selecting exhibitions...", rotation: "rotate-90" },
		{ component: Clock, text: "Confirming your convenient time slots...", rotation: "rotate-180" },
	];

	onMount(() => {
		interval = setInterval(() => {
			isLoading = true;
			setTimeout(() => {
				  currentIcon = (currentIcon + 1) % icons.length;
				  isLoading = false;
			}, 500);
		}, 2000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	$: IconComponent = icons[currentIcon].component;
	$: rotation = icons[currentIcon].rotation;
	$: text = icons[currentIcon].text;
</script>

<div class="relative flex flex-col items-center space-y-16">
	<div class="absolute w-24 h-24 border-4 border-emerald-500 rotate-45 animate-[spin_8s_linear_infinite]"></div>
	<div class="absolute w-24 h-24 border-4 border-lime-500 -rotate-45 animate-[spin_4s_linear_infinite]"></div>
	
	<div class="relative items-center flex justify-center w-24 h-24"> 
		<div
			class="transform transition-all duration-500 ease-in-out"
			class:scale-0={isLoading}
			class:scale-100={!isLoading}
			class:rotate-0={rotation === "rotate-0"}
			class:rotate-90={rotation === "rotate-90"}
			class:-rotate-90={rotation === "-rotate-90"}
			class:rotate-180={rotation === "rotate-180"}
		>
			<svelte:component 
			  	this={IconComponent}
			  	class="w-10 h-10 text-lime-100"
			  	strokeWidth={1.5}
			/>
	  	</div>
	</div>
	
	<p class="text-white/70 text-xl">
		<span
	  		class="block transition-opacity duration-500"
	  		class:opacity-0={isLoading}
	  		class:opacity-100={!isLoading}
		>
	  		{text}
		</span>
	</p>
  
	<div class="flex gap-3">
	  	<div class="w-3 h-3 bg-lime-500 rounded-full dot"></div>
	  	<div class="w-3 h-3 bg-emerald-500 rounded-full dot"></div>
	  	<div class="w-3 h-3 bg-lime-500 rounded-full dot"></div>
	</div>
</div>