<template>
    <div class="columns">
        <b-loading :active="loading"></b-loading>
        <form @submit.prevent="onLoginSubmit">
            <b-field>
                <b-input v-model="email" type="text" placeholder="Email"></b-input>
                <div class="control">
                    <a class="button is-static">@myges.fr</a>
                </div>
            </b-field>
            <b-field>
                <b-input v-model="password" type="password" placeholder="Password"></b-input>
            </b-field>

            <b-field>
                <p class="control has-text-centered">
                    <b-button type="is-primary" native-type="submit" :loading="loading">Se connecter</b-button>
                </p>
            </b-field>
        </form>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IMyGESAuth } from "../types/auth";
import { saveAuth }  from "../scripts/storage";
import axios from 'axios';

@Component
export default class Login extends Vue {
    private email: string = "";
    private password: string = "";
    private loading: boolean = false;

    private created() {
        console.log("Login Component Loaded");
    }

    private async onLoginSubmit(): Promise<void> {
        console.log("Submit");
        this.loading = true;
        const auth = this.makeBaseAuth(this.email, this.password);
        try {
            const gesAuth = await this.connectMyGes(auth);
            await saveAuth(gesAuth);
            console.log(gesAuth);
            this.$router.push({name: 'Home'});
        } catch (err) {
            console.log(err);
        } finally {
            this.loading = false;
        }
    }

    private makeBaseAuth(user: any, password: any) {
        let tok = user + ":" + password;
        let hash = btoa(tok);
        return "Basic " + hash;
    }

    private async connectMyGes(auth: any): Promise<IMyGESAuth> {
        let { data } = await this.$http.get<IMyGESAuth>(
            process.env.URL_MYGES_TOKEN,
            {
                headers: {
                    Authorization: auth
                }
            }
        );
        return data;
    }
}
</script>