<template>
  <div class="unbounded text-primary-1 text-base-constant">
    SCORE <br>
    <div class="unbounded font-light text-primary-1 text-score-constant">{{ 100000 }}</div>
  </div>
</template>

<script setup>
const mainStore = useMainStore()
const { score } = storeToRefs(mainStore)
</script>