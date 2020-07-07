<template>
    <div>
        <comment :id="this.$route.params.id"></comment>
    </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'

export default {
    // data() {
    //     return {
            
    //     }
    // },
    // created() {
        
    // },
    // methods: {
    //     getcomment(){
    //         this.$http.get('')
    //     }
    // },
    components: {
        comment
    }
}
</script>

<style lang="scss" scoped>

</style>