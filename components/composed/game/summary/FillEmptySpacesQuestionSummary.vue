<script setup lang="ts">
import type { IFillEmptySpacesQuestionBuilder } from "~/types/questions";
import PlayersRecap from "~/components/composed/game/summary/PlayersRecap.vue";

const question = useQuestion().value as IFillEmptySpacesQuestionBuilder;
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
      <span class="text-sm text-muted-foreground">Complète la phrase</span>
      <h1 class="text-3xl font-bold">
        {{ question.question }}
      </h1>
    </header>
    <section
      data-role="candidates"
      class="grid md:grid-cols-2 gap-4"
    >
      <Button disabled>
        {{ question.specific.answer }}
      </Button>
    </section>
  </div>
</template>
