/*============================================================================================================
 =                                   UDP Parser for each Edge's message                                      =
 =                                                                                                           =
 = Example of a Buffer message, sent from a Sensor                                                           =
 = 1st nibble = number of values with delays                                                                 =
 = 2nd nibble = Device's id                                                                                  =
 = Each event has 2 Bytes = 1 Byte for Value && 1 Byte for for Delay                                         =
 = 00060015xxxxxxkl00000100xxxxxxkx10100100xxxxxxxx00000100xxxyxxxy00000100xxxxxxxx00000100xxxyxxxy00000100  =
 ============================================================================================================*/
const Event = require('../models/Event');

/**
 *
 * @param {Value of the event} value
 * @param {Time delay} delay
 */
function EventValue(value, delay) {
  (this.value = value), (this.delay = delay);
}

module.exports = function(message) {
  const content = message.slice(8, message.length);
  const contentLength = Number(message.slice(0, 4));
  const deviceId = Number(message.slice(5, 8));
  const arrContent = content.match(/.{8}/g);

  const arrayOfValues = [];
  for (let i = 0; i < arrContent.length; i++) {
    arrayOfValues.push(
      new EventValue(arrContent[i], Number(arrContent[i + 1]))
    );
    i++;
  }

  const event = new Event({
    numberValues: contentLength,
    deviceId: deviceId,
    values: arrayOfValues
  });

  event.save(function(err, event) {
    if (err) return console.error(err);
    console.log(
      `Event from Device id: ${event.deviceId} with the number of values of ${
        event.numberValues
      } saved in events collection`
    );
  });
};
