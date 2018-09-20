<template>
	<div class="help">
		<form class="help-top">
			<div class="help-title">意见反馈</div>
			<textarea class="suggestion" name="" rows="" cols="" v-model="content"></textarea>
			<div class="submit-btn" v-on:click="submit">提交</div>
		</form>
		<div class="question-and-answer">
			<div class="qa-title">
				<img src="/static/img/share/rule.png"/>
				<span>常见问题</span>
			</div>
			<div class="qa" v-for="item in questionList" v-bind:key="item.index">
				<div class="help-question">{{item.title}}</div>
				<div class="help-answer" v-html="item.content"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'help',
	// i18n: i18n,
	components: {
	},
	data () {
		return {
			questionList: [],
			phoneNum: '',
			content: ''
		}
	},
	created: function () {
		axios({
			method: 'GET',
			url: 'http://dev-new-api.beanpop.cn/faqList',
			withCredentials: true,
			headers: {'lang': 'zh', 'token': '', 'os': 'web', 'version': '1.0.0', 'time': ''}
		}).then((response) => {
			this.questionList = response.data.data
		}).catch((ex) => {
			console.log(ex)
		})
		var args = this.getArgs()
		this.phoneNum = args['phone_num']
	},
	methods: {
		getArgs: function () {
			var url = location.search
			var args = {}
			if (url.indexOf("?") != -1) {
				var str = url.substr(1)
				var strs = str.split("&")
				for (let i = 0; i < strs.length; i++) {
					args[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1])
				}
			}
			return args
		},
		submit: function () {
			axios({
				method: 'POST',
				url: 'http://dev-new-api.beanpop.cn/feedback',
				params: {
					content: this.content,
					phone_number: this.phoneNum
				},
				withCredentials: true,
				headers: {'lang': 'zh', 'token': '', 'os': 'web', 'version': '1.0.0', 'time': ''}
			}).then((response) => {
				console.log(response)
				xidou.toast(response.message)
			}).catch((ex) => {
				console.log(ex.response)
				xidou.toast(ex.response)
			})
		}
	}
}
</script>


<style scoped>
*{
	margin: 0px;
	padding: 0px;
}
p{
	margin: 0px;
}
.help{
	padding: 20px;
	font-size: 14px;
	font-family: 'PingFangSC-Regular';
	color: #666666;
	font-weight: 400;
}
.help-top{
	margin-bottom: 30px;
}
.help-title{
	font-family: 'PingFangSC-Regular';
	font-size: 16px;
	color: #333333;
	font-weight: 400;
	text-align: center;
}
.suggestion{
	width: 100%;
	height: 110px;
	margin: 10px 0px;
	background:rgba(244,244,244,1);
	border:0.81px solid rgba(221,221,221,1);
	border-radius:4px;
	padding: 3px 0px;
}
.suggestion:focus{
	outline: none;
}
.submit-btn{
	font-family: "PingFangSC-Semibold";
	font-weight: 600;
	font-size: 16px;
	color: #333333;
	border: none;
	height:44px;
	width: 100%;
	background:rgba(255,226,0,1);
	border-radius:5px;
	text-align: center;
	line-height: 44px;
}
.submit-btn:focus{
	outline: none;
}
.qa-title{
	margin-bottom: 20px;
}
.qa-title span{
	vertical-align: middle;
}
.qa-title img{
	width: 13px;
	vertical-align: middle;
}
.help-question{
	font-family: "PingFangSC-Semibold";
	font-size: 14;
	font-weight: 600;
	color: #333333;
	margin-bottom: 14px;
}
.help-answer{
	margin-bottom: 20px;
}
.bean-content p{
	margin: 10px 0px;
}
</style>
