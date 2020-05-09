import axios from "axios"

export async function handler(event, context) {
  console.log("queryStringParameters", event.queryStringParameters)
  try {
    const { data } = await axios.get(
      "https://sugoku.herokuapp.com/board?difficulty=easy"
    )
    return {
      statusCode: 200, // http status code
      body: JSON.stringify(data),
    }
    // callback(null, {
    //   // return null to show no errors
    // })
  } catch (err) {
    // callback(Error(err))
    throw new Error(err)
  }
}
