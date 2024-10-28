<script setup lang="ts">
import { Plus, Minus } from "@iconoir/vue";
import InputWrapper from "~/components/templating/InputWrapper.vue";
import InputLineWrapper from "~/components/templating/InputLineWrapper.vue";
import type { ITextQuestionBuilder } from "~/types/questions";

const props = defineProps<{
  questionId: number;
}>();
const question = ref<ITextQuestionBuilder>(findQuestion(props.questionId) as ITextQuestionBuilder);

type CandidatesAmount = "c2" | "c4";
const candidatesAmount = ref<CandidatesAmount>("c2");

const _answer = computed((): string[] => question.value.specific.answer.map((value: number) => question.value.specific.candidates[value] ?? ""));
const { registerAnswer, unloadAnswer, isInAnswer } = useComposedAnswerConfig<ITextQuestionBuilder>(props.questionId);
</script>

<template>
  <div class="flex flex-col gap-4">
    <InputLineWrapper>
      <InputWrapper class="basis-3/4">
        <Label :for="`${questionId}-question`">Intitulé de la question</Label>
        <Input
          v-model="question.question"
          placeholder="Ex : Quelle est la couleur du cheval blanc d'Henry IV ?"
        />
      </InputWrapper>
      <InputWrapper class="basis-1/4">
        <Label :for="`text-${questionId}-type`">Format de réponse</Label>
        <Select
          :id="`text-${questionId}-type`"
          v-model="candidatesAmount"
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="c2">
              Vrai/Faux
            </SelectItem>
            <SelectItem value="c4">
              QCM
            </SelectItem>
          </SelectContent>
        </Select>
      </InputWrapper>
    </InputLineWrapper>

    <Separator label="Candidats" />
    <InputLineWrapper>
      <InputWrapper class="basis-1/2">
        <Input
          v-model="question.specific.candidates[0]"
          placeholder="Candidat de réponse 1"
        />
        <Button
          v-if="isInAnswer(0)"
          class="absolute top-0 right-0"
          variant="destructive"
          size="icon"
          @click="unloadAnswer(0)"
        >
          <Minus />
        </Button>
        <Button
          v-else
          class="absolute top-0 right-0"
          variant="outline"
          size="icon"
          @click="registerAnswer(0)"
        >
          <Plus />
        </Button>
      </InputWrapper>
      <InputWrapper class="basis-1/2">
        <Input
          v-model="question.specific.candidates[1]"
          placeholder="Candidat de réponse 2"
        />
        <Button
          v-if="isInAnswer(1)"
          class="absolute top-0 right-0"
          variant="destructive"
          size="icon"
          @click="unloadAnswer(1)"
        >
          <Minus />
        </Button>
        <Button
          v-else
          class="absolute top-0 right-0"
          variant="outline"
          size="icon"
          @click="registerAnswer(1)"
        >
          <Plus />
        </Button>
      </InputWrapper>
    </InputLineWrapper>
    <InputLineWrapper v-if="candidatesAmount === 'c4'">
      <InputWrapper class="basis-1/2">
        <Input
          v-model="question.specific.candidates[2]"
          placeholder="Candidat de réponse 3"
        />
        <Button
          v-if="isInAnswer(2)"
          class="absolute top-0 right-0"
          variant="destructive"
          size="icon"
          @click="unloadAnswer(2)"
        >
          <Minus />
        </Button>
        <Button
          v-else
          class="absolute top-0 right-0"
          variant="outline"
          size="icon"
          @click="registerAnswer(2)"
        >
          <Plus />
        </Button>
      </InputWrapper>
      <InputWrapper class="basis-1/2">
        <Input
          v-model="question.specific.candidates[3]"
          placeholder="Candidat de réponse 4"
        />
        <Button
          v-if="isInAnswer(3)"
          class="absolute top-0 right-0"
          variant="destructive"
          size="icon"
          @click="unloadAnswer(3)"
        >
          <Minus />
        </Button>
        <Button
          v-else
          class="absolute top-0 right-0"
          variant="outline"
          size="icon"
          @click="registerAnswer(3)"
        >
          <Plus />
        </Button>
      </InputWrapper>
    </InputLineWrapper>

    <span
      v-if="!!_answer.length"
      class="text-sm text-muted-foreground italic"
    >
      <template v-if="_answer.length === 1">
        La réponse de la question est {{ _answer[0] }}.
      </template>
      <template v-else>
        La réponse de la question est le combo : {{ _answer.join(', ') }}.
      </template>
    </span>
  </div>
</template>
