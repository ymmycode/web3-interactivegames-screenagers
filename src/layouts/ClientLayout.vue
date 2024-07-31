<template>
  <Body ontouchstart="" class="stage">
    <NuxtPage/>
  </Body>
</template>

<script setup>
useHead({
  script: [
    {
      key: 'prevent-script',
      children: `
          window.addEventListener("nuxt-booster:run", function (e) {
            if (!e.detail.sufficient) {
              // added style class to display the content
              document.querySelector('.stage')?.classList.add('visible')
            }
          });
        `,
    },
  ],
});
</script>