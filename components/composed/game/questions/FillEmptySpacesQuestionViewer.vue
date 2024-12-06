<script setup lang="ts">
import { Trash } from "@iconoir/vue";
import type { IFillEmptySpacesQuestionBuilder } from "~/types/questions";

const props = defineProps<{
  question: IFillEmptySpacesQuestionBuilder;
}>();
const answer = useAnswer();

const questionTitle = computed((): string => {
  const parts = props.question.question.split(" ");
  return parts.map(p => p.startsWith("{") && p.endsWith("}") ? "_____" : p).join(" ");
});
const computedGuest = computed((): string => {
  const parts = props.question.question.split(" ");
  return parts.map(p => p.startsWith("{") && p.endsWith("}") ? props.question.specific.candidates[answer.value[Number(p.substring(1, p.length - 1))]] ?? "_______" : p).join(" ");
});
const answerCount = computed((): number => {
  const parts = props.question.question.split(" ");
  return parts.filter(p => p.startsWith("{") && p.endsWith("}")).length;
});

const choose = (index: number) => {
  if (answer.value.length === answerCount.value)
    return;
  answer.value = [...answer.value, index];
};
const clear = () => {
  answer.value = [];
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <section
      data-role="head"
      class="flex-1 grid place-items-center"
    >
      <NuxtImg
        v-if="question.specific.src"
        :src="question.specific.src"
        :placeholder="[50, 50, 75, 25]"
        class="w-[min(100%,640px)]"
      />
    </section>
    <header>
      <span class="text-sm text-muted-foreground">Complète la phrase</span>
      <h1 class="text-3xl font-bold">
        {{ questionTitle }}
      </h1>
    </header>
    <section
      data-role="candidates"
      class="flex flex-col items-center gap-4"
    >
      <div class="w-full flex flex-wrap justify-center gap-4">
        <Button
          v-for="(candidate, index) in question.specific.candidates"
          :key="`candidate-${index}`"
          :variant="answer.includes(index) ? 'secondary' : 'outline'"
          :disabled="answer.includes(index)"
          @click="choose(index)"
        >
          {{ candidate }}
        </Button>
      </div>
      <div class="flex items-center gap-3">
        <p class="text-muted-foreground">
          {{ computedGuest }}
        </p>
        <Button
          size="icon"
          variant="outline"
          @click="clear"
        >
          <Trash />
        </Button>
      </div>
    </section>
  </div>
</template>
