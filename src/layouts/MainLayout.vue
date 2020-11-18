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
          q-tab(icon="lock" label="Encryption")
          q-tab(icon="code" label="Base64")
          q-tab(icon="adjust" label="Morse")

</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class MainLayout extends Vue {}
</script>
