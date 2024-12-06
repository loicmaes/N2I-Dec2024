<script setup lang="ts">
import { Plus, Upload } from "@iconoir/vue";
import QuestionLine from "~/components/composed/QuestionLine.vue";
import AddQuestionButton from "~/components/composed/AddQuestionButton.vue";
import InputWrapper from "~/components/templating/InputWrapper.vue";

definePageMeta({
  layout: "admin",
});
useHead({
  title: "Admin · Builder",
});

const questions = useQuestionConfig();
const importData = ref();
</script>

<template>
  <div data-page="admin-builder">
    <template v-if="questions.length">
      <div class="flex flex-col gap-2">
        <QuestionLine
          v-for="({ id }, index) in questions"
          :key="`question-${index}${Math.floor(Math.random() * 100)}`"
          :question-id="id"
        />
        <AddQuestionButton />
      </div>
    </template>
    <template v-else>
      <div class="flex flex-col items-center gap-6 py-20">
        <div class="flex flex-col items-center">
          <h2 class="text-4xl font-extrabold">
            Oh non...
          </h2>
          <p class="text-muted-foreground">
            Il n'y a pas encore de questions pour le moment...
          </p>
        </div>
        <div class="flex gap-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button class="gap-2">
                <Plus />
                <span>Nouvelle question</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                class="gap-2"
                @click="addQuestion('TEXT')"
              >
                Texte
              </DropdownMenuItem>
              <DropdownMenuItem
                class="gap-2"
                @click="addQuestion('IMAGE')"
              >
                Image
              </DropdownMenuItem>
              <DropdownMenuItem
                class="gap-2"
                @click="addQuestion('VIDEO')"
              >
                Vidéo
              </DropdownMenuItem>
              <DropdownMenuItem
                class="gap-2"
                @click="addQuestion('NEAREST')"
              >
                Juste prix
              </DropdownMenuItem>
              <DropdownMenuItem
                class="gap-2"
                @click="addQuestion('FILL')"
              >
                Texte à trous
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog>
            <DialogTrigger>
              <Button
                variant="outline"
                class="gap-2"
              >
                <Upload />
                <span>Importer un JSON</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import</DialogTitle>
                <DialogDescription>Importer un JSON existant permet de continuer la modification de quelqu'un d'autre ou de reprendre là où vous en étiez en ayant oublié de sauvegarder dans votre session.</DialogDescription>
              </DialogHeader>

              <InputWrapper>
                <Label for="import-json">Donnée</Label>
                <Textarea
                  id="import-json"
                  v-model="importData"
                  class="min-h-64"
                  placeholder="Entre le JSON à importer"
                />
              </InputWrapper>

              <DialogFooter>
                <Button
                  class="gap-2"
                  @click="loadJson(importData)"
                >
                  <Upload />
                  <span>Importer</span>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </template>
  </div>
</template>
