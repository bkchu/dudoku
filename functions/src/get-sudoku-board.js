import axios from "axios"

export async function handler(event, context, callback) {
  console.log("queryStringParameters", event.queryStringParameters)
  try {
    const { data } = await axios.get(
      "https://sugoku.herokuapp.com/board?difficulty=easy"
    )
    callback(null, {
      // return null to show no errors
      statusCode: 200, // http status code
      body: JSON.stringify(data),
    })
  } catch(err) {
    callback(Error(err))
  }
}
