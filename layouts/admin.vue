<script setup lang="ts">
import { FloppyDisk, Download, SystemRestart } from "@iconoir/vue";
</script>

<template>
  <div
    data-layout="admin"
    class="mx-auto w-[min(100%,1240px)] px-6 md:px-0 flex flex-col"
  >
    <header class="flex items-center justify-between shrink-0 py-4">
      <p class="font-bold">
        N2I - Dec 2024
      </p>

      <div class="flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          @click="save"
        >
          <FloppyDisk />
        </Button>
        <Button
          class="gap-2"
          @click="download"
        >
          <Download />
          <span>Télécharger</span>
        </Button>
      </div>
    </header>

    <main class="flex-1">
      <ClientOnly>
        <slot />
        <template #fallback>
          <div class="w-full py-12 grid place-items-center">
            <SystemRestart class="animate-spin" />
          </div>
        </template>
      </ClientOnly>
    </main>
  </div>
</template>
