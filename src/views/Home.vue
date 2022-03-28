<template>
  <div class="home">膝盖提交规范={{ userName }}</div>
  <p><el-button type="">按钮</el-button></p>
  <panel></panel>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { GlobalPorps } from '@/store/index'
export default defineComponent({
  name: 'Home',
  setup() {
    const store = useStore<GlobalPorps>()
    const userName = computed(() => store.state.userName)
    return {
      userName
    }
  }
})
</script>
