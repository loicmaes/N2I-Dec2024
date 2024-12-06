<script setup lang="ts">
import type { IPlayer } from "~/types/player";

const connectedPlayers = useConnectedPlayers();
const players = computed((): (IPlayer & {
  score?: number;
  roomCode?: string;
})[] => {
  const _players = connectedPlayers.value;
  return _players.sort((a, b) => {
    return (a.score ?? 0) >= (b.score ?? 0) ? 1 : -1;
  });
});

const me = usePlayer();
</script>

<template>
  <Table class="w-[max(60%,350px)]">
    <TableHeader>
      <TableRow class="py-2 px-3">
        <TableHead>Place</TableHead>
        <TableHead>Joueur</TableHead>
        <TableHead>Score</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow
        v-for="(player, index) in players"
        :key="player.name"
        class="py-2 px-3"
      >
        <TableCell>#{{ index + 1 }}</TableCell>
        <TableCell>
          {{ player.name }} <span
            v-if="player.name === me?.name"
            class="text-sm text-muted-foreground"
          >(moi)</span>
        </TableCell>
        <TableCell>{{ player.score ?? 0 }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
