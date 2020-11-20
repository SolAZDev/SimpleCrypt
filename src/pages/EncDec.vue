<template lang="pug">
q-page( padding) 
    q-form.q-gutter-md
        .row
            .col-12
                q-input(filled v-model='Input.message', type='textarea', label='Message') 
            //- .col-12
                input#FileUpload(type="file", style="display:none;")
                q-btn.w-100(color='primary', icon='file', label='Select File Input.file') 
            .col-12.col-md-5
                q-input(v-model='Input.password', type='password', label='Password') 
            .col-12.col-md-5
                q-select(v-model='SelectedEncryptionType', :options='EncryptionTypes', option-value="id", option-label="name", label='Encryption Cipher', filled)
            .col-12.col-md-2
                q-checkbox( v-model="Decode", label='Decrypt?')
            .col-12
                q-btn.w-100(color='primary', icon='check', label='Start', @click='StartProcess()') 
        ResultDialog(v-if="ShowResults" :content="Result.data", :password="Result.password", :show="ShowResults" @close="ShowResults=!ShowResults")
        
</template>
<script lang="ts">
import { log } from 'util';
import { Vue, Component } from 'vue-property-decorator';
import {
  DropDownSelection,
  EncryptableBase,
  EncryptedResult
} from '../models/models';
import ResultDialog from 'components/ResultDialog.vue';
import * as Sodium from '../utils/sodium';
import * as Utils from '../utils/utils';
@Component({
  components: { ResultDialog }
})
export default class EncDec extends Vue {
  Input: EncryptableBase = { message: '', password: '' };
  Decode = false;
  ShowResults = false;

  EncryptionTypes = [
    { name: 'AED (XCC20)', id: 0 },
    { name: 'Secret Box', id: 1 }
    //   {name:"AED (XCC20)", id:0},
  ] as DropDownSelection[];
  SelectedEncryptionType: DropDownSelection = this.EncryptionTypes[0];
  Result: EncryptedResult = { data: '', password: '' };

  get PasswordEnabled() {
    let disabled = true;
    switch (this.SelectedEncryptionType.id) {
      default:
      case 0: //AEAD
        disabled = false;
        break;
      case 1: //SecretBox
        disabled = true;
        break;
    }
    return disabled;
  }
  async StartProcess() {
    if (Utils.isNullOrWhitespace(this.Input.message)) {
      return;
    }
    console.log(this.Input);
    this.Decode ? await this.decrypt() : await this.encrypt();
    // if (this.Decode) {
    //   this.encrypt();
    // }
  }

  async encrypt() {
    switch (this.SelectedEncryptionType.id) {
      default:
      case 0: //AEAD
        this.Result = await Sodium.encrypt_AEAD(
          this.Input.message,
          this.Input.password
        );
        break;
      case 1:
        this.Result = await Sodium.encrypt_SecretBox(this.Input.message);
        break;
    }
    this.ShowResults = true;
  }

  async decrypt() {
    switch (this.SelectedEncryptionType.id) {
      default:
      case 0: //AEAD
        this.Result = await Sodium.decrypt_AEAD(
          this.Input.message,
          this.Input.password
        );
        break;
      case 1:
        this.Result = await Sodium.decrpyt_SecretBox(
          this.Input.message,
          this.Input.password
        );
        break;
    }
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
