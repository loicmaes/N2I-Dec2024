<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";

const schema = toTypedSchema(z.object({
  playerName: z.string().min(3).max(30),
  code: z.string().regex(/^[A-Z0-9]{6}$/g),
}));
const { handleSubmit } = useForm({
  validationSchema: schema,
});
const submit = handleSubmit(async (values) => {
  console.table(values);
});
</script>

<template>
  <form
    class="flex flex-col gap-4"
    @submit="submit"
  >
    <FormField
      v-slot="{ componentField }"
      name="code"
    >
      <FormItem>
        <FormLabel>Code</FormLabel>
        <FormControl v-bind="componentField">
          <Input placeholder="0EDRFS" />
        </FormControl>
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      name="playerName"
    >
      <FormItem>
        <FormLabel>Nom de joueur</FormLabel>
        <FormControl v-bind="componentField">
          <Input placeholder="John Doe" />
        </FormControl>
        <FormDescription>3 à 30 caractères.</FormDescription>
      </FormItem>
    </FormField>

    <Button type="submit">
      Rejoindre la salle
    </Button>
  </form>
</template>
