<script setup lang="ts">
import InputWrapper from "~/components/templating/InputWrapper.vue";
import InputLineWrapper from "~/components/templating/InputLineWrapper.vue";
import type { IBeNearestQuestionBuilder } from "~/types/questions";

const props = defineProps<{
  questionId: number;
}>();
const question = ref<IBeNearestQuestionBuilder>(findQuestion(props.questionId) as IBeNearestQuestionBuilder);
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- todo: ref image -->
    <InputLineWrapper>
      <InputWrapper class="basis-3/4">
        <Label :for="`${questionId}-title`">Intitulé</Label>
        <Input
          :id="`${questionId}-title`"
          v-model="question.question"
          placeholder="Ex : Quelle est la couleur du cheval blanc d'Henry IV ?"
        />
      </InputWrapper>
      <InputWrapper class="basis-1/4">
        <Label :for="`${questionId}-answer`">Réponse à approcher</Label>
        <Input
          :id="`${questionId}-answer`"
          v-model="question.specific.answer"
          type="number"
          placeholder="0"
        />
      </InputWrapper>
    </InputLineWrapper>
  </div>
</template>
