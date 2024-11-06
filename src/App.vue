<template>
  <div class="plugin_wrap">
    <Message />
  </div>
</template>
<script lang="ts" setup>
import Message from "./components/Message.vue";
console.log("[测试侧边] ---> ", "测试侧边");
</script>
<style scoped>
.plugin_wrap {
  padding: 16px;
}
</style>
