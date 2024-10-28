<script setup lang="ts">
import { Trash } from "@iconoir/vue";
import type { IQuestion } from "~/types/questions";
import MediaQuestionOptions from "~/components/composed/questionTypes/MediaQuestionOptions.vue";
import TextQuestionOptions from "~/components/composed/questionTypes/TextQuestionOptions.vue";
import BeNearestQuestionOptions from "~/components/composed/questionTypes/BeNearestQuestionOptions.vue";
import InputWrapper from "~/components/templating/InputWrapper.vue";
import FillEmptySpacesQuestionOptions from "~/components/composed/questionTypes/FillEmptySpacesQuestionOptions.vue";

const props = defineProps<{
  questionId: number;
}>();
const question = ref(findQuestion(props.questionId) as IQuestion);
</script>

<template>
  <Card class="relative">
    <Button
      variant="ghost"
      size="icon"
      class="absolute top-2 right-6 z-10"
      @click="deleteQuestion(questionId)"
    >
      <Trash />
    </Button>

    <CardContent class="p-6">
      <InputWrapper>
        <Label :for="`difficulty-${question.id}`">Choix de la difficulté</Label>
        <Select
          :id="`difficulty-${question.id}`"
          v-model="question.difficulty"
        >
          <SelectTrigger>
            <SelectValue placeholder="Choisis une difficulté" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">
              Toutes difficultés
            </SelectItem>
            <SelectItem value="easy">
              Facile
            </SelectItem>
            <SelectItem value="medium">
              Moyen
            </SelectItem>
            <SelectItem value="hard">
              Difficile
            </SelectItem>
            <SelectItem value="devil">
              Démon
            </SelectItem>
          </SelectContent>
        </Select>
      </InputWrapper>
      <Separator
        class="mb-4 mt-6"
        label="Configuration"
      />

      <MediaQuestionOptions
        v-if="['image', 'video'].includes(question.type)"
        :question-id="questionId"
      />
      <TextQuestionOptions
        v-if="question.type === 'text'"
        :question-id="questionId"
      />
      <BeNearestQuestionOptions
        v-if="question.type === 'beNearest'"
        :question-id="questionId"
      />
      <FillEmptySpacesQuestionOptions
        v-if="question.type === 'fillEmptySpaces'"
        :question-id="questionId"
      />
    </CardContent>
  </Card>
</template>
