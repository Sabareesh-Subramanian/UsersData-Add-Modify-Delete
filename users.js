const expressApp = require("express");
// console.log("expressApp:", expressApp);
const appAPI = expressApp();
// console.log("appAPI:", appAPI);
appAPI.use(expressApp.json());

let mockData = require("./MOCK_DATA.json");
// console.log("mockData:", mockData);
// mockData = JSON.parse(mockData);

const fileRead = require("fs");

appAPI.get("/", (request, response) => {
  response.send("Welcome to Home Page!");
});

appAPI.get("/getusers", (request, response) => {
  response.send(mockData);
});

appAPI.post("/adduser", (request, response) => {
  let newUser = request.body;
  //   console.log("newUser:", newUser);
  mockData.push(newUser);
  //   return response.status(200).json(newUser);
  response.send(
    `${newUser.first_name} is added successfully to the Users list.`
  );
  fileRead.writeFile("./MOCK_DATA.json", JSON.stringify(mockData), () => {});
});

appAPI.patch("/updateuser/:id", (request, response) => {
  let userId = request.params.id;
  for (param in request.body) {
    for (user of mockData) {
      console.log(user);
      if (user.id == userId) {
        user[param] = request.body[param];
      }
    }
  }
  fileRead.writeFile("./MOCK_DATA.json", JSON.stringify(mockData), () => {});
  response.send(`This is a PATCH request for the user ${userId}`);
});

appAPI.delete("/removeuser/:id", (request, response) => {
  let userId = request.params.id;
  for (index in mockData) {
    if (mockData[index].id == userId) {
      var removedUser = mockData.splice(index, 1);
      // console.log("removedUser:", removedUser);
    }
  }
  response.send(
    `${removedUser[0].first_name} ${removedUser[0].last_name} has been removed from the Users data.`
  );
  fileRead.writeFile("./MOCK_DATA.json", JSON.stringify(mockData), () => {});
});

appAPI.listen(2000, () => {
  console.log("This code is listening to 2000!");
});
