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
  <div v-if="sumupStep === SumupStep.start"><button type="button"
      @click="startPayment(props.amount, props.email, props.firstName, props.lastName)"
      class="rounded-l-full rounded-r-full bg-blue-700 text-white px-4 py-2 text-center shadow-lg text-lg">{{ buttonTextComputed
      }}</button></div>
  <div v-if="sumupStep === SumupStep.input" id="sumup-card"></div>
  <div v-if="sumupStep === SumupStep.result">
    <sumup-ticket :checkout="sumupCheckout" :secured-token="securedToken"/>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { loadSumupSdk, SumupCheckoutAccessSecured } from './api';
import type { SumupCheckout } from "./api"
import SumupTicket from './SumupTicket.vue';

enum SumupStep { start, input, result }
const sumupStep = ref<SumupStep>(SumupStep.start)
const sumupCheckout = ref<SumupCheckout>(null)
let sumupWidget: SumUpWidget = {} as SumUpWidget;
const buttonTextComputed = ref<string>('')
const props = defineProps<{
  amount: number;
  email: string;
  firstName: string;
  lastName: string;
  buttonText?: string
}>()
let securedToken:string

onMounted(() => {
  if (props.buttonText === undefined) {
    buttonTextComputed.value = `Payer ${props.amount}€ avec carte de crédit/débit pour ${props.email}`
  } else {
    buttonTextComputed.value = props.buttonText
  }
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
    securedToken = checkout.access_token_aes

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
              break;
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
): Promise<SumupCheckoutAccessSecured> {
  const searchParams = new URLSearchParams();
  searchParams.append("amount", amount.toString())
  searchParams.append("last_name", clientLastName)
  searchParams.append("first_name", clientFirstName)
  searchParams.append("email", clientEmail)
  return new Promise<SumupCheckoutAccessSecured>((resolve, reject) => {
    fetch(`/sumup/checkout?${searchParams.toString()}`).then(value => {
      value.json().then(data => {
        resolve(data as SumupCheckoutAccessSecured)
      }).catch(reason => {
        return "error parsing json checkout"
      })
    })
  })
}

</script>