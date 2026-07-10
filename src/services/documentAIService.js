export const detectDocumentType = (text)=>{


const data =
text.toUpperCase();



if(
data.includes("INSURANCE")
||
data.includes("POLICY")
)
{

return "Insurance";

}


if(
data.includes("REGISTRATION")
||
data.includes("RC")
)
{

return "Registration";

}


if(
data.includes("LICENSE")
||
data.includes("DRIVING")
)
{

return "License";

}


if(
data.includes("SERVICE")
||
data.includes("MAINTENANCE")
)
{

return "Service";

}



return "Other";


};




export const createDocumentObject = (
vehicleData,
text
)=>{


return {


id:
Date.now().toString(),


type:
detectDocumentType(text),


title:
`${detectDocumentType(text)} Document`,


registrationNumber:
vehicleData.registrationNumber,


owner:
vehicleData.ownerName,


vehicleModel:
vehicleData.vehicleModel,


expiryDate:
vehicleData.expiryDate,


engineNumber:
vehicleData.engineNumber,


chassisNumber:
vehicleData.chassisNumber,


createdAt:
new Date().toISOString(),


status:"Valid"


};


};