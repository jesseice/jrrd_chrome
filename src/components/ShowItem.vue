<template>
  <div class="show_item">
    <div
      class="title"
      :style="{
        backgroundColor: item.bgColor,
        backgroundImage: `url(${item.bgImg})`,
      }"
    >
      <div style="display: flex; align-items: center; gap: 8px">
        <div class="logo_wrap">
          <img :src="item.logo" />
        </div>
        {{ item.name }}
        <ReloadOutlined v-if="isExpand" @click="refresh" />
      </div>
      <a
        @click="isExpand = !isExpand"
        :class="{ rotate: isExpand }"
        style="transition: 0.6s"
      >
        <CaretDownOutlined />
      </a>
    </div>
    <template v-if="isExpand">
      <div class="zk">
        <div
          class="content"
          style="display: flex; justify-content: center; align-items: center"
          v-if="loading"
        >
          <Spin />
        </div>
        <div v-else="!loading" class="content">
          <div class="item" v-for="child in dataSource" :key="child.id">
            <Popover v-if="item.hasPopover" :title="child.title">
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
              <p
                :style="{ color: item.titleColor }"
                @click="openLink(child.link)"
              >
                {{ child.title }}
              </p>
            </Popover>
            <p
              v-else
              :style="{ color: item.titleColor }"
              @click="openLink(child.link)"
            >
              {{ child.title }}
            </p>
            <div v-if="child.hot" style="text-align: left">
              <span style="color: red"><FireOutlined /></span> {{ child.hot }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { ContentType, TopMsgType } from "./this.d";
import {
  FireOutlined,
  CaretDownOutlined,
  ReloadOutlined,
} from "@ant-design/icons-vue";
import { Popover, Spin } from "ant-design-vue";

const isExpand = ref(false);

const props = defineProps<{
  item: TopMsgType;
}>();

const dataSource = ref<ContentType[]>([]);
const loading = ref(false);

onMounted(() => {
  refresh();
});

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
    padding: 0 16px 0 4px;
    color: #fff;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .rotate {
      transform: rotate(180deg);
    }
    .logo_wrap {
      height: 24px;
      width: 24px;
      border-radius: 50%;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 16px;
        height: 16px;
      }
    }
    a {
      cursor: pointer;
      color: #fff;
    }
  }
  .zk {
    transition: 1s;
    animation: zhankai linear 0.5s;
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
        width: 80px;
        text-align: center;
      }
    }
  }
}

@keyframes shouqi {
  0% {
    height: 416px;
  }
  50% {
    height: 208px;
  }
  100% {
    height: 0;
  }
}
@keyframes zhankai {
  0% {
    height: 0;
  }
  50% {
    height: 208px;
  }
  100% {
    height: 416px;
  }
}
</style>
