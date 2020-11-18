<template lang="pug">
    q-page( padding) 
        q-form.q-gutter-md
            .row
                .col-12
                    q-input(filled v-model='Input.message', type='textarea', label='Message') 
                .col-12
                    input#FileUpload(type="file", style="display:none;")
                    q-btn.w-100(color='primary', icon='file', label='Select File Input.file') 
                .col-12.col-md-5
                    q-input(v-model='Input.password', type='password', label='Password') 
                .col-12.col-md-5
                    q-select(v-model='SelectedEncryptionType', :options='EncryptionTypes', option-value="id", option-label="name", label='Encryption Cipher', filled)
                .col-12.col-md-2
                    q-checkbox( v-model="Decode", label='Decrypt?')
                .col-12
                    q-btn(color='primary', icon='check', label='Start', @click='StartProcess()') 
            //- div
                q-btn(label='Submit', type='submit', color='primary')
                    q-btn.q-ml-sm(label='Reset', type='reset', color='primary', flat)

        q-dialog(v-model='ShowResults', persistent)
            q-card
                q-card-section.row.items-center
                    .row    
                        .col-11
                            h2 Result
                        .col-1
                            h2 X
                    .row
                        .col-12 
                            code {{Input.password}}
                        .col-12
                            code Result~
        
</template>
<script lang="ts">
import { log } from 'util';
import { Vue, Component } from 'vue-property-decorator';
import { EncryptableBase } from '../models/models';
@Component({})
export default class EncDec extends Vue {
  Input!: EncryptableBase;
  Decode = false;
  ShowResults = false;
  SelectedEncryptionType = null;
  EncryptionTypes = [
    { name: 'AED (XCC20)', id: 0 },
    { name: 'Secret Box', id: 1 }
    //   {name:"AED (XCC20)", id:0},
  ];
  created() {
    this.Input = { message: '', password: '', file: '' };
  }

  StartProcess() {
    console.log(this.Input);
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
