<script setup lang="ts">
import TextQuestionSummary from "~/components/composed/game/summary/TextQuestionSummary.vue";
import MediaQuestionSummary from "~/components/composed/game/summary/MediaQuestionSummary.vue";
import BeNearestQuestionSummary from "~/components/composed/game/summary/BeNearestQuestionSummary.vue";
import FillEmptySpacesQuestionSummary from "~/components/composed/game/summary/FillEmptySpacesQuestionSummary.vue";

definePageMeta({
  layout: "game",
});

const question = useQuestion();
const players = useConnectedPlayers();

if (!question.value || !players.value)
  navigateTo("/game");
</script>

<template>
  <div
    data-page="game-roundSummary"
    class="flex flex-col gap-8 p-6 min-h-dvh"
  >
    <template v-if="question">
      <TextQuestionSummary
        v-if="question.type === 'TEXT'"
        class="flex-1"
      />
      <MediaQuestionSummary
        v-if="question.type === 'IMAGE'"
        class="flex-1"
      />
      <BeNearestQuestionSummary
        v-if="question.type === 'NEAREST'"
        class="flex-1"
      />
      <FillEmptySpacesQuestionSummary
        v-if="question.type === 'FILL'"
        class="flex-1"
      />
    </template>
  </div>
</template>
