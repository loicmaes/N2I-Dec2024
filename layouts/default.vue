<script setup lang="ts">
import { Gamepad, Github } from "@iconoir/vue";
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

    <footer class="py-4">
      <Card class="w-full">
        <CardContent class="flex items-center justify-between py-4 px-6">
          <p>Tous droits réservés &copy; <span class="underline underline-offset-4">A2CM</span> · 2024</p>

          <div class="flex gap-2">
            <Button
              variant="outline"
              class="gap-2 cursor-pointer"
              as-child
            >
              <NuxtLink
                to="https://github.com/loicmaes/N2I-Dec2024/tree/master"
                target="_blank"
              >
                <Github />
                <span>Front-End</span>
              </NuxtLink>
            </Button>
            <Button
              variant="outline"
              class="gap-2 cursor-pointer"
              as-child
            >
              <NuxtLink
                to=""
                target="_blank"
              >
                <Github />
                <span>Back-End</span>
              </NuxtLink>
            </Button>
          </div>
        </CardContent>
      </Card>
    </footer>
  </div>
</template>
