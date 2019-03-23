<template>
    <div class="container">
        <div class="messaging">
            <div class="inbox_msg">
                <div class="mesgs">
                    <div class="msg_history">
                        <div v-for="message in messages"
                            :class="[message.author===authUser.displayName?'outgoing_msg':'incoming_msg']">
                            <div :class="[message.author===authUser.displayName?'sent_msg':'received_msg']">
                                <span> {{message.author}} | {{message.mhour }}:{{message.mminutes }} -
                                    {{message.mday }}/{{message.mmonth + 1}}/{{message.mmyear }} </span>
                                <p>{{message.message}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="type_msg">
                        <div class="input_msg_write">
                            <textarea @keyup.enter="saveMessage" v-model="message" type="text" class="write_msg"
                                placeholder="Type a message"></textarea>
                            <button class="msg_send_btn" @click="GenerateTicket" type="button"><i class="fas fa-chart-line"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import {
    setTimeout
} from 'timers';

export default {
    name: "PrivateChat",
    data() {
        return {
            message: null,
            messages: [],
            authUser: {}
        }
    },
    methods: {
        scrollToBottom() {
            let box = document.querySelector('.msg_history');
            box.scrollTop = box.scrollHeight;
        },
        GenerateTicket() {
            var ticket =
                "Codename: " + navigator.appCodeName + "\n" +
                "Browser Name: " + navigator.appName + "\n" +
                "Browser Version: " + navigator.appVersion + "\n" +
                "Browser Cookies: " + navigator.cookieEnabled + "\n" +
                "Browser Language: " + navigator.language + "\n" +
                "Platform: " + navigator.platform + "\n" +
                "User Agent: " + navigator.userAgent;
                
            var dt = new Date();
            //save message to firestore
            db.collection('chat').add({
                message: ticket,
                author: this.authUser.displayName,
                createdAt: new Date(),
                mday: dt.getDate(),
                mmonth: dt.getMonth(),
                mmyear: dt.getFullYear(),
                mhour: dt.getHours(),
                mminutes: dt.getMinutes()

            }).then(() => {
                this.scrollToBottom();
            })

            this.message = null;
        },
        saveMessage() {

            if (this.message === "" || this.message.length == 0 || this.message == null) {
                console.log("Ciao");
            } else {
                var dt = new Date();
                //save message to firestore
                db.collection('chat').add({
                    message: this.message,
                    author: this.authUser.displayName,
                    createdAt: new Date(),
                    mday: dt.getDate(),
                    mmonth: dt.getMonth(),
                    mmyear: dt.getFullYear(),
                    mhour: dt.getHours(),
                    mminutes: dt.getMinutes()

                }).then(() => {
                    this.scrollToBottom();
                })

                this.message = null;
            }
        },

        fetchMessages() {
            db.collection('chat').orderBy('createdAt').onSnapshot((querySnapshot) => {
                let allMessages = [];
                querySnapshot.forEach(doc => {
                    allMessages.push(doc.data())
                })

                this.messages = allMessages;

                setTimeout(() => {
                    this.scrollToBottom();
                }, 1000);
            })
        }
    },

    //Created lifecycle
    created() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authUser = user;
            } else {
                this.authUser = {};
            }
        })

        this.fetchMessages();
    },

    //Only logged users should be able to navigate this view
    beforeRouteEnter(to, from, next) {
        next(vm => {
            firebase.auth().onAuthStateChanged(user => {

                //if there is a user (user authenticated) we can go on with the routing
                if (user) {
                    next();
                } else {
                    vm.$router.push('/login')
                }
            })
        })
    }
}
</script>

<style scoped="">
    .container{
        width: 100%;
         margin:auto;
         }

.inbox_msg{
    background-color: #292929;
    border-radius: 10px;
    transition: box-shadow .3s;
    box-shadow: 0px 0px 10px 0px rgba(18,18,18,1);
}
.inbox_msg:hover{
    box-shadow: 0px 0px 15px 0px rgba(18,18,18,1);
}

.active_chat{ background:#ebebeb;}

.received_msg{
display: block;
float:left;
  padding: 10px;
  width: auto;
  max-width: 60%;
  height: auto;
  transition: box-shadow .3s;
 }


.received_msg p {
background: linear-gradient(to right, #aa076b, #61045f);
transition: box-shadow .3s;
  box-shadow: 0px 0px 10px 0px rgba(18,18,18,1);
  transition: box-shadow .3s;
  border-radius: 20px;
  min-height: 40px;
  font-size: 14px;
  margin: 0; 
  color:#fff;
  padding: 15px;
  width:100%;
    word-wrap:break-word;
}

 .received_msg p:hover{
  box-shadow: 0px 0px 15px 0px rgba(18,18,18,1);
 }

 .sent_msg {
display: block;
float:right;
  padding: 10px;
  width: auto;
  max-width: 60%;
    height: auto;
}

 .sent_msg p {
background: linear-gradient(to right, #aa076b, #61045f);
transition: box-shadow .3s;
  box-shadow: 0px 0px 10px 0px rgba(18,18,18,1);
  border-radius: 20px;
  min-height: 40px;
  font-size: 14px;
  margin: 0; 
  color:#fff;
  padding: 15px;
  width:100%;
  word-wrap:break-word;
}

.sent_msg p:hover{
  box-shadow: 0px 0px 15px 0px rgba(18,18,18,1);
 }

 
 .outgoing_msg{ 
     overflow:hidden;
     }

.incoming_msg{ overflow:hidden;}

.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}

.mesgs {
  padding: 30px;
  width: 100%;
}

.type_msg {
    background-color: rgb(36, 36, 36);
    position: relative;
    transition: box-shadow .3s;
    border-radius: 10px;
}



.write_msg{
    padding: 40px;
    margin-top: 40px;
    margin-bottom: 40px;
    padding-right: 120px;
    border: 0px;
    overflow: hidden;
    resize: none;
    min-height: 100%;
    min-width: 100%;
    background: rgb(36, 36, 36);;
    color: rgb(219, 219, 219);

}

.write_msg:focus{
  outline-color: transparent;
  outline-style: none;
  }

.msg_send_btn {
  background: linear-gradient(to right, #aa076b, #61045f);
  transition: box-shadow .3s;
  box-shadow: 0px 0px 10px 0px rgba(18,18,18,1);
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  position: absolute;
  right: 20px;
  top: calc(50% - 40px);
  width: 80px;
  height: 80px;
}

.msg_send_btn:hover{
  box-shadow: 0px 0px 15px 0px rgba(18,18,18,1);
}
.messaging { padding: 0 0 0 0;}
.msg_history {
  height: 60vh;
  width: 100%;
  overflow-y: auto;
  margin-bottom: 20px;
  background-color: rgb(36, 36, 36);
  border-radius: 10px;
}
</style>
