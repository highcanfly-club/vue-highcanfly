<!--
=========================================================
* © 2018-2022 Ronan LE MEILLAT for Association Highcanfly
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- Vue Notus theme from Creative Tim (MIT License)
- And many others
-->
<template>
  <div v-if="sumupStep === SumupStep.start"><span
      @click='startPayment(1.14, "toto@world.com", "Ronan", "Le Meillat")'>Process test payment 1.14 EUR from
      toto@world.com</span></div>
  <div v-if="sumupStep === SumupStep.input" id="sumup-card"></div>
  <div v-if="sumupStep === SumupStep.result">{{ JSON.stringify(sumupCheckout) }}</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { loadSumupSdk } from './api';
import type {SumupCheckout} from "./api"

enum SumupStep { start, input, result }
const sumupStep = ref<SumupStep>(SumupStep.start)
const sumupCheckout = ref<SumupCheckout>(null)
let sumupWidget: SumUpWidget = {} as SumUpWidget;

onMounted(() => {
  loadSumupSdk()
})

function startPayment(
  amount: number,
  clientEmail: string,
  clientName: string,
  clientLastName: string
) {
  sumupStep.value = SumupStep.input
  retrieveCheckout(amount, clientEmail, clientName, clientLastName).then(checkout => {
    console.log(checkout)
    loadSumupSdk().then(() => {
      sumupWidget = SumUpCard.mount({
        checkoutId: checkout.id,
        locale: "fr-FR",
        currency: "EUR",
        showFooter: true,
        onResponse: function (type, body) {
          console.log('Type', type);
          console.log('Body', body);
          switch (type) {
            case 'sent':
              break;
            case 'success':
              sumupStep.value = SumupStep.result
              sumupCheckout.value = body as SumupCheckout
          }
        },
      });
    }).catch(reason => { document.getElementById('sumup-card').innerText = `loadSumupSdk error:${reason}` })
  }).catch(reason => { document.getElementById('sumup-card').innerText = `getCheckout error:${reason}` })
}

function retrieveCheckout(
  amount: number,
  clientEmail: string,
  clientFirstName: string,
  clientLastName: string
): Promise<SumupCheckout> {
  const searchParams = new URLSearchParams();
  searchParams.append("amount", amount.toString())
  searchParams.append("last_name",clientLastName)
  searchParams.append("first_name",clientFirstName)
  searchParams.append("email",clientEmail)
  return new Promise<SumupCheckout>((resolve, reject) => {
    fetch(`/sumup/checkout?${searchParams.toString()}`).then(value=>{
      value.json().then(data=>{
        resolve(data as SumupCheckout)
      }).catch(reason=>{
        console.log(value)
        return "error parsing json checkout"
      })
    })
  })
}
</script>