<template>
    <section class="flex relative block py-24 lg:pt-0 bg-slate-800">
                    <div
                        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-200"
                    >
                        <div class="flex-auto p-5 lg:p-10">
                          <div v-if="!fromSendEmail">
                                <form @submit="checkForm" @submit.prevent="submitForm">
                                <h4 class="text-2xl font-semibold">Pour nous contacter</h4>
                                <p v-if="formerrors.length">
                                    <b>Veuillez corriger ces erreurs:</b>
                                    <ul>
                                    <li v-for="error in formerrors" :key="formerrors.id">{{ error }}</li> <!-- eslint-disable-line-->
                                    </ul>
                                </p>
                                <p
                                    class="leading-relaxed mt-1 mb-4 text-slate-500"
                                >Completer ce formulaire…</p>
                                <div class="relative w-full mb-3 mt-8">
                                    <label
                                        class="block uppercase text-slate-600 text-xs font-bold mb-2"
                                        for="full-name"
                                    >Nom</label>
                                    <input
                                        type="text"
                                        class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Votre nom"
                                        id="email_name"
                                        name="name"
                                        v-model="name"
                                    />
                                </div>

                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-slate-600 text-xs font-bold mb-2"
                                        for="email"
                                    >Email</label>
                                    <input
                                        type="email"
                                        class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Email"
                                        id="email_email"
                                        name="email"
                                        v-model="email"
                                    />
                                </div>

                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-slate-600 text-xs font-bold mb-2"
                                        for="message"
                                    >Message</label>
                                    <textarea
                                        id="email_message"
                                        rows="4"
                                        cols="80"
                                        class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                        placeholder="Votre message…"
                                        name="message"
                                        v-model="message"
                                    />
                                </div>
                                <div class="mx-auto text-center mt-6">
                                    <vue-hcaptcha
                                        v-if="!hCaptcha_verified"
                                        :sitekey="hCaptcha_sitekey"
                                        theme="dark"
                                        class="rounded"
                                        @verify="hCaptchaVerify"
                                        @expired="hCaptchaExpire"
                                        @challenge-expired="hCaptchaChallengeExpire"
                                        @error="hCaptchaError"
                                    ></vue-hcaptcha>
                                    <input type="hidden" name="ekey" id="ekey" v-model="hCaptcha_eKey" />
                                    <input type="hidden" name="token" id="etoken" v-model="hCaptcha_token" />
                                    <input type="hidden" name="sitekey" id="sitekey" v-model="hCaptcha_sitekey" />
                                    <button
                                        v-if="hCaptcha_verified"
                                        class="bg-slate-800 text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                    >Envoyer</button>
                                </div>
                            </form>
                          </div>
                          <div v-if="fromSendEmail">
                            <h4 class="text-2xl font-semibold">Email envoyé !</h4>
                          </div>
                        </div>
                    </div>
    </section>
</template>

<script>
import VueHcaptcha from "@/components/hCaptcha/hcaptcha.vue";
import { ref } from "vue";

export default {
  data() {
    const formerrors = [];
    const hCaptcha_sitekey = ref("084f2b24-5eac-4e51-bf07-72aabc1d1f23");
    const hCaptcha_verified = ref(false);
    const hCaptcha_expired = ref(false);
    const hCaptcha_token = ref("");
    const hCaptcha_eKey = ref("");
    const hCaptcha_error = ref("");
    const name = ref("");
    const email = ref("");
    const message = ref("");
    const email_sent = ref(false);
    const fromSendEmail = ref(false);
    return {
      formerrors,
      hCaptcha_sitekey,
      hCaptcha_verified,
      hCaptcha_expired,
      hCaptcha_token,
      hCaptcha_eKey,
      hCaptcha_error,
      name,
      email,
      message,
      email_sent,
      fromSendEmail,
    };
  },
  components: {
    VueHcaptcha,
  },
  methods: {
    checkForm: function (e) {
      if (this.name && this.email && this.message) {
        return true;
      }

      this.formerrors = [];

      if (!this.name) {
        this.formerrors.push("Nom requis.");
      }
      if (!this.email) {
        this.formerrors.push("Email requis.");
      }
      if (!this.message) {
        this.formerrors.push("Message requis.");
      }
      e.preventDefault();
    },
    hCaptchaVerify: function (tokenStr, ekey) {
      //eslint-disable-line
      this.hCaptcha_verified = true;
      this.hCaptcha_token = tokenStr;
      this.hCaptcha_eKey = ekey;
    },
    hCaptchaExpire: function () {
      this.hCaptcha_verified = false;
      this.hCaptcha_token = null;
      this.hCaptcha_eKey.value = null;
      this.hCaptcha_expired.value = true;
      console.log("Expired");
    },
    hCaptchaChallengeExpire: function () {
      this.hCaptcha_verified = false;
      this.hCaptcha_token = null;
      this.hCaptcha_eKey.value = null;
      this.hCaptcha_expired.value = true;
      console.log("Challenge expired");
    },
    hCaptchaError: function (err) {
      this.hCaptcha_token = null;
      this.hCaptcha_eKey = null;
      this.hCaptcha_error = err;
      console.log(`Error: ${err}`);
    },
    hCaptchaSubmit: function () {
      console.log("Submitting the invisible hCaptcha");
      // todo.execute();
    },
    submitForm: function () {
      this.fromSendEmail = fetch("/sendemail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          message: this.message,
          sitekey: this.hCaptcha_sitekey,
          token: this.hCaptcha_token,
          ekey: this.hCaptcha_eKey,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          return (
            data.hCaptchaResponse &&
            (data.mailjetResponse != "ERROR" ? true : false)
          );
        });
    },
  },
};
</script>