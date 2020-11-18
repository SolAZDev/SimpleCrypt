<template lang="pug">
    q-page( padding) 
        q-form.q-gutter-md
            .row
                .col-12
                    q-input(filled v-model='Input.message', type='textarea', label='Message') 
                .col-12
                    input#FileUpload(type="file", style="display:none;")
                    q-btn.w-100(color='primary', icon='file', label='Select File Input.file') 
                .col-12
                    q-checkbox( v-model="Decode", label='Decrypt?')
                .col-12
                    q-btn(color='primary', icon='check', label='Start', @click='StartProcess()') 
            //- div
                q-btn(label='Submit', type='submit', color='primary')
                    q-btn.q-ml-sm(label='Reset', type='reset', color='primary', flat)

        q-dialog(v-model='ShowResults', persistent)
            q-card
                q-card-section.row.items-center
                    //- .row    
                        .col-11
                            h2 Result
                        .col-1
                            h2 X
                    .row
                        .col-12 
                            code {{Input.password}}
                        .col-12
                            code {{Result.message}}
        
</template>
<script lang="ts">
import { log } from 'util';
import { Vue, Component } from 'vue-property-decorator';
import { EncryptableBase, TransformableBase } from '../models/models';
@Component({})
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
