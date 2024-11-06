<template>
  <div class="show_item">
    <div class="title" :style="{ backgroundColor: item.bgColor }">
      {{ item.name }}
      <a @click="refresh">刷新</a>
    </div>
    <div class="content" style="display: flex; justify-content: center; align-items: center;" v-if="loading">
      <Spin />
    </div>
    <div v-else class="content">
      <div class="item" v-for="child in dataSource" :key="child.id">
        <Popover>
          <template #content>
            <div
              style="
                display: flex;
                height: 80px;
                align-items: center;
                justify-content: center;
                gap: 8px;
              "
            >
              <img
                v-if="child.img"
                :src="child.img"
                style="width: 60px; height: 60px"
              />
              <div
                v-if="child.desc"
                style="height: 60px; width: 200px; overflow-y: auto"
              >
                <p>{{ child.desc }}</p>
              </div>
            </div>
          </template>
          <p :style="{ color: item.titleColor }" @click="openLink(child.link)">
            {{ child.title }}
          </p>
        </Popover>
        <div style="text-align: left">
          <span style="color: red"><FireOutlined /></span> {{ child.hot }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ContentType, TopMsgType } from "./this.d";
import { FireOutlined } from "@ant-design/icons-vue";
import { Popover, Spin } from "ant-design-vue";

const props = defineProps<{
  item: TopMsgType;
}>();

const dataSource = ref<ContentType[]>([]);
const loading = ref(false);

const refresh = async () => {
  loading.value = true;
  dataSource.value = await chrome.runtime.sendMessage({
    apiName: props.item.apiName,
  });
  loading.value = false;
  console.log("[dataSource.value ] ---> ", dataSource.value);
};

const openLink = (url: string) => {
  chrome.tabs.create({ url });
};
</script>
<style lang="less" scoped>
.show_item {
  border-radius: 16px;
  border: 1px solid #f2f2f2;
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  .title {
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    margin-bottom: 8px;
    padding: 0 16px;
    color: #fff;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
      cursor: pointer;
      color: #fff;
    }
  }
  .content {
    padding: 8px;
    height: 416px;
    overflow-y: auto;
    .item {
      padding: 4px 6px;
      border-bottom: 1px solid #f2f2f2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      cursor: pointer;
      margin-bottom: 4px;
      &:hover {
        background-color: #f2f2f2;
      }

      p {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
      div {
        width: 100px;
        text-align: center;
      }
    }
  }
}
</style>
