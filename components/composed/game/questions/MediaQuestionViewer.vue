<script setup lang="ts">
import type { IMediaQuestionBuilder } from "~/types/questions";

const props = defineProps<{
  question: IMediaQuestionBuilder;
}>();
const answer = useAnswer();

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
      class="flex-1 grid place-items-center"
    >
      <template v-if="question.type === 'IMAGE'">
        <NuxtImg
          :src="question.specific.src"
          :placeholder="[50, 50, 75, 25]"
          class="w-[min(100%,640px)]"
        />
      </template>
      <template v-else-if="question.type === 'VIDEO'">
        <iframe
          class="w-full h-full"
          :src="question.specific.src"
          title="question placeholder"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          autoplay
        />
      </template>
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
        :variant="answer.includes(index) ? 'secondary' : 'outline'"
        @click="choose(index)"
      >
        {{ candidate }}
      </Button>
    </section>
  </div>
</template>
