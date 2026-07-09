const vehicleResponses = [

{
keywords:["noise","sound","strange"],
response:
`
Possible causes:

• Engine belt problem
• Low engine oil
• Brake component issue

Recommended:

✓ Check maintenance history
✓ Inspect vehicle condition
✓ Visit mechanic if problem continues
`
},


{
keywords:["oil","engine"],
response:
`
Engine oil related issue detected.

Recommended:

✓ Check oil level
✓ Check last oil change date
✓ Replace oil if service is due
`
},


{
keywords:["battery","start"],
response:
`
Possible battery issue.

Check:

✓ Battery voltage
✓ Battery terminals
✓ Alternator condition
`
},


{
keywords:["service"],
response:
`
Regular maintenance improves vehicle life.

Recommended:

✓ Oil change
✓ Brake inspection
✓ Tire check
✓ Filter replacement
`
}

];


export const askVehicleAI = async(message)=>{


return new Promise((resolve)=>{


setTimeout(()=>{


const text =
message.toLowerCase();


const result =
vehicleResponses.find(item=>

item.keywords.some(keyword=>

text.includes(keyword)

));


if(result)
{
resolve(result.response);
}

else
{

resolve(
`
I need more information.

Please provide:

• Vehicle model
• Problem description
• When the issue started
• Any warning lights
`
);

}


},1000);


});


};