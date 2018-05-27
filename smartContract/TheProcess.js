'use strict'

//将前端传入的字符串数据对象化
var ProcessItem = function(text){
    if(text){
        var obj = JSON.parse(text);
        this.unique_id = obj.unique_id;
        this.optime = obj.optime;
        this.place = obj.place;
        this.content = obj.content;
        this.unique_node = obj.unique_node;
        this.pre_cccc_nodes = obj.pre_cccc_nodes;
        this.author = obj.author;
    }
};

//json to string
ProcessItem.prototype = {
    toString : function(){
        return JSON.stringify(this)
    }
};

//接收前端传入的数据
var TheProcess = function () {
    LocalContractStorage.defineMapProperty(this, "data", {
        parse: function (text) {
            return new ProcessItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};


TheProcess.prototype ={
    init:function(){
    },
   //保存数据
    save:function(unique_node,unique_id,optime,place,content,pre_cccc_nodes){
        if(!unique_node || !content){
            throw new Error("empty  content")
        }

        
        var from = Blockchain.transaction.from;
        var processItem = this.data.get(unique_node);
        if(processItem){
            throw new Error("Process has been occupied");
        }

        processItem = new ProcessItem();
//        processItem.author = from;
        processItem.unique_id = unique_id;
        processItem.optime = optime;
        processItem.place = place;
        processItem.content = content;
        processItem.unique_node = unique_node;
        processItem.pre_cccc_nodes = pre_cccc_nodes;
        Event.Trigger("33333", JSON.stringify(processItem));
        this.data.put(unique_node,processItem);
    },
   //查询数据
    get:function(unique_node){
        if(!unique_node){
            throw new Error("empty unique_node")
        }
        return this.data.get(unique_node);
    }
};

module.exports = TheProcess;
