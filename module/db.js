// 封装数据库

var MongoDB = require('mongodb');

var MongoClient = MongoDB.MongoClient;

var Config = require('./config.js');

class Db  {
    static getInstance() {//单例
        if (!Db.instance) {
            Db.instance = new Db();
        }
        return Db.instance;
    }
    constructor() {//初始化
        //1.连接数据库
        this.dbClient='';
        this.connect();
    }
    connect() {
        let _that = this;
        return new Promise((resove,reject) => {
            if (!_that.dbClient) {
                MongoClient.connect(Config.dbUrl,(err,client) => {
                    if (err) {
                        reject(err);
                    } else {
                        _that.dbClient=client.db(Config.dbName);
                        resove(_that.dbClient);
                    }
                });
            } else {
                resove(_that.dbClient);
            }
        }) ;
    }
    /**
     * 查询
     * @param {*} tableName 表名
     * @param {*} json  条件
     */
    find(tableName,json) {
        return new Promise((resove,reject)=> {
            this.connect().then((db)=> {
                let table = db.collection(tableName);
                var resultes = table.find(json);
                let resultAry = resultes.toArray((err,list) =>{
                    if (err) {
                        reject(err);
                    } else {
                        resove(list);
                    }
                });
            });
        })
    }
}

module.exports = Db.getInstance();