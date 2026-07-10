import vision from "@google-cloud/vision";


const client =
new vision.ImageAnnotatorClient({
keyFilename:
"./autosphere-ocr-key.json"
});


async function test(){

const [
result
]
=
await client.textDetection(
"./test.jpg"
);


console.log(
result.textAnnotations[0].description
);

}


test();