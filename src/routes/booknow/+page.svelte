<script lang="ts">
    import { Tickets, CalendarDays, Users } from "lucide-svelte";

    let tickets = [
      { name: 'Standard', description: 'Basic ticket access', price: 200 },
      { name: 'VIP', description: 'Priority seating & perks', price: 500 },
      { name: 'Premium', description: 'All-inclusive experience', price: 1000 }
    ];
    let selectedTicket = "";
    function selectTicket(ticket: string) {
        selectedTicket = ticket;
    }

    let selectedDate = "";
    let selectedTime = "";
    const setTime = (time: string) => {
        selectedTime = time;
    }

    let timeSlots = [
        "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
    ];

    let visitors = 1;
    function incrementVisitors() {
        visitors++;
    }  
    function decrementVisitors() {
        if(visitors > 1) {
            visitors--;
        }
    }
</script>
  
  <div class="min-h-screen text-white/75 bg-gradient-to-b from-gray-900 to-black">
    <div class="w-full flex h-25 items-center justify-center">
      <h1 class="text-4xl font-bold bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
        Book Your Museum Visit
      </h1>
    </div>
    <div class="mx-full px-4 py-8 w-full">
      <p class="text-center text-2xl font-normal text-white/75 mb-8">
        Select your tickets, choose your time and immerse yourself in culture.
      </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pl-10 w-300 pt-10 ">
        <div class="md:col-span-2 space-y-6">
          <div class="bg-gradient-to-b from-gray-900 to-black rounded-xl p-8 border-[1.5px] border-gray-800 backdrop-blur-sm ">
            <div class="flex space-x-5">
                <Tickets class="h-7 w-7"/>
                <h2 class="text-xl font-semibold mb-4 text-white/90">
                    Select Ticket Type
                </h2>
            </div>
            <div class="space-y-4 pt-5">
              {#each tickets as t}
              <button class="p-2 text-sm rounded-lg text-gray-400 w-full bg-gray-950 border-2 border-gray-800 ">
                    <div class="flex items-center justify-between py-4 px-8 ">
                        <div class="flex flex-col items-start space-y-1.5">
                          {#if t.name == "Standard"}
                            <h3 class="font-medium text-lg bg-gradient-to-br from-cyan-400 to-blue-800 bg-clip-text text-transparent">{t.name}</h3>
                          {:else if t.name == "VIP"}
                            <h3 class="font-medium text-lg bg-gradient-to-br from-yellow-400 to-amber-800 bg-clip-text text-transparent">{t.name}</h3>
                          {:else}
                            <h3 class="font-medium text-lg bg-gradient-to-br from-purple-400 to-indigo-800 bg-clip-text text-transparent">{t.name}</h3>
                          {/if}
                          <p class="text-sm text-gray-400">{t.description}</p>
                        </div>
                        <p class="font-semibold text-lg bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">&#8377{t.price}</p>
                      </div>
                </button>
              {/each}
            </div>
           </div>
           <div class="bg-gradient-to-b from-gray-900 to-black rounded-xl p-8 border-[1.5px] border-gray-800 backdrop-blur-sm">
                <h2 class="text-xl font-semibold mb-4 flex items-center gap-2 text-white/90">
                    <CalendarDays class="h-7 w-7 pr-2"/>
                    Select Date & Time
                </h2>
            
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                    <div class="pt-5 flex flex-col">
                        <input type="date" bind:value={selectedDate} 
                            class="w-70 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/80 focus:bg-gray-900/90 
                            border border-gray-800 text-grey-400 focus:outline-none focus:border-emerald-500 transition-all" />
                    </div>
            
                    <div class="flex flex-col">
                        <div class="pt-5 grid grid-cols-3 gap-2">
                            {#each timeSlots as time}
                                <button 
                                    on:click={() => setTime(time)}
                                    class="p-2 text-sm rounded-lg transition-all text-grey-400 
                                    border border-gray-800 bg-gray-800/50 hover:bg-gray-800/80 hover:border-emerald-400/50 
                                    focus:outline-none focus:border-emerald-500 w-full">
                                    {time}
                                    
                                </button>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-gradient-to-b from-gray-900 to-black rounded-xl p-8 border-[1.5px] border-gray-800 backdrop-blur-sm">
                <h2 class="pb-5 text-xl font-semibold mb-4 flex items-center gap-2 text-white/90">
                    <Users class="h-7 w-7 pr-2"/>
                    Number Of Visitors
                </h2>
                <div class="flex items-center justify-between py-4 px-8 border-none rounded-lg w-50 h-12">
                    <button class="h-10 w-10 p-2 text-md rounded-full transition-all text-grey-400 border border-gray-800 bg-gray-800/50 hover:bg-gray-800/80 hover:border-emerald-400/50 focus:outline-none focus:border-emerald-500" on:click={decrementVisitors}>-</button>
                    <p class="font-semibold text-lg bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">{visitors}</p>
                    <button class="h-10 w-10 text-md rounded-full transition-all text-grey-400 border border-gray-800 bg-gray-800/50 hover:bg-gray-800/80 hover:border-emerald-400/50 focus:outline-none focus:border-emerald-500" on:click={incrementVisitors}>+</button>
                </div>
            </div>
        </div>
        <div class="md:col-span-1">
            <div class="h-70 bg-gradient-to-b from-gray-900 to-black rounded-xl p-8 border-[1.5px] border-gray-800 backdrop-blur-sm sticky top-4">
                <h1 class="text-xl font-semibold mb-4 flex items-center gap-2 text-white/90">Order Summary</h1>
                <div class="flex items-center justify-between">
                    <p class="text-md text-gray-400">Ticket Type</p>
                    <p class="text-md font-semibold text-white/90">Premium</p>
                </div>
                <p class="text-md text-gray-400 pt-4">Visitors: {visitors}</p>
                <p class="text-md text-gray-400 pt-4">Date:{selectedDate}</p>
                <p class="text-md text-gray-400 pt-4">Time: {selectedTime}</p>
                <div class="flex items-center justify-between pt-4">
                    <p class="text-md text-gray-400">Total</p>
                    <p class="text-md font-semibold text-white/90">&#8377;200</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>