<script setup lang="ts">
import { Gamepad } from "@iconoir/vue";
</script>

<template>
  <div
    data-layout="default"
    class="w-[min(100%,1440px)] mx-auto min-h-dvh flex flex-col"
  >
    <header class="fixed z-10 top-0 left-1/2 -translate-x-1/2 w-[min(100%,1440px)] h-16 flex items-center gap-12 bg-background">
      <NuxtLink
        to="/"
        class="font-black font-mono tracking-tight text-primary"
      >
        new A2CM();
      </NuxtLink>

      <nav class="flex-1 flex items-center gap-1">
        <Button
          variant="ghost"
          as-child
        >
          <NuxtLink
            to="/concept"
            active-class="bg-muted"
          >
            Le Concept
          </NuxtLink>
        </Button>
        <Button
          variant="ghost"
          as-child
        >
          <NuxtLink
            to="/team"
            active-class="bg-muted"
          >
            L'Équipe
          </NuxtLink>
        </Button>
      </nav>

      <Button
        class="gap-2"
        as-child
      >
        <NuxtLink to="/game">
          <Gamepad />
          <span>Jouer</span>
        </NuxtLink>
      </Button>
    </header>

    <main class="flex-1 flex flex-col">
      <slot />
    </main>
  </div>
</template>
