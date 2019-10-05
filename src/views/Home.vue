<template>
    <div>
        <h1>Home</h1>
        <b-button type="is-primary" outlined @click="transfertAgenda">Recupérer le planning</b-button>
    </div>
</template>

<style scoped>
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { isAuthentificated } from "../scripts/storage";

@Component
export default class Home extends Vue {
    private created() {
        console.log("Home Component Loaded");
    }

    private transfertAgenda() {
        if(isAuthentificated) {
            console.log('Transfert Agenda');
        }
    }
}
</script>