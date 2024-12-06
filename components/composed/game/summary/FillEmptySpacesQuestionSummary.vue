<script setup lang="ts">
import type { IFillEmptySpacesQuestionBuilder } from "~/types/questions";
import PlayersRecap from "~/components/composed/game/summary/PlayersRecap.vue";

const question = useQuestion().value as IFillEmptySpacesQuestionBuilder;
const questionDisplay = computed((): string => {
  const parts = question.question.split(" ");
  return parts.map(p => p.startsWith("{") && p.endsWith("}") ? "_____" : p).join(" ");
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <section
      data-role="head"
      class="flex-1 grid place-items-center"
    >
      <PlayersRecap class="mx-auto" />
    </section>
    <header class="shrink-0 w-[min(100%,80ch)]">
      <span class="text-sm text-muted-foreground">Complète la phrase</span>
      <h1 class="text-3xl font-bold text-pretty">
        {{ questionDisplay }}
      </h1>
    </header>
    <section
      data-role="candidates"
      class="shrink-0 grid gap-4"
    >
      <Button>{{ question.specific.answer }}</Button>
    </section>
  </div>
</template>
