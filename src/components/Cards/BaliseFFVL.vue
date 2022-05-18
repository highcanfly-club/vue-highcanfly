<template>
    <span>W.I.P. Balise: {{id}} {{slug}}</span>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        id: {
            type: Number,
            default: 0,
        },
        slug: {
            type: String,
            default: "null",
        },
    }
})
</script>