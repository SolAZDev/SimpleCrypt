<template lang="pug">
  q-layout(view='lHh Lpr lFf')
    q-header(elevated)
      q-toolbar
        q-toolbar-title.text-center Simple Crypt
    
    q-page-container
      router-view
    
    q-footer(reveal, elevated)
      q-toolbar
        q-tabs(style="margin:auto;")
          q-route-tab(icon="lock" label="Encryption" to="/EncDec")
          q-route-tab(icon="code" label="Base64" to="/Base64")
          q-route-tab(icon="adjust" label="Morse" to="/Morse")

</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class MainLayout extends Vue {}
</script>
<style lang="sass">
.q-tabs
  margin: auto;
  width: 100%

.q-checkbox
  width: 100%
  height: 100%
  justify-content: center
  font-size: 1.25rem
</style>
