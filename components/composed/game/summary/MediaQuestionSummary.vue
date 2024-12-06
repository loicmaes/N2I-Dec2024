<script setup lang="ts">
import type { IMediaQuestionBuilder } from "~/types/questions";
import PlayersRecap from "~/components/composed/game/summary/PlayersRecap.vue";

const question = useQuestion().value as IMediaQuestionBuilder;
</script>

<template>
  <div class="flex flex-col gap-6">
    <section
      data-role="head"
      class="flex-1 grid place-items-center"
    >
      <PlayersRecap class="mx-auto" />
    </section>
    <header>
      <span class="text-sm text-muted-foreground">Réponds à la question</span>
      <h1 class="text-3xl font-bold">
        {{ question.question }}
      </h1>
    </header>
    <section
      data-role="candidates"
      class="grid md:grid-cols-2 gap-4"
    >
      <Button
        v-for="(candidate, index) in question.specific.candidates"
        :key="`candidate-${index}`"
        :variant="question.specific.answer.includes(index) ? 'default' : 'outline'"
        :disabled="true"
      >
        {{ candidate }}
      </Button>
    </section>
  </div>
</template>
