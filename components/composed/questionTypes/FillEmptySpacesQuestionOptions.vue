<script setup lang="ts">
import InputWrapper from "~/components/templating/InputWrapper.vue";
import InputLineWrapper from "~/components/templating/InputLineWrapper.vue";
import { Textarea } from "~/components/ui/textarea";
import type { IFillEmptySpacesQuestionBuilder } from "~/types/questions";
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from "~/components/ui/tags-input";

const props = defineProps<{
  questionId: number;
}>();
const question = ref<IFillEmptySpacesQuestionBuilder>(findQuestion(props.questionId) as IFillEmptySpacesQuestionBuilder);
</script>

<template>
  <div class="flex flex-col gap-4">
    <InputLineWrapper>
      <InputWrapper class="basis-1/2">
        <Label :for="`${questionId}-question`">Réponse</Label>
        <Textarea
          :id="`${questionId}-question`"
          v-model="question.question"
          placeholder="Ex : Je suis un {0} de {1} classe."
        />
      </InputWrapper>
      <InputWrapper class="basis-1/2">
        <Label :for="`${questionId}-answer`">Réponse</Label>
        <Textarea
          :id="`${questionId}-answer`"
          v-model="question.specific.answer"
          placeholder="Ex : Je suis un enculé de première classe."
        />
      </InputWrapper>
    </InputLineWrapper>

    <Separator label="Candidats" />
    <TagsInput v-model="question.specific.candidates">
      <TagsInputItem
        v-for="candidate in question.specific.candidates"
        :key="candidate"
        :value="candidate"
      >
        <TagsInputItemText />
        <TagsInputItemDelete />
      </TagsInputItem>
      <TagsInputInput placeholder="enculé" />
    </TagsInput>
  </div>
</template>
