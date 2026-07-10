export function getExpiryStatus(date){


if(!date)
return "No Expiry";


const today =
new Date();


const expiry =
new Date(date);



const diff =
expiry - today;



const days =
Math.ceil(
diff/(1000*60*60*24)
);



if(days<0)
return "Expired";


if(days<=30)
return "Expiring Soon";


return "Valid";


}