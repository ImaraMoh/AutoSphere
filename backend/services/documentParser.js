export function parseVehicleDocument(text)
{


const data={

registrationNumber:"",
ownerName:"",
vehicleModel:"",
year:"",
fuel:"",
expiryDate:"",
engineNumber:"",
chassisNumber:""

};



const lines =
text
.split("\n")
.map(line=>line.trim())
.filter(Boolean);



lines.forEach((line,index)=>{


const upper =
line.toUpperCase();



if(
upper.includes("REGISTRATION")
||
upper.includes("REG NO")
)
{

data.registrationNumber =
lines[index+1] || "";

}



if(
upper.includes("OWNER")
)
{

data.ownerName =
lines[index+1] || "";

}



if(
upper.includes("MODEL")
)
{

data.vehicleModel =
lines[index+1] || "";

}



if(
upper.includes("YEAR")
)
{

data.year =
lines[index+1] || "";

}



if(
upper.includes("FUEL")
)
{

data.fuel =
lines[index+1] || "";

}



if(
upper.includes("EXPIRY")
||
upper.includes("VALID UNTIL")
)
{

data.expiryDate =
lines[index+1] || "";

}



if(
upper.includes("ENGINE")
)
{

data.engineNumber =
lines[index+1] || "";

}



if(
upper.includes("CHASSIS")
)
{

data.chassisNumber =
lines[index+1] || "";

}


});


return data;

}