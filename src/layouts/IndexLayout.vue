<template>
  <NuxtLoadingIndicator :color="'#E3E935'" :height="4" />
  <NuxtPage/>
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