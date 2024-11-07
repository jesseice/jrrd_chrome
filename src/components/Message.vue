<template>
  <ShowItem
    v-for="key in Object.keys(platformHex)"
    :key="key"
    :item="platformHex[key]"
  />
  <span>当前版本：{{ version }}</span>
  <a v-if="hasNewVerions" style="margin-left: 8px">有新版本</a>
  <a @click="download" style="margin-left: 8px; cursor: pointer">点击下载最新版本</a>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import ShowItem from "./ShowItem.vue";
import { platformHex } from "./config";

const { version } = chrome.runtime.getManifest();

const newVerion = ref("");
const downloadUrl = ref("");

const hasNewVerions = computed(() => newVerion.value !== version);

onMounted(() => {
  getVersion();
});

const getVersion = async () => {
  const res = await fetch("http://1.14.209.241:3000/version/yjrld");
  const response = await res.json();
  newVerion.value = response.version;
  downloadUrl.value = response.url;
};

const download = () => {
  chrome.tabs.create({ url: downloadUrl.value });
};
</script>
