require("dotenv").config();
const App = require("./src/App");
const connectToDB = require("./src/config/Database");

connectToDB();

App.listen(3000,()=>{
    console.log("Server Connected Successfully on 3000")
})