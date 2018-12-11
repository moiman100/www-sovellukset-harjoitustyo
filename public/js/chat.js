'use strict';

var socket = io();
//Set locale for date formatting
moment.locale(window.navigator.userLanguage || window.navigator.language);

const app = new Vue({
    el: '#app',
    data: {
        messages: [],
        new_message: null
    },
    mounted() {
        //Add incoming messages to list
        socket.on('message', (msg) => {
            this.messages.push(msg);
            if (this.checkScrollBottom()) {
                this.scrollToBottom();
            }
        })
        //Get all messages from database when the page first loads
        axios.get('/api/all_messages')
            .then((response) => {
                this.messages = response.data;
                this.scrollToBottom();
            })
            .catch((error) => {
                if (error.response.status == 401) {
                    window.location = "/";
                }
                console.log(error);
            })
    },
    methods: {
        //Send new message to server
        addmessage() {
            if (!this.new_message) {
                return;
            }
            axios.post('/api/new_message', { text: this.new_message })
                .then((response) => {
                    this.scrollToBottom();
                    this.new_message = '';
                })
                .catch((error) => {
                    if (error.response.status == 401) {
                        window.location = "/";
                    }
                    console.log(error);
                })
        },
        scrollToBottom() {
            //Wait DOM to update before scrolling to the bottom
            Vue.nextTick(function() {
                var chat = document.getElementById("chat");
                chat.scrollTop = chat.scrollHeight;
            })
        },
        checkScrollBottom() {
            var chat = document.getElementById("chat");
            return chat.offsetHeight >= chat.scrollHeight - chat.scrollTop;
        },
        formatDateAndTime(msg) {
            msg.time = moment(msg.date).format('HH.mm');
            msg.day = moment(msg.date).format('LLLL');
            return msg;
        }
    }
})