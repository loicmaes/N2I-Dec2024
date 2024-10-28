<script setup lang="ts">
import { Plus } from "@iconoir/vue";
import { Separator } from "~/components/ui/separator";
</script>

<template>
  <div class="flex items-center gap-4 py-4">
    <Separator class="flex-1" />
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="outline"
          class="shrink-0"
        >
          <Plus />
          <span>Nouvelle question</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          class="gap-2"
          @click="addQuestion('text')"
        >
          Texte
        </DropdownMenuItem>
        <DropdownMenuItem
          class="gap-2"
          @click="addQuestion('image')"
        >
          Image
        </DropdownMenuItem>
        <DropdownMenuItem
          class="gap-2"
          @click="addQuestion('video')"
        >
          Vidéo
        </DropdownMenuItem>
        <DropdownMenuItem
          class="gap-2"
          @click="addQuestion('beNearest')"
        >
          Juste prix
        </DropdownMenuItem>
        <DropdownMenuItem
          class="gap-2"
          @click="addQuestion('fillEmptySpaces')"
        >
          Texte à trous
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <Separator class="flex-1" />
  </div>
</template>

<style scoped>

</style>
