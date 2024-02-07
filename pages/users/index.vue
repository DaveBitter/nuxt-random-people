<template>
  <p v-if="pending">Fetching users</p>
  <p v-else-if="error">Error fetching users: {{ error }}</p>
  <div v-else>
    <Toolbar>
      <template #start>{{ data?.requestURL }} </template>

      <template #end>
        <Button @click="refresh" label="Refresh" />
      </template>
    </Toolbar>

    <DataTable :value="formattedData">
      <Column
        v-for="(value, key) in formattedData[0]"
        :key="key"
        :header="key.charAt(0).toUpperCase() + key.slice(1)"
      >
        <template #body="slotProps">
          <span v-html="slotProps.data[key]"></span> </template
      ></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
const { data, pending, error, refresh } = await useFetch("/api/users");

const formatValue = (key: string, value: any) => {
  switch (key) {
    case "image":
      // The image service stopped so we overwrite it
      return `<img src="${value}" alt="user image" />`;
    default:
      return value;
  }
};

const formattedData = computed(() => {
  if (data.value.users) {
    return data.value.users.map((user: any) => {
      const formattedUser: any = {};
      for (const key in user) {
        formattedUser[key] = formatValue(key, user[key]);
      }
      return formattedUser;
    });
  }
  return [];
});

const keys = computed(() => {
  return data.value.users ? Object.keys(data.value.users[0]) : [];
});
</script>

<style>
td img {
  width: 50px;
  height: 50px;
}
</style>
