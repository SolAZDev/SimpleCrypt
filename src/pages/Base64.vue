<template lang="pug">
q-page( padding) 
    q-form.q-gutter-md
        .row
            .col-12
                q-input(filled v-model='Input.message', type='textarea', label='Message') 
            .col-12.col-md-6
                input#FileUpload(type="file", style="display:none;")
                q-btn.w-100(color='primary' for="FileUpload") 
                    q-icon(name='attach_file')
                    |
                    span Select File
            .col-12.col-md-6
                q-checkbox( v-model="Decode", label='Decrypt?')
            .col-12(style="margin-top:.5rem;")
                q-btn.w-100(color='primary', icon='check', label='Start', @click='StartProcess()') 
        //- div
            q-btn(label='Submit', type='submit', color='primary')
                q-btn.q-ml-sm(label='Reset', type='reset', color='primary', flat)

    ResultDialog(:content="Result.message", :show="ShowResults" @close="ShowResults=!ShowResults")
        
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { TransformableBase } from '../models/models';
import ResultDialog from 'components/ResultDialog.vue';
@Component({
  components: { ResultDialog }
})
export default class Base64 extends Vue {
  Input!: TransformableBase;
  Decode = false;
  ShowResults = false;
  Result: TransformableBase = { message: '' };
  created() {
    this.Input = { message: '' };
  }

  StartProcess() {
    console.log(this.Input);
    this.Result = {
      message: this.Decode ? atob(this.Input.message) : btoa(this.Input.message)
    };
    this.ShowResults = true;
  }
}
</script>
<style lang="sass">
.w-100
    width: 100%;

.row
    .col
        margin: 5px;
        padding: 5px;
</style>
