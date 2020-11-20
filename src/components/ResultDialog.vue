<template lang="pug">
    q-dialog(v-model='show', persistent)
            q-card
                q-card-section
                    .row
                        .col-11
                            h6 Results
                        .col-1
                            q-icon(name="close" @click="$emit('close')")
                q-separator
                q-card-section
                    .row
                        .col-11
                            h6 Content
                        .col-1
                            q-icon(name='content_copy' @click="CopyContent()")
                        .col-12(style="margin-top:.5rem")
                            code {{content}}
</template>
script:
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ResultDialog extends Vue {
  @Prop({ type: String, required: true }) readonly content!: string;
  @Prop({ type: String, default: '' }) readonly password!: string;
  @Prop({ type: Boolean, required: true, default: false }) show!: boolean;

  CopyPassword() {
    navigator.clipboard.writeText(this.password);
  }
  CopyContent() {
    navigator.clipboard.writeText(this.content);
  }
  CloseDialog() {
    this.show = false;
  }
}
</script>
style:<style lang="sass">
h6
    margin: 0px

hr

.q-card
    min-width: 60vw
    max-width: 95vw
    padding: .5rem 0 .5rem 0

.q-separator
    visibility: hidden
    // border-bottom: 1px solid #ccc
    // margin: 0 5px 0 5px;

.q-icon
    // margin: auto
    width: 100%
    height: 100%

code
    padding: 15px
    margin: 5px
    background: #cecece
</style>
