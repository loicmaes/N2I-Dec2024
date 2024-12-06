<script setup lang="ts">
import type { IBeNearestQuestionBuilder } from "~/types/questions";

defineProps<{
  question: IBeNearestQuestionBuilder;
}>();
const answer = useAnswer();

const submitted = useSubmitted();

const updateValue = (value?: number) => {
  answer.value = [value ?? 0];
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
      <span class="text-sm text-muted-foreground">Soit le plus proche</span>
      <h1 class="text-3xl font-bold">
        {{ question.question }}
      </h1>
    </header>
    <section
      data-role="candidates"
      class="grid gap-4"
    >
      <NumberField
        :min="0"
        :model-value="answer[0]"
        :disabled="submitted"
        @update:model-value="updateValue"
      >
        <NumberFieldContent>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldContent>
      </NumberField>
    </section>
  </div>
</template>
