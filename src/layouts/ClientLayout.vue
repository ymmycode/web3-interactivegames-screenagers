<template>
  <Body 
    ontouchstart="" 
    class="stage"
    style="touch-action: manipulation; -webkit-touch-callout: none; -webkit-user-select: none; -webkit-tap-highlight-color: transparent; user-select: none; -webkit-text-size-adjust: 100%;"
  >
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