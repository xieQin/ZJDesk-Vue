<template>
	<div class="zjd-top w1200">
		<ol class="zjd-breadcrumb clearfix">
			<li class="index active"><a v-link="{name:'index'}">首页</a></li>
			<li class="item "><a v-link="{name:breadcrumburl}">{{breadcrumb}}</a></li>
		</ol>
	</div>
</template>
<script>
	require('../assets/scss/components/zjdbreadcrumb.scss');
	module.exports = {
		replace:true,
		props: ['breadcrumb', 'breadcrumburl']
	}
</script>