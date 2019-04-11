var buff = "0006xxxxxxxx00000100xxxxxxxx00000100xxxxxxxx00000100xxxxxxxx00000100xxxxxxxx00000100xxxxxxxx00000100";
var lengSignals = Number(buff.slice(0,4));
var content = buff.slice(4,buff.length);
var arrContent = content.match(/.{8}/g);

function Event(value, delay){
    this.value = value,
    this.delay = delay
}

const arrayOfEvents = [];

for (let i = 0; i < arrContent.length; i++) {
    const eventValue = new Event(arrContent[i], Number(arrContent[i+1]))
    arrayOfEvents.push(eventValue)
    i = i+1
    
}

console.log(JSON.stringify(arrayOfEvents));
// {
//     'value': 'xxxxx',
//     'delay': 100
// }

