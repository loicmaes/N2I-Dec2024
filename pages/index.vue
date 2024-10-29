<script setup lang="ts">
import { Gamepad, Medal, MediaImage, Check, Circle } from "@iconoir/vue";
import { stringifyDate } from "~/lib/dates";

useHead({
  title: "A2CM - Édition 2024",
});

type Step = {
  step: number;
  time: Date;
  title: string;
  description: string;
};
const steps: Step[] = [
  {
    step: 1,
    time: new Date("Dec, 5 2024 16:39"),
    title: "Début de la nuit",
    description: "Les organisateurs présentent l'événement et distribuent les sujets. Après quoi les participants prennent le temps de découvrir les défis proposés pour la nuit et de choisir les 5 défis en plus de celui de la nuit qu'ils souhaitent essayer de relever au mieux.",
  },
  {
    step: 2,
    time: new Date("Dec, 6 2024 8:04"),
    title: "Fin de la nuit",
    description: "Si les livrables n'ont pas été rendus : trop tard. L'horloge a sonné la fin de la nuit, il est l'heure de reprendre nos vies comme si cette nuit n'avait été qu'une autre nuit passionnée à travailler sur un projet passionnant.",
  },
];
const getStepIndex = (): number => {
  const now = Date.now();
  let step = 0;
  if (now >= new Date("Dec, 5 2024 16:39").getTime()) step = 1;
  console.log(new Date("Dec, 5 2024 16:39"));

  return step;
};
const stepIndex = ref<number>(getStepIndex());
</script>

<template>
  <div
    data-page="home"
    class="min-h-dvh"
  >
    <section
      data-section="hero"
      class="min-h-dvh flex items-center gap-4"
    >
      <header class="flex flex-col items-start gap-6 basis-1/2">
        <div class="-mb-4 flex items-center gap-2 text-sm text-primary">
          <Medal />
          <NuxtLink
            class="underline underline-offset-4"
            to="https://www.nuitdelinfo.com/"
          >
            Nuit de l'Info 2024
          </NuxtLink>
        </div>
        <h1 class="text-6xl font-black">
          Une nuit, <br>Un jeu sérieux
        </h1>
        <p class="max-w-[55ch] text-muted-foreground leading-relaxed">
          Ce défi créatif s'est déroulé du coucher au lever du soleil, laissant aux participants une seule nuit pour concevoir un jeu web à la fois captivant et porteur de sens. Ici, découvrez le fruit de cette aventure : un jeu pensé pour instruire, sensibiliser et divertir, né de la passion de l'imagination de développeurs et créatifs unis par le défi d'une nuit.
        </p>
        <Button
          as-child
          class="gap-2 mt-8"
        >
          <NuxtLink to="/game">
            <Gamepad />
            <span>Jouons un peu</span>
          </NuxtLink>
        </Button>
      </header>
      <div class="min-h-dvh basis-1/2 bg-primary/10 grid place-items-center">
        <MediaImage class="h-24 w-24 text-primary opacity-25" />
      </div>
    </section>

    <section
      data-section="details"
      class="flex flex-col gap-6 py-32"
    >
      <h2 class="text-4xl font-extrabold text-center">
        Détails de la nuit
      </h2>
      <div class="flex gap-12">
        <div class="grid place-items-center basis-1/2 bg-primary/10">
          <MediaImage class="text-primary opacity-25 h-20 w-20" />
        </div>
        <div class="basis-1/2 py-6">
          <Stepper
            v-model="stepIndex"
            orientation="vertical"
            class="flex w-full flex-col justify-start gap-10 basis-1/2"
          >
            <StepperItem
              v-for="step in steps"
              :key="step.step"
              v-slot="{ state }"
              class="w-full relative flex items-start gap-6"
              :step="step.step"
            >
              <StepperSeparator
                v-if="step.step !== steps[steps.length - 1].step"
                class="absolute left-[18px] top-[38px] block h-[105%] w-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
              />

              <StepperTrigger as-child>
                <Button
                  :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
                  size="icon"
                  class="z-10 rounded-full shrink-0 pointer-events-none"
                  :class="[state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']"
                >
                  <Check
                    v-if="state === 'completed'"
                    class="size-5"
                  />
                  <Circle v-if="state === 'active'" />
                  <span v-if="state === 'inactive'">·</span>
                </Button>
              </StepperTrigger>

              <div class="flex flex-col gap-1">
                <span class="text-xs text-primary">{{ stringifyDate(step.time) }}</span>
                <StepperTitle>{{ step.title }}</StepperTitle>
                <StepperDescription>{{ step.description }}</StepperDescription>
              </div>
            </StepperItem>
          </Stepper>
        </div>
      </div>
    </section>
  </div>
</template>
