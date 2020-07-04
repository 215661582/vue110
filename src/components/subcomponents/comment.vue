<template>
    <div class="cmt-container">
        <h1>发表评论</h1>
        <hr>
        <textarea placeholder="请输入要BB的内容（最多吐槽120字）" maxlength="120"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item">
                <div class="cmt-title">  
                     第1楼  用户：匿名用户  发表时间：2020-07-04 18:46:35
                </div>
                <div class="cmt-body">11111</div>
            </div>
            <div class="cmt-item">
                <div class="cmt-title">  
                     第1楼  用户：匿名用户  发表时间：2020-07-04 18:46:35
                </div>
                <div class="cmt-body">11111</div>
            </div>
            <div class="cmt-item">
                <div class="cmt-title">  
                     第1楼  用户：匿名用户  发表时间：2020-07-04 18:46:35
                </div>
                <div class="cmt-body">11111</div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain>加载更多</mt-button>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.cmt-container {
    h1 {
        font-size: 18px;
    }
    textarea {
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list {
        margin: 5px 0;
        .cmt-item {
            font-size: 13px;
            .cmt-title {
                background-color: #ccc;
                line-height: 30px;
            }
        }
        .cmt-body {
            line-height: 35px;
            text-indent: 2em;
        }
    }
}
</style>