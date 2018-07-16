<template>
    <div>
        <div class="ready-box">
            <img class="logo" src="/static/img/complete/rule-logo.png">
            <div class="ready">
                <div class="ready-title">提示</div>
                <div class="ready-body">
                    <p>即将进入喜豆beanpop有奖竞猜活动</p >
                    <p>准备好了吗？</p >
                </div>
            </div>
            <div class="ready-button">
                <button class="btn-left">取消</button>
                <button class="btn-right">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
</script>

<style scoped>
*{
    margin: 0px;
    padding: 0px;
}
.ready-box{
    width: 100%;;
    text-align: center;
    /* height: calc(100% - 150px); */
    top:0px;
    position: absolute;
    cursor: pointer;
}
.ready{
    color: #000;
    width: 80%;
    height: 30%;
    margin-top: 40%;
    margin-left: 10%;
    border-radius: 10px;
    /* padding: 5% 4%; */
}
.ready-title{
    font-weight: 600;
    font-size: 2rem;
    color: #6985C6;
    text-align: left;
}
.ready-body{
    font-size: 1.1rem;
    border-top: 1px solid #CCCCCC;
    margin-top: 20px;
    padding-top: 20px;
}
.ready-body p{
    margin-bottom: 10px;
}
.ready img{
    width: 100px;
    height: 100px;
}
.logo{
    float: right;
    margin-right: 6%;
    margin-top: 20%;
    width: 30%;
}
.ready-button{
    margin-top: 20px;
    font-size: 1.6rem;
}
.btn-left{
    background-color: #fff;
    border: none;
    border-top: 1px solid #ccc;
    color: #ccc;
    float: left;
    width: 50%;
    height: 50px;
    font-size: inherit;
}
.btn-right{
    background-color: #fff;
    border: none;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    float: left;
    width: 50%;
    height: 50px;
    font-size: inherit;
}
</style>
