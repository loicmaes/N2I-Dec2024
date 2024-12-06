<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { generateArray } from "~/lib/utils";
import type { ICreateRoom } from "~/types/room";

const loading = ref<boolean>(false);

const schema = toTypedSchema(z.object({
  roomName: z.string().min(3).max(255),
  difficulty: z.string().default("any"),
  maxPlayers: z.string(),
  questionCount: z.string(),
  playerName: z.string().min(3).max(30),
}));
const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    difficulty: "any",
  },
});
const submit = handleSubmit(async (values) => {
  loading.value = true;
  await createRoom(values as unknown as ICreateRoom);
  setTimeout(async () => {
    await navigateTo(`/game/${useRoom().value?.code}`);
    loading.value = false;
  }, 20);
});
</script>

<template>
  <form
    class="flex flex-col gap-4"
    @submit="submit"
  >
    <div class="flex items-center gap-4">
      <FormField
        v-slot="{ componentField }"
        name="roomName"
      >
        <FormItem class="flex-1">
          <FormLabel>Nom de la salle</FormLabel>
          <FormControl v-bind="componentField">
            <Input placeholder="Les zinzins" />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="difficulty"
      >
        <FormItem class="w-1/3">
          <FormLabel>Difficulté</FormLabel>
          <FormControl v-bind="componentField">
            <Select>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">
                  Toutes difficultés
                </SelectItem>
                <SelectItem value="easy">
                  Facile
                </SelectItem>
                <SelectItem value="medium">
                  Intermédiaire
                </SelectItem>
                <SelectItem value="hard">
                  Difficile
                </SelectItem>
                <SelectItem value="devil">
                  Démon
                </SelectItem>
                <SelectItem value="cyber">
                  Cybersécurité
                </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      </FormField>
    </div>
    <div class="flex items-center gap-4">
      <FormField
        v-slot="{ componentField }"
        name="maxPlayers"
      >
        <FormItem class="flex-1">
          <FormLabel>Nombre de joueurs max.</FormLabel>
          <FormControl v-bind="componentField">
            <Select>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="number in generateArray(9)"
                  :key="`maxPlayes-${number + 2}`"
                  :value="`${number + 2}`"
                >
                  {{ number + 2 }}
                </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="questionCount"
      >
        <FormItem class="flex-1">
          <FormLabel>Nombre de questions</FormLabel>
          <FormControl v-bind="componentField">
            <Select>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="number in generateArray(20)"
                  :key="`questionCount-${number + 1}`"
                  :value="`${number + 1}`"
                >
                  {{ number + 1 }}
                </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      </FormField>
    </div>
    <FormField
      v-slot="{ componentField }"
      name="playerName"
    >
      <FormItem>
        <FormLabel />
        <FormControl v-bind="componentField">
          <Input placeholder="John Doe" />
        </FormControl>
      </FormItem>
    </FormField>

    <Button
      type="submit"
      :disabled="loading"
    >
      <template v-if="loading">
        Création...
      </template>
      <template v-else>
        Créer la salle
      </template>
    </Button>
  </form>
</template>
