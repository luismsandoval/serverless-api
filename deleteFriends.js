const dynamoose = require("dynamoose");

const friendSchema = new dynamoose.Schema({
  id: "String",
  Name: "String",
  Age: "String",
});

const FriendModel = dynamoose.model("Friends", friendSchema);

exports.handler = async (event) => {
  console.log(event, event.pathParameters);

  try {
    let friendData;
    if (event.pathParameters) {
      friendData = await FriendModel.delete(event.pathParameters);

      const response = {
        statusCode: 200,
        body: JSON.stringify("deleted"),
      };

      return response;
    } else {
      const response = {
        statusCode: 500,
        body: JSON.stringify("not found"),
      };
      return response;
    }
  } catch (e) {
    const response = {
      statusCode: 500,
      body: JSON.stringify(e),
    };
    return response;
  }
};
