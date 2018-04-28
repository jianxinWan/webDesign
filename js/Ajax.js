function getMsgInfo(callback){
    $.ajax({
        url : 'http://139.199.104.60:8088/getMsg',
        type : 'get',
        success:function(r){
            callback(r);
        },
        error:function(){
            alert("通信错误！");
        }
    });
}
function  insertInfo() {
    console.log($("#nameInfo").val(),$("#msgInfo").val());
    $.ajax({
        url: 'http://139.199.104.60:8088/insertMsg',
        type: 'post',
        data: {
            username: $("#nameInfo").val(),
            msgInfo: $("#msgInfo").val()
        },
        success: function (r) {
            alert("留言成功！点击城外查看信息。");
        },
        error: function () {
            alert("通信错误！");
        }
    });
}
$("#submitBtn").click(function(){
    insertInfo();
});