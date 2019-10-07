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
import { isAuthentificated, retrieveAuth } from "../scripts/storage";
import { IMyGESAuth } from "../types/auth";

@Component
export default class Home extends Vue {
    private created() {
        console.log("Home Component Loaded");
    }

    private async transfertAgenda() {
        if (await isAuthentificated()) {
            console.log("Transfert Agenda");
            let auth: any = await retrieveAuth();
            console.log(await this.getCalendarRawData(auth));
        }
    }

    private async getCalendarRawData(auth: IMyGESAuth) {
        let { data } = await this.$http.get<Object>(
            "https://services.reseau-ges.fr/me/agenda",
            {
                params: {
                    start: 1568008800000,
                    end: 1568527200000
                },
                headers: {
                    Authorization: "Bearer " + auth.token
                }
            }
        );
        return data;
    }
}
</script>