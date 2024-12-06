<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

type InputOrientation = "vertical" | "horizontal";
const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"];
  orientation?: InputOrientation;
}>(), {
  orientation: "vertical",
});
</script>

<template>
  <div :class="cn('relative flex gap-2', orientation === 'horizontal' ? 'flex-row' : 'flex-col', props.class)">
    <slot />
  </div>
</template>
