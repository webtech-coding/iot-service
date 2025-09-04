const mqtt = require('mqtt');

class MqttService{
    constructor(){
        this.mqttClient = mqtt.connect('ws://localhost:1883');

        this.mqttClient.on('connect',()=>{
            console.log('connected to mqtt');
        })

        this.registerTopicCallBacks = []

        this.mqttClient.on('message',(topic, message)=>{
           const subscription = this.registerTopicCallBacks.find(cb=>cb.topic === topic)
           if(subscription)subscription.callback(topic, message)
        })
    }

    /**
     * method to publish mqtt message with topic
     * @param {*} topic 
     * @param {*} message 
     * @returns 
     */
    publish(topic, message){
        if(!topic || !message){
            console.log('topic and message is required for mqtt publish')
            return
        }
        this.mqttClient.publish(top, JSON.stringify(message))
    }

    /**
     * subscribe to mqtt message
     * @param {*} topic 
     * @param {*} callback 
     * @returns 
     */
    subscribe(topic, callback){
        if(!topic || !callback){
            console.log('topic and callback required to subscribe')
            return
        }
        // register topic if not already in the list
        if(this.registerTopicCallBacks.includes(topic))return
        this.registerTopicCallBacks.push({topic, callback})
        this.mqttClient.subscribe(topic)
    }
}

const mqttClient = new MqttService()

module.exports= mqttClient