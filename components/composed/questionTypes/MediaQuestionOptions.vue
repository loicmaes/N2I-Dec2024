<script setup lang="ts">
import { Minus, Plus } from "@iconoir/vue";
import type { IMediaQuestionBuilder } from "~/types/questions";
import InputWrapper from "~/components/templating/InputWrapper.vue";
import InputLineWrapper from "~/components/templating/InputLineWrapper.vue";

const props = defineProps<{ questionId: number }>();
const question = ref<IMediaQuestionBuilder>(findQuestion(props.questionId) as IMediaQuestionBuilder);

type SrcType = "file" | "link";
const srcType = ref<SrcType>("link");

type CandidatesAmount = "c2" | "c4";
const candidatesAmount = ref<CandidatesAmount>("c2");

const _answer = computed((): string[] => question.value.specific.answer.map((value: number) => question.value.specific.candidates[value] ?? ""));
const { registerAnswer, unloadAnswer, isInAnswer } = useComposedAnswerConfig<IMediaQuestionBuilder>(props.questionId);
</script>

<template>
  <div class="flex flex-col gap-4">
    <InputLineWrapper>
      <InputWrapper class="basis-1/4">
        <Label :for="`${questionId}-src`">Type de source</Label>
        <Select
          :id="`${questionId}-src`"
          v-model="srcType"
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="link">
              Lien Web
            </SelectItem>
            <SelectItem value="file">
              Fichier
            </SelectItem>
          </SelectContent>
        </Select>
      </InputWrapper>
      <InputWrapper class="basis-3/4">
        <template v-if="srcType === 'file'">
          <Label :for="`${questionId}-file`">Fichier</Label>
          <Input
            :id="`${questionId}-file`"
            type="file"
            accept="image/*"
          />
        </template>
        <template v-else>
          <Label :for="`${questionId}-link`">Lien Web</Label>
          <Input
            :id="`${questionId}-link`"
            placeholder="Ex : https://images.google.com/"
          />
        </template>
      </InputWrapper>
    </InputLineWrapper>
    <InputLineWrapper>
      <InputWrapper class="basis-3/4">
        <Label :for="`${questionId}-question`">Intitulé de la question</Label>
        <Input
          :id="`${questionId}-question`"
          v-model="question.question"
          placeholder="Ex : Quelle est la couleur du cheval blanc d'Henry IV ?"
        />
      </InputWrapper>
      <InputWrapper class="basis-1/4">
        <Label :for="`${questionId}-format`">Format de réponse</Label>
        <Select
          :id="`${questionId}-format`"
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
