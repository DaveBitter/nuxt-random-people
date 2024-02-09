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
      <Column>
        <template #body="slotProps">
          <NuxtLink :to="`/users/${slotProps.data.id}`">
            <Button label="View" link />
          </NuxtLink>
        </template>
      </Column>
      <Column
        v-for="(value, key) in formattedData[0]"
        sortable
        :key="key"
        :field="key"
        :header="key.charAt(0).toUpperCase() + key.slice(1)"
      >
        <template #body="slotProps">
          <span v-html="slotProps.data[key]"></span>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
const { data, pending, error, refresh } = await useFetch("/api/users");

// store the data in local storage to persist between navigation. NEVER DO THIS IN AN ACTUAL APP
if (typeof window !== "undefined") {
  window.localStorage.setItem("users", JSON.stringify(data.value.users));
}
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
</script>

<style>
td img {
  width: 50px;
  height: 50px;
}
</style>
