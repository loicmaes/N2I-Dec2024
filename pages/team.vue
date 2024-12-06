<script setup lang="ts">
import { MouseScrollWheel, MediaImage, Github, Instagram, Linkedin, Globe, Mail, Phone, Calendar } from "@iconoir/vue";
import team from "~/assets/fakeData/team";
import { HoverCard, HoverCardTrigger } from "~/components/ui/hover-card";

useHead({
  title: "A2CM - Notre équipe",
});

const firstMember = ref<HTMLElement | null>(null);
const scrollToDiscover = () => firstMember.value?.scrollIntoView({ behavior: "smooth", block: "center" });
</script>

<template>
  <div data-page="team">
    <section
      data-section="hero"
      class="py-64 flex gap-2"
    >
      <div class="px-1 flex flex-col gap-4 justify-center items-start basis-1/2">
        <div class="flex items-center gap-2 text-primary">
          <Calendar />
          <span class="underline underline-offset-4">Depuis 2022</span>
        </div>
        <h1 class="text-6xl font-black">
          Une belle bande de joyeux lurons
        </h1>
        <p class="max-w-[65ch] text-muted-foreground leading-loose">
          Nous sommes {{ team.length }} passionnés à la recherche constante de nouveaux défis. Tous professionnel de notre domaine, chacun a son rôle et c'est très bien comme ça !
        </p>
        <Button
          class="gap-2 mt-8"
          @click="scrollToDiscover"
        >
          <MouseScrollWheel />
          <span>Découvre-nous</span>
        </Button>
      </div>

      <div class="grid place-items-center bg-primary/10 basis-1/2 min-h-[50dvh] rounded-xl">
        <MediaImage class="h-20 w-20 text-primary opacity-25" />
      </div>
    </section>

    <section
      ref="firstMember"
      data-section="members"
      class="grid grid-cols-2 gap-4"
    >
      <Card
        v-for="member in team"
        :key="member.name"
      >
        <CardHeader class="flex-row gap-4">
          <div class="basis-1/2 flex flex-col justify-between">
            <div class="flex items-center gap-4">
              <Avatar size="base">
                <AvatarImage
                  v-if="member.avatar"
                  :src="member.avatar ?? ''"
                />
                <AvatarFallback>{{ member.name.split(" ").map(part => part.substring(0, 1)).join("") }}</AvatarFallback>
              </Avatar>
              <div class="space-y-2">
                <span class="text-sm underline underline-offset-4 text-primary">{{ member.role }}</span>
                <CardTitle>{{ member.name }}</CardTitle>
              </div>
            </div>

            <div
              v-if="member.contact"
              class="flex items-center gap-2"
            >
              <Button
                as-child
              >
                <NuxtLink :to="`mailto:${member.contact.mail}`">
                  <Mail />
                  <span>On s'écrit ?</span>
                </NuxtLink>
              </Button>
              <Button
                v-if="member.contact.phone"
                variant="secondary"
                as-child
              >
                <NuxtLink :to="`tel:${member.contact.phone}`">
                  <Phone />
                  <span>On s'appelle ?</span>
                </NuxtLink>
              </Button>
            </div>
          </div>
          <div class="basis-1/2">
            <p class="text-muted-foreground">
              {{ member.description }}
            </p>
          </div>
        </CardHeader>
        <CardContent class="grid grid-cols-2 gap-4 p-6 border-y border-y-border">
          <div v-if="member.favouriteColour">
            <h3 class="text-lg font-extrabold">
              Couleur préférée
            </h3>
            <p class="text-muted-foreground">
              Sa couleur préférée est le <HoverCard>
                <HoverCardTrigger>
                  <span
                    class="cursor-pointer underline underline-offset-4"
                    :style="`color: ${member.favouriteColour.code.hex}`"
                  >{{ member.favouriteColour.name }}</span>
                </HoverCardTrigger>
                <HoverCardContent class="flex flex-col gap-2">
                  <span
                    class="block w-full h-2 aspect-square rounded-full mb-2"
                    :style="`background-color: ${member.favouriteColour.code.hex}`"
                  />
                  <div class="flex items-center gap-3">
                    <span class="text-sm font-bold opacity-20">HEX</span>
                    <p>{{ member.favouriteColour.code.hex }}</p>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-sm font-bold opacity-20">RVB</span>
                    <p>{{ member.favouriteColour.code.rgb }}</p>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-sm font-bold opacity-20">HSL</span>
                    <p>{{ member.favouriteColour.code.hsl }}</p>
                  </div>
                </HoverCardContent>
              </HoverCard> comme {{ member.favouriteColour.compare }}.
            </p>
          </div>
          <div v-if="member.mantra">
            <h3 class="text-lg font-extrabold">
              Mantra
            </h3>
            <p class="text-muted-foreground">
              "<span class="italic">{{ member.mantra }}</span>"
            </p>
          </div>
          <div>
            <h3 class="text-xl font-extrabold">
              Qualités
            </h3>
            <template v-if="member.persona.qualities.length">
              <ul class="list-disc ml-4 text-muted-foreground">
                <li
                  v-for="quality in member.persona.qualities"
                  :key="quality"
                >
                  {{ quality }}
                </li>
              </ul>
            </template>
            <template v-else>
              <p class="text-muted-foreground">
                Il n'a pas de qualités, que c'est triste...
              </p>
            </template>
          </div>
          <div>
            <h3 class="text-xl font-extrabold">
              Défauts
            </h3>
            <template v-if="member.persona.flaws.length">
              <ul class="list-disc ml-4 text-muted-foreground">
                <li
                  v-for="flaw in member.persona.flaws"
                  :key="flaw"
                >
                  {{ flaw }}
                </li>
              </ul>
            </template>
            <template v-else>
              <p class="text-muted-foreground">
                Il n'a pas de défaut, quel homme parfait !
              </p>
            </template>
          </div>
        </CardContent>
        <CardFooter
          v-if="member.social"
          class="flex justify-center items-center gap-2 p-4"
        >
          <Button
            v-if="member.social.web"
            variant="ghost"
            size="icon"
            as-child
          >
            <NuxtLink
              :to="member.social.web"
              target="_blank"
            >
              <Globe />
            </NuxtLink>
          </Button>
          <Button
            v-if="member.social.github"
            variant="ghost"
            size="icon"
            as-child
          >
            <NuxtLink
              :to="`https://github.com/${member.social.github}`"
              target="_blank"
            >
              <Github />
            </NuxtLink>
          </Button>
          <Button
            v-if="member.social.linkedin"
            variant="ghost"
            size="icon"
            as-child
          >
            <NuxtLink
              :to="`https://www.linkdedin.com/in/${member.social.linkedin}`"
              target="_blank"
            >
              <Linkedin />
            </NuxtLink>
          </Button>
          <Button
            v-if="member.social.instagram"
            variant="ghost"
            size="icon"
            as-child
          >
            <NuxtLink
              :to="`https://www.instagram.com/${member.social.instagram}`"
              target="_blank"
            >
              <Instagram />
            </NuxtLink>
          </Button>
        </CardFooter>
      </Card>
    </section>
  </div>
</template>
