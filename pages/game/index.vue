<script setup lang="ts">
import CreateRoomForm from "~/components/composed/game/room/CreateRoomForm.vue";
import JoinRoomForm from "~/components/composed/game/room/JoinRoomForm.vue";

definePageMeta({
  layout: "game",
});
useHead({
  title: "Tu veux jouer ? Nous aussi",
});
</script>

<template>
  <div
    data-page="game-home"
    class="h-dvh grid place-items-center"
  >
    <Tabs
      default-value="join"
      class="w-[min(calc(100%-3rem),512px)]"
    >
      <TabsList class="w-full flex items-center">
        <TabsTrigger
          value="join"
          class="flex-1"
        >
          Rejoindre une salle
        </TabsTrigger>
        <TabsTrigger
          value="create"
          class="flex-1"
        >
          Créer une salle
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="join"
        class="pt-6"
      >
        <JoinRoomForm />
      </TabsContent>
      <TabsContent
        value="create"
        class="pt-6"
      >
        <CreateRoomForm />
      </TabsContent>
    </Tabs>
  </div>
</template>
