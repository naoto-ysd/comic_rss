<template>
  <div>
    <h1>APIから取得したデータ一覧</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="item in items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const items = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.example.com/items");
        items.value = response.data;
      } catch (err) {
        error.value = "データの取得に失敗しました。";
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchData);

    return {
      items,
      loading,
      error,
    };
  },
};
</script>

<style>
</style>
