module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const Category = require('../../models/Category');
    //创建分类
    router.post('/categories', async(req, res) => {
        const model = await Category.create(req.body); //数据来源于界面url传递过来的数据
        res.send(model);
    });
    //编辑分类
    router.put('/categories/:id', async(req, res) => {
        const model = await Category.findByIdAndUpdate(req.params.id, req.body); //数据来源于界面url传递过来的数据
        res.send(model);
    });
    //删除分类
    router.delete('/categories/:id', async(req, res) => {
        await Category.findByIdAndDelete(req.params.id, req.body); //数据来源于界面url传递过来的数据
        res.send({
            errorCode: 0,
            success: true
        });
    });
    //获取分类列表
    router.get('/categories', async(req, res) => {
        const items = await Category.find().limit(10); //数据来源于界面url传递过来的数据
        res.send(items);
    });
    //根据id查询分类
    router.get('/categories/:id', async(req, res) => {
        const model = await Category.findById(req.params.id); //数据来源于界面url传递过来的数据
        res.send(model);
    });
    app.use("/admin/api", router);
};