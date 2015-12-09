<template>
	<h3>{{msg}}</h3>
	<ul>
		<li v-link="{name:'test'}">test</li>
		<li v-link="{name:'login'}">login</li>
		<li v-link="{name:'index'}">index</li>
	</ul>
	<input type="text" v-model="msg">
</template>
<script>
	module.exports = {
        data: function() {
            return {
                msg : "hello world Vue!111"
            }
        }
    }
</script>
<style>
</style>