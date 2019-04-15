/*============================================================================================================
 =                                   UDP Parser for each Edge's message                                      =
 =                                                                                                           =
 = Example of a Buffer message, sent from a Sensor                                                           =
 = 1st nibble = number of values with delays                                                                 =
 = 2nd nibble = Device's id                                                                                  =
 = Each event has 2 Bytes = 1 Byte for Value && 1 Byte for for Delay                                         =
 = 00060015xxxxxxkl00000100xxxxxxkx10100100xxxxxxxx00000100xxxyxxxy00000100xxxxxxxx00000100xxxyxxxy00000100  =
 ============================================================================================================*/

 /**
  * 
  * @param {Number of values} contentLength 
  * @param {Device's ID} deviceId 
  */
 function HeadArrayOfEvents(contentLength, deviceId) {
     this.contentLength = contentLength,
     this.deviceId = deviceId
 }
 /**
  * 
  * @param {Value of the event} value 
  * @param {Time delay} delay 
  */
function EventValue(value, delay){
    this.value = value,
    this.delay = delay
}

module.exports = function (message) {
    const content = message.slice(8,message.length)
    const contentLength = Number(message.slice(0,4))
    const deviceId = Number(message.slice(5,8))
    const arrContent = content.match(/.{8}/g)
    const arrayHeadAndEvents = []

    // Verifies the number of events are complete
    if (contentLength === (arrContent.length/2)) {
        
        arrayHeadAndEvents.push(new HeadArrayOfEvents(contentLength, deviceId))
        const arrayListOfEvents = []
        for (let i = 0; i < arrContent.length; i++) {
            arrayListOfEvents.push(new EventValue(arrContent[i], Number(arrContent[i+1])))
            i = i+1        
        }        
        arrayHeadAndEvents.push(arrayListOfEvents)
    }

    console.log(JSON.stringify(arrayHeadAndEvents));
}

/**
 * TODO insert JSON into the DB
 */

