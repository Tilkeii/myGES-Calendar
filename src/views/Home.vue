<template>
    <h1>Home</h1>
</template>

<style scoped>
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Home extends Vue {
    private created() {
        console.log("Home Component Loaded");
    }
}
</script>