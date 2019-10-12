module.exports = app => {
    const express = require('express');
    const router = express.Router({
        mergeParams: true //将通用路径中的资源路径合并参数
    });
    // const Category = require('../../models/Category');
    //创建分类
    router.post('/', async(req, res) => {
        const model = await req.Model.create(req.body); //数据来源于界面url传递过来的数据
        res.send(model);
    });
    //编辑分类
    router.put('/:id', async(req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body); //数据来源于界面url传递过来的数据
        res.send(model);
    });
    //删除分类
    router.delete('/:id', async(req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body); //数据来源于界面url传递过来的数据
        res.send({
            errorCode: 0,
            success: true
        });
    });
    //获取分类列表
    router.get('/', async(req, res) => {
        const queryOption = {};
        if (req.Model.modelName === 'Category') {
            queryOption.populate = 'parent';
        }
        const items = await req.Model.find().setOptions(queryOption).limit(10); //数据来源于界面url传递过来的数据
        res.send(items);
    });
    //根据id查询分类
    router.get('/:id', async(req, res) => {
        const model = await req.Model.findById(req.params.id); //数据来源于界面url传递过来的数据
        res.send(model);
    });
    /**使用通用的路径资源 比如 rest/路径(categories)===>变成 Category 模型**/
    app.use("/admin/api/rest/:resource", async(req, res, next) => {
        //inflection可以将类型名字的复数改为单数单词
        const modelName = require('inflection').classify(req.params.resource);
        req.Model = require(`../../models/${modelName}`);
        next();
    }, router);
};