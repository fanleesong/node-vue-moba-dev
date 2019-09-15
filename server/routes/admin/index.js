module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const Category = require('../../models/Category');
    router.post('/categories', async(req, res) => {
        console.log("...................2222" + JSON.stringify(req.body));
        const model = await Category.create(req.body); //数据来源于界面url传递过来的数据
        res.send(model);
    });
    app.use("/admin/api", router);
};