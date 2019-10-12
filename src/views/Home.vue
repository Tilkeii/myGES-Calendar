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
import { getTime, startOfWeek, endOfWeek, addDays, setHours, setMinutes, setSeconds, setMilliseconds } from "date-fns";

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

        /**
         *  !! A ameliorer voir doc de datefns !!
         */
        
        // const _currentDay = new Date(2019, 9, 24);
        const _currentDay = new Date();
        const _startOfWeek = startOfWeek(_currentDay);
        const _endOfWeek = endOfWeek(_currentDay);

        const _myGesStartOfWeek = setHours(addDays(_startOfWeek, 1), 8);
        const _myGesEndOfWeek = setMilliseconds(setSeconds(setMinutes(setHours(addDays(_endOfWeek, 1), 8), 0), 0), 0);

        console.log('Current Day', _currentDay);
        console.log('Start Of week', _startOfWeek);
        console.log('End Of week', _endOfWeek);
        console.log('MyGES Start Of week', _myGesStartOfWeek);
        console.log('MyGES End Of week', _myGesEndOfWeek);
        console.log('MyGES Start Of week Unix', getTime(_myGesStartOfWeek));
        console.log('MyGES End Of week Unix', getTime(_myGesEndOfWeek));

        let { data } = await this.$http.get<Object>(
            "https://services.reseau-ges.fr/me/agenda",
            {
                params: {
                    // start: 1568008800000,
                    // end: 1568527200000
                    start: getTime(_myGesStartOfWeek),
                    end: getTime(_myGesEndOfWeek)
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