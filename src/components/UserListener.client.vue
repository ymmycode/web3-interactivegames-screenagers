<template>
  <transition name="fade">
    <div v-if="typing" class="text-white flex items-start gap-1">
      <span class="tracking-wider unbounded text-base">Someone is typing </span>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-primary-1" viewBox="0 0 24 24"><circle cx="18" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="6" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle></svg>
    </div>
  </transition>
</template>

<script setup>
const { $ably  } = useNuxtApp();
const channel = $ably.channels.get('globalChatRoom')
const typing = ref(false)

const attachChannel = async () => {
  channel.attach()
  // await channel.presence.update('typing', (member) => {
  //   console.log(member)
  // });
}

onMounted(() => {
  attachChannel()
})

</script>