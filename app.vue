<script setup lang="ts">
import { IconoirProvider } from "@iconoir/vue";

const iconProps = {
  "width": "1rem",
  "height": "1rem",
  "stroke-width": "2",
};
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <Toaster />
    <IconoirProvider :icon-props="iconProps">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </IconoirProvider>
  </div>
</template>
