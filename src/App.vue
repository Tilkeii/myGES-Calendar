<template>
    <section class="section">
        <div class="container">
            <div class="columns">
                <form id="loginForm">
                    <div class="field has-addons">
                        <p class="control has-icons-left">
                            <input class="input" type="text" placeholder="Email" id="email" />
                            <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
                            </span>
                        </p>
                        <p class="control">
                            <a class="button is-static">@myges.fr</a>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left">
                            <input
                                class="input"
                                type="password"
                                placeholder="Password"
                                id="password"
                            />
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-text-centered">
                            <button type="submit" class="button is-success">Login</button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<style scoped>
h1 {
    color: rebeccapurple;
}
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class App extends Vue {
    public created() {
        console.log("Create App");
    }
}
</script>