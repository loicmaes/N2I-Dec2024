<script setup lang="ts">
import { Crown } from "@iconoir/vue";
import type { IPlayer } from "~/types/player";

defineProps<{
  player: IPlayer;
}>();
const me = useFakePlayer();
</script>

<template>
  <div
    class="flex items-center gap-2 px-4 py-2 rounded-full"
    :class="{ 'bg-primary text-primary-foreground': player.owner, 'bg-secondary text-secondary-foreground': !player.owner }"
  >
    <Crown v-if="player.owner" />
    <p>{{ player.name }} <span v-if="player.id === me.id">(moi)</span></p>
  </div>
</template>
