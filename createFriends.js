const dynamoose = require("dynamoose");

const friendSchema = new dynamoose.Schema({
  id: "String",
  Name: "String",
  Age: "String",
});

const FriendModel = dynamoose.model("Friends", friendSchema);

exports.handler = async (event) => {
  let friendData;
  try {
    let stringified = event.body.toString();
    let parsed = JSON.parse(stringified);

    let holder = {
      body: parsed,
    };

    friendData = await FriendModel.create({
      id: holder.body.id,
      Name: holder.body.Name,
      Age: holder.body.Age,
    });
  } catch (e) {
    console.log(e);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(friendData),
  };

  return response;
};
