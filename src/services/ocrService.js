export const extractTextFromImage = async (imageUri) => {

    console.log("Selected Image:", imageUri);


    const imageResponse = await fetch(imageUri);

    const blob = await imageResponse.blob();


    const formData = new FormData();


    formData.append(
        "image",
        blob,
        "document.jpg"
    );


    console.log("Sending FormData");


    const response = await fetch(
        "http://172.20.10.2:5000/ocr",
        {
            method: "POST",
            body: formData,
        }
    );


    const result = await response.text();


    console.log(
        "Backend Result:",
        result
    );


    const data = JSON.parse(result);


    return data;

};