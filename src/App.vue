<template>
    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column">
                    <router-link to="/">Home</router-link>
                    <router-link to="/login">Login</router-link>
                </div>
                <div class="column">
                    <transition name="fade" mode="out-in">
                        <router-view />
                    </transition>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class App extends Vue {
    private created() {
        console.log("App Component Loaded");
        console.log(this.$router.currentRoute);
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
}
</script>