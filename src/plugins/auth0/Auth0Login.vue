<template>
  <!-- Check that the SDK client is not currently loading before accessing is methods -->
  <!-- show login when not authenticated -->
  <div v-if="error">{{ error }}: {{ error_description }}</div>
  <button
    v-if="!$auth0.isAuthenticated.value"
    @click="login"
    class="
      bg-camelot-500
      text-white
      active:bg-slate-50
      text-xs
      font-bold
      uppercase
      px-4
      py-2
      rounded
      shadow
      hover:shadow-md
      outline-none
      focus:outline-none
      lg:mr-1 lg:mb-0
      ml-3
      mb-3
      ease-linear
      transition-all
      duration-150
    "
    type="button"
  >
    Log in
  </button>
  <div v-if="$auth0.isAuthenticated.value">
    <!-- show logout when authenticated -->
    <button
      class="
        bg-camelot-500
        text-white
        active:bg-slate-50
        text-xs
        font-bold
        uppercase
        px-4
        py-2
        rounded
        shadow
        hover:shadow-md
        outline-none
        focus:outline-none
        lg:mr-1 lg:mb-0
        ml-3
        mb-3
        ease-linear
        transition-all
        duration-150
      "
      @click="logout"
    >
      Log out ( {{ $auth0.user.value.name }} )
    </button>
        <button
      class="
        bg-camelot-500
        text-white
        active:bg-slate-50
        text-xs
        font-bold
        uppercase
        px-4
        py-2
        rounded
        shadow
        hover:shadow-md
        outline-none
        focus:outline-none
        lg:mr-1 lg:mb-0
        ml-3
        mb-3
        ease-linear
        transition-all
        duration-150
      "
      @click="getToken"
    >
      get token
    </button>
        <p
      v-if="access_token"
      class="text-slate-700 pt-8 text-normal font-mono break-all text-justify"
      @click="show_access_token = !show_access_token"
    >
      access_token (validité: {{access_token_payload !== undefined ? (new Date(access_token_payload.exp*1000)).toLocaleString('fr') : ""}}):<br />
      permissions
      <pre>
        {{access_token_payload !== undefined ? access_token_payload.permissions : ""}}
      </pre>
      <span class="text-xs" :class="show_access_token ? 'inline' : 'hidden'">{{
        access_token
      }}</span>
    </p>
    <p
      v-if="id_token"
      class="text-slate-700 pt-8 pb-8 text-normal font-mono break-all text-justify"
      @click="show_id_token = !show_id_token"
    >
      id_token (validité: {{id_token_payload !== undefined ? (new Date(id_token_payload.exp*1000).toLocaleString('fr')) : ""}}):
      <span class="text-xs" :class="show_id_token ? 'inline' : 'hidden'">{{
        id_token
      }}</span>
    </p>
  </div>
</template>
<script lang="ts">
interface LoginQuery {
  query: { error?: string; error_description?: string; state?: string };
}

import { defineComponent, ref } from "vue";
import { Auth0Instance } from "./instance";
import { GetTokenSilentlyVerboseResponse } from "@auth0/auth0-spa-js";
import { verifyToken } from "./TokenHelper";
import * as jose from "jose";
import * as jwks from "../../../jwks.json";

export default defineComponent<{
  name: string;
  error: string;
  error_description: string;
  access_token: string;
  access_token_payload: jose.JWTPayload;
  id_token: string;
  id_token_payload: jose.JWTPayload;
  show_access_token: boolean;
  shown_id_token: boolean;
}>({
  name: "AuthPage",
  error: "",
  error_description: "",
  access_token: "",
  access_token_payload: {},
  id_token: "",
  id_token_payload: {},
  show_access_token: false,
  shown_id_token: false,
  data() {
    const route = this.$route as unknown as LoginQuery;
    if (
      route !== undefined &&
      route.query !== undefined &&
      route.query.error !== undefined
    ) {
      this.error = route.query.error;
      this.error_description = route.query.error_description;
      console.log(route.query);
    }
    return {
      error: ref(this.error),
      error_description: ref(this.error_description),
      access_token: ref(this.access_token),
      access_token_payload: this.access_token_payload,
      id_token: ref(this.id_token),
      id_token_payload: this.id_token_payload,
      show_access_token: this.show_access_token,
      show_id_token: this.show_id_token,
    };
  },
  methods: {
    // Log the user in
    login() {
      (this.$auth0 as Auth0Instance).loginWithRedirect();
    },
    // Log the user out
    logout() {
      (this.$auth0 as Auth0Instance).logout({
        localOnly: true,
      });
    },
    getToken() {
      (this.$auth0 as Auth0Instance)
        .getTokenSilentlyVerbose()
        .then((tokens: GetTokenSilentlyVerboseResponse) => {
          this.access_token = tokens.access_token;
          this.id_token = tokens.id_token;
          verifyToken(this.access_token, jwks.domain, Date.now() / 1000).then(
            (value: boolean | jose.JWTVerifyResult) => {
              if (typeof value != "boolean") {
                const token = value as jose.JWTVerifyResult;
                this.access_token_payload = token.payload;
                console.log(token.payload);
              }
            }
          );
          verifyToken(this.id_token, jwks.domain, Date.now() / 1000).then(
            (value: boolean | jose.JWTVerifyResult) => {
              if (typeof value != "boolean") {
                const token = value as jose.JWTVerifyResult;
                this.id_token_payload = token.payload;
                console.log(token.payload);
              }
            }
          );
        });
    },
  },
});
</script>
