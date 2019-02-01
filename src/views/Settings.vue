<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <h1>Settings</h1>
        <h3>Clear storage</h3>
        <p>The button below will clear indexeddb of all stored sessions and recordings.</p>
        <v-btn class="ma-0" color="primary" @click="$store.dispatch('resetLocalDb')">Clear</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

