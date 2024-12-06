<script setup lang="ts">
import type { ITextQuestionBuilder } from "~/types/questions";

const answer = useAnswer();

const props = defineProps<{
  question: ITextQuestionBuilder;
}>();

const choose = (index: number) => {
  if (answer.value.includes(index))
    answer.value = answer.value.filter(e => e !== index);
  else if (answer.value.length < props.question.specific.candidates.length - 1)
    answer.value = [...answer.value, index];
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <section
      data-role="head"
      class="flex-1"
    />
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
        :variant="answer.includes(index) ? 'secondary' : 'outline'"
        @click="choose(index)"
      >
        {{ candidate }}
      </Button>
    </section>
  </div>
</template>
