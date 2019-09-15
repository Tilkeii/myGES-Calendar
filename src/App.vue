<template>
    <section class="section">
        <div class="container">
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
        </div>
    </section>
</template>

<style scoped>
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { MyGESAuth } from "./types/auth";

@Component
export default class App extends Vue {
    private email: string = "";
    private password: string = "";

    private created() {
        console.log("Create App");
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

    /**
     * Retourne le token si il existe
     * Rejete une erreur si il n'existe pas
     * Interactive => https://developer.chrome.com/apps/identity#method-getAuthToken
     * @param interactive
     */
    private getAuthToken(interactive: boolean = true): Promise<string> {
        return new Promise((resolve, reject) => {
            chrome.identity.getAuthToken(
                { interactive: interactive },
                (token: string) => {
                    if (token) return resolve(token);
                    else return reject("Token introuvable");
                }
            );
        });
    }

    /**
     * Se deconnecter de Google
     * @param token
     */
    private logout(token: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.$http.get(
                    `https://accounts.google.com/o/oauth2/revoke?token=${token}`
                );
                chrome.identity.removeCachedAuthToken({ token: token }, () => {
                    return resolve();
                });
            } catch (err) {
                return reject(err);
            }
        });
    }

    private makeBaseAuth(user: any, password: any) {
        let tok = user + ":" + password;
        let hash = btoa(tok);
        return "Basic " + hash;
    }

    private connectMyGes(auth: any): Promise<MyGESAuth> {
        return new Promise(async (resolve, reject) => {
            try {
                let { data } = await this.$http.get<MyGESAuth>(
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