'use strict';

const io = require('socket.io-client')
const faker = require('faker')


const host = 'http://e0faf372cc91.ngrok.io'

const caps = io.connect(host)

caps.on('delivered', orderDelivered)


setInterval(() =>{ 

  const storeName = process.env.STORENAME || "Pimp Enterprises"

  console.log('Emitting...')

  let order = {storeName: storeName, orderId: faker.datatype.uuid() , name: faker.name.findName(), address: faker.address.streetAddress()}

  caps.emit('pickup', order)  
}, 500);







function orderDelivered(payload){
  console.log(`VENDOR: Thank you for delivery of order: ${payload.payload.orderId}`)
  console.log(payload)
}

module.exports = orderDelivery()