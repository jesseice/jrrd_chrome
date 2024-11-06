<template>
  <ShowItem v-for="key in Object.keys(platformHex)" :key="key" :item="platformHex[key]" />
</template>
<script lang="ts" setup>
import ShowItem from "./ShowItem.vue";
import { platformHex } from "./config";

</script>
