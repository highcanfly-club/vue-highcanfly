<template>
    <!-- Check that the SDK client is not currently loading before accessing is methods -->
    <div v-if="!$auth0.loading.value">
      <!-- show login when not authenticated -->
      <button
        v-if="!$auth0.isAuthenticated.value"
        @click="login"
        class="bg-camelot-500 text-white active:bg-slate-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
        type="button"
      >
        Log in
      </button>
      <!-- show logout when authenticated -->
      <button
        v-if="$auth0.isAuthenticated.value"
        class="bg-camelot-500 text-white active:bg-slate-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
        @click="logout"
      >
        Log out ( {{ $auth0.user.value.name }} )
      </button>
    </div>
</template>
<script>
export default {
  name: "AuthPage",
  components: {},
  data() {
    return {user: this.user};
  },
  methods: {
    // Log the user in
    login() {
      this.$auth0.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth0.logout({
        returnTo: window.location.origin,
      });
    },
  },
};
</script>
