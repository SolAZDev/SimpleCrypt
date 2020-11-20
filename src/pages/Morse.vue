<template lang="pug">
    q-page( padding) 
        q-form.q-gutter-md
            .row
                .col-12
                    q-input(filled v-model='Input.message', type='textarea', label='Message') 
                .col-12
                    q-checkbox( v-model="Decode", label='Decode?')
                .col-12
                    q-btn.w-100(color='primary', icon='check', label='Start', @click='StartProcess()') 
            //- div
                q-btn(label='Submit', type='submit', color='primary')
                    q-btn.q-ml-sm(label='Reset', type='reset', color='primary', flat)
        
        ResultDialog(:content="Result.message", :show="ShowResults" @close="ShowResults=!ShowResults")
        
        
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { TransformableBase } from '../models/models';
import * as MorseHelper from '../utils/morse';
import ResultDialog from 'components/ResultDialog.vue';
@Component({
  components: { ResultDialog }
})
export default class Morse extends Vue {
  Input!: TransformableBase;
  Decode = false;
  ShowResults = false;
  Result: TransformableBase = { message: '' };
  created() {
    this.Input = { message: '' };
  }

  StartProcess() {
    console.log(this.Input);
    this.Result = this.Decode
      ? MorseHelper.ToText(this.Input.message)
      : MorseHelper.ToMorse(this.Input.message);
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
