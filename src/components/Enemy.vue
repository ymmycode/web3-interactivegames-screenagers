<template>
  <Suspense>
    <AnimatedSprite
      image="/boss-animation.png"
      atlas="/boss-animation.json"
      animation="idle"
      :fps="5"
      :loop="true"
      :center="[0.5, 0.5]"
      :scale="[3.9, 3.9]"
    />
  </Suspense>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>