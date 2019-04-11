function Event(value, delay){
    this.value = value,
    this.delay = delay
}
module.exports = function (message) {
    let content = message.slice(4,message.length)
    const arrContent = content.match(/.{8}/g);

    const arrayOfEvents = [];

    for (let i = 0; i < arrContent.length; i++) {
        const eventValue = new Event(arrContent[i], Number(arrContent[i+1]))
        arrayOfEvents.push(eventValue)
        i = i+1        
    }

    console.log(JSON.stringify(arrayOfEvents));
}

/**
 * TODO insert JSON into the DB
 */

