<template>
    <div class="columns">
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
                    <b-button type="is-primary" native-type="submit">Se connecter</b-button>
                </p>
            </b-field>
        </form>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IMyGESAuth } from "../types/auth";

@Component
export default class Login extends Vue {
    private email: string = "";
    private password: string = "";

    private created() {
        console.log("Login Component Loaded");
    }

    private async onLoginSubmit(): Promise<void> {
        console.log("Submit");
        const auth = this.makeBaseAuth(this.email, this.password);
        try {
            const gesAuth = await this.connectMyGes(auth);
            console.log(gesAuth);
        } catch (err) {
            console.log(err);
        }
    }

    private makeBaseAuth(user: any, password: any) {
        let tok = user + ":" + password;
        let hash = btoa(tok);
        return "Basic " + hash;
    }

    private connectMyGes(auth: any): Promise<IMyGESAuth> {
        return new Promise(async (resolve, reject) => {
            try {
                let { data } = await this.$http.get<IMyGESAuth>(
                    process.env.URL_MYGES_TOKEN,
                    {
                        headers: {
                            Authorization: auth
                        }
                    }
                );
                return resolve(data);
            } catch (err) {
                return reject(err);
            }
        });
    }
}
</script>