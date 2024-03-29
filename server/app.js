const http = require("http")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const sequelize = require("./utils/database")
const User = require('./modals/user')
const Inventory = require('./modals/inventory')
const userRoutes = require("./routes/user")
const inventoryRoutes = require('./routes/inventory')
const analticsRoutes = require('./routes/analytics')
const adminRoutes = require('./routes/admin')
const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(userRoutes)
app.use(inventoryRoutes)
app.use(analticsRoutes)
app.use(adminRoutes)
app.use(User)
app.use(Inventory)

User.hasMany(Inventory)
Inventory.belongsTo(User, { foreignKey: "organisation" })
Inventory.belongsTo(User, { foreignKey: "hospital" })
Inventory.belongsTo(User, { foreignKey: "donar" })
const server = http.createServer(app).listen(4000)
sequelize
    // .sync({ force: true })
    .sync()
    .then(() => {
        server
        console.log("connected successfully")

    }).catch((err) => {
        console.log(err)
    })