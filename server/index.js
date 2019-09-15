const express = require('express');
const app = express();

//添加设置数据使用中间件middleware
app.use(require('cors')()); //使用跨域模块
app.use(express.json()); //使用json数据传输

require("./routes/admin")(app);
require("./plugins/db")(app);

app.listen(3000, function (err) {
    console.log("connection ........");
});