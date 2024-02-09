<template>
  <Card style="width: 25rem; overflow: hidden; margin: 0 auto" v-if="userData">
    <template #header>
      <img
        style="background: red; width: 100%; object-fit: cover"
        alt="user header"
        :src="userData.image"
      />
    </template>
    <template #title>{{ userData.firstname }} {{ userData.lastname }}</template>
    <template #subtitle
      >User ID:
      <code>{{ userData.id }}</code>
    </template>
    <template #content>
      <dl>
        <div>
          <dt>firstname</dt>
          <dd>{{ userData.firstname }}</dd>
        </div>
        <div>
          <dt>lastname</dt>
          <dd>{{ userData.lastname }}</dd>
        </div>
        <div>
          <dt>email</dt>
          <dd>{{ userData.email }}</dd>
        </div>
        <div>
          <dt>phone</dt>
          <dd>{{ userData.phone }}</dd>
        </div>
        <div>
          <dt>birthday</dt>
          <dd>{{ userData.birthday }}</dd>
        </div>
        <div>
          <dt>gender</dt>
          <dd>{{ userData.gender }}</dd>
        </div>
        <div>
          <dt>address</dt>
          <dd>{{ userData.address }}</dd>
        </div>
        <div>
          <dt>website</dt>
          <dd>{{ userData.website }}</dd>
        </div>
        <div>
          <dt>image</dt>
          <dd>{{ userData.image }}</dd>
        </div>
      </dl>
    </template>
  </Card>
</template>

<script setup lang="ts">
let userData = ref(null);
const route = useRoute();

if (typeof window !== "undefined") {
  userData = JSON.parse(window.localStorage.getItem("users") || "[]").find(
    (user: any) => user.id === Number(route.params.id)
  );
}
</script>
