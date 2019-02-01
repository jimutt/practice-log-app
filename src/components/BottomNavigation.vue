<template>
  <v-bottom-nav :value="true" absolute color="white" class="bottom-navigation">
    <v-btn color="secondary" flat to="/">
      <span>Practice</span>
      <v-icon>music_note</v-icon>
    </v-btn>

    <v-btn color="secondary" flat to="/history">
      <span>History</span>
      <v-icon>history</v-icon>
    </v-btn>

    <v-btn color="secondary" flat to="/settings">
      <span>Settings</span>
      <v-icon>settings</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
export default {};
</script>

<style lang="scss">
</style>

