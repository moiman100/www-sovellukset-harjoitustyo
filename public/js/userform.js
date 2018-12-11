'use strict';

const app = new Vue({
    el: '#app',
    data: {
        login_error: null,
        register_error: null,
        login_form: { username: null, password: null },
        register_form: { usernam: null, passsword: null }
    },
    methods: {
        login() {
            axios.post('/api/login', this.login_form)
                .then((response) => {
                    window.location = "/";
                })
                .catch((error) => {
                    this.login_error = error.response.data.message;
                })
        },
        register() {
            axios.post('/api/register', this.register_form)
                .then((response) => {
                    window.location = "/";
                })
                .catch((error) => {
                    this.register_error = error.response.data.message;
                })
        }
    }
})