import axios from "axios";


const GEMINI_API_KEY =
  process.env.EXPO_PUBLIC_GEMINI_API_KEY;


const GEMINI_MODEL = "gemini-flash-latest";


const GEMINI_URL =
`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;


export async function askVehicleAI(
  message,
  context
) {

  try {


    if (!GEMINI_API_KEY) {

      return "Gemini API key missing.";

    }



    const prompt = `

You are AutoSphere AI,
a professional vehicle assistant.

Help users with:

- Vehicle maintenance
- Troubleshooting
- Fuel efficiency
- Service recommendations
- Vehicle expenses


Vehicle Information:

${JSON.stringify(
context,
null,
2
)}


User Question:

${message}


Give a clear answer with:

Possible causes:

Recommendations:

Safety advice:

`;



    const response =
      await axios.post(

        GEMINI_URL,

        {

          contents:[

            {

              parts:[

                {
                  text:prompt
                }

              ]

            }

          ],
          generationConfig:{
            temperature:0.7,
            maxOutputTokens:1000
          }

        },

        {

          headers:{

            "Content-Type":
            "application/json"

          }

        }

      );



    const answer =

      response.data
      ?.candidates?.[0]
      ?.content
      ?.parts?.[0]
      ?.text;



    return answer ||

    "No response generated.";



  }

  catch(error){


    console.log(
      "Gemini API Error:"
    );


    console.log(
      "Status:",
      error.response?.status
    );


    console.log(
      "Data:",
      error.response?.data
    );


    return "Sorry, AI service is currently unavailable.";

  }

}