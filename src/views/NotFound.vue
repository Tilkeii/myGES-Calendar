<template>
    <h1>NotFound</h1>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class NotFound extends Vue {
    private created() {
        console.log("NotFound Component Loaded");
    }
}
</script>