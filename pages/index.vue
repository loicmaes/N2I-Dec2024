<script setup lang="ts">
import { Gamepad, Medal, MediaImage, Check, Circle, Eye } from "@iconoir/vue";
import { stringifyDate } from "~/lib/dates";
import steps from "~/assets/fakeData/nightSteps";
import team from "~/assets/fakeData/team";
import quotes from "~/assets/fakeData/quotes";
import images from "~/assets/fakeData/images";

useHead({
  title: "A2CM - Édition 2024",
});

const getStepIndex = (): number => {
  const now = Date.now();
  let step = 0;

  for (const _step of steps)
    if (_step.time.getTime() <= now && _step.step > step)
      step = _step.step;

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
      class="min-h-dvh flex items-stretch gap-4 py-32"
    >
      <header class="flex flex-col items-start justify-center gap-6 basis-1/2">
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
        <div class="flex items-center gap-2 mt-8">
          <Button
            as-child
            class="gap-2"
          >
            <NuxtLink to="/game">
              <Gamepad />
              <span>Jouons un peu</span>
            </NuxtLink>
          </Button>
          <Button
            variant="outline"
            as-child
            class="gap-2"
          >
            <NuxtLink to="/game">
              <Eye />
              <span>Explorons le concept</span>
            </NuxtLink>
          </Button>
        </div>
      </header>
      <div class="basis-1/2 bg-primary/10 grid place-items-center rounded-xl">
        <MediaImage class="h-24 w-24 text-primary opacity-25" />
      </div>
    </section>

    <section
      data-section="galery"
      class="flex flex-col gap-10 py-32"
    >
      <h2 class="text-4xl font-extrabold text-center">
        Nos souvenirs
      </h2>

      <span class="block h-0.5 w-1/2 mx-auto bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />

      <div
        class="grid grid-cols-3 gap-2"
      >
        <div
          v-for="(group, index) in images"
          :key="`group-${index}`"
          class="flex flex-col gap-2"
        >
          <NuxtImg
            v-for="image in group"
            :key="image"
            :src="image"
            :placeholder="[50, 25, 75, 5]"
            class="rounded-md"
          />
        </div>
      </div>
    </section>

    <section
      data-section="quotes"
      class="flex flex-col gap-10 pt-24 pb-16 rounded-xl bg-primary text-primary-foreground"
    >
      <h2 class="text-4xl font-extrabold text-center">
        Les délires de la nuit
      </h2>

      <span class="block h-0.5 bg-gradient-to-l from-transparent via-primary-foreground/25 to-transparent w-1/2 mx-auto" />

      <div class="grid grid-cols-3 gap-6 px-16">
        <Card
          v-for="quote in quotes"
          :key="JSON.stringify(quote)"
          class="bg-background/10 text-foreground-primary border-primary-foreground/25"
        >
          <CardHeader class="flex-row items-center gap-4">
            <Avatar>
              <AvatarImage
                v-if="team[quote.author].avatar"
                :src="team[quote.author].avatar ?? ''"
              />
              <AvatarFallback>{{ team[quote.author].name.split(" ").map(part => part.substring(0, 1)).join("") }}</AvatarFallback>
            </Avatar>
            <div class="flex flex-col">
              <p class="text-lg font-bold leading-tight">
                {{ team[quote.author].name }}
              </p>
              <span class="text-sm opacity-60">{{ team[quote.author].role }}</span>
            </div>
          </CardHeader>
          <CardContent>
            <p class="text-lg italic font-semibold leading-tight">
              "{{ quote.content }}"
            </p>
          </CardContent>
          <CardFooter class="justify-end">
            <p class="text-xs opacity-40">
              {{ stringifyDate(quote.time) }}
            </p>
          </CardFooter>
        </Card>
      </div>
    </section>

    <section
      data-section="details"
      class="flex flex-col gap-10 py-24"
    >
      <h2 class="text-4xl font-extrabold text-center">
        Détails de la nuit
      </h2>

      <span class="block h-0.5 w-1/2 mx-auto bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />

      <div class="flex gap-12">
        <div class="grid place-items-center basis-1/2 bg-primary/10 rounded-xl">
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
