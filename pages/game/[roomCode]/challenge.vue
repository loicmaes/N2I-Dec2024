<script setup lang="ts">
import type {
  IBeNearestQuestionBuilder,
  IFillEmptySpacesQuestionBuilder,
  IMediaQuestionBuilder,
  ITextQuestionBuilder,
} from "~/types/questions";
import TextQuestionViewer from "~/components/composed/game/questions/TextQuestionViewer.vue";
import MediaQuestionViewer from "~/components/composed/game/questions/MediaQuestionViewer.vue";
import BeNearestQuestionViewer from "~/components/composed/game/questions/BeNearestQuestionViewer.vue";
import FillEmptySpacesQuestionViewer from "~/components/composed/game/questions/FillEmptySpacesQuestionViewer.vue";

if (!useQuestion().value)
  navigateTo("/game");

definePageMeta({
  layout: "game",
});

const loading = ref<boolean>(false);
const answer = useAnswer();
const question = useQuestion();

const submitted = useSubmitted();
const remainingTime = useRemainingTime();

const submit = async () => {
  loading.value = true;
  await submitAnswer();
  loading.value = false;
};
</script>

<template>
  <div
    data-page="game-challenge"
    class="flex flex-col gap-8 p-6 min-h-dvh"
  >
    <p class="absolute top-6 right-6 font-medium text-muted-foreground text-lg">
      0:{{ remainingTime }}
    </p>

    <template v-if="question">
      <TextQuestionViewer
        v-if="question.type === 'TEXT'"
        :question="question as ITextQuestionBuilder"
        class="flex-1"
      />
      <MediaQuestionViewer
        v-if="question.type === 'IMAGE'"
        :question="question as IMediaQuestionBuilder"
        class="flex-1"
      />
      <BeNearestQuestionViewer
        v-if="question.type === 'NEAREST'"
        :question="question as IBeNearestQuestionBuilder"
        class="flex-1"
      />
      <FillEmptySpacesQuestionViewer
        v-if="question.type === 'FILL'"
        :question="question as IFillEmptySpacesQuestionBuilder"
        class="flex-1"
      />
    </template>

    <Button
      v-if="!submitted"
      :disabled="!answer.length || loading"
      class="self-end"
      @click="submit"
    >
      Envoyer ma réponse
    </Button>
  </div>
</template>
