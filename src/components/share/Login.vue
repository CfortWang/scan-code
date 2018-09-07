<template>
    <div class="content">
        <div class="login-box">
            <div class="phone-num-box">
                <select name="" v-on:change="countryChangeItem($event)">
                    <option v-for="item in countryItems" v-bind:key="item.index" v-bind:value="item.seq">+{{item.calling_code}}</option>
                </select>
                <input type="number" name="phoneNum" id="phoneNum" value="" v-bind:placeholder="$t('placeholder.phoneNum')"/>
            </div>
            <div class="verification-code-box">
                <input type="text" name="verification" id="verification" value="" v-bind:placeholder="$t('placeholder.verification')"/>
				<vue-countdown :time="countDown" :interval="1000" :auto-start="false" ref="countdown" class="count-down">
					<template slot-scope="props">{{ props.minutes }}:{{ props.seconds }}</template>
				</vue-countdown>
                <button class="get-verification" v-on:click="getVerification">获取验证码</button>
            </div>
            <div class="login-btn-box" v-on:click="doLogin">{{ $t("login")}}</div>
			<div class="tip-container">
				<div class="tip-error">
					<img src="/static/img/share/error.png"/>
					<span class="tip-error-msg"></span>
				</div>
			</div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import vueCookie from 'vue-cookie'
import $ from 'jquery'
import axios from 'axios'
import VueCountdown from '@xkeshi/vue-countdown'

const langData = require('../lang/share.json')

// axios.defaults.withCredentials=true
// Vue.prototype.$axios = axios

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'login',
  messages: langData
})

export default {
	name: 'login',
	i18n: i18n,
	components: {
		VueCountdown
	},
	data () {
		var now = new Date()
		var setNow = new Date(now.getTime() + 180000)
		return {
			countryCode: '',
			countrySeq: '',
			phoneNumber: '',
			password1: '',
			password2: '',
			recommendCode: '',
			verificationCode: '',
			countryItems: [],
			selectedCountry: 1,
			countDown: setNow - now,
			phoneKind: '',
			type: ''
		}
	},
	created: function () {
		if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
			this.phoneKind = 'ios'
		} else if (/(Android)/i.test(navigator.userAgent)) {
			this.phoneKind = 'android'
		}
		// document.domain = "beanpop.cn"
		axios({ // Get Country Info
			// url: process.env.api_url + '/api/countries'
			url: 'http://dev-new-api.beanpop.cn/common/country'
			// url: '/api/common/country'
		}).then((response) => {
			// var responseMessage = response.data.message
			var responseData = response.data.data
			// console.log(responseMessage)
			// console.log(responseData)
			this.countryItems = responseData
			this.selectedCountry = parseInt(this.countryItems[0].seq)
		}).catch((ex) => {
			console.log(ex)
			// var errorResponseData = ex.response.data
			// console.log(errorResponseData)
		})
	},
	methods: {
		countryChangeItem: function (event) {
			this.selectedCountry = parseInt(event.target.value)
		},
		showMessage: function () {
			$(".tip-container").fadeIn()
			setTimeout(function () {
				$(".tip-container").fadeOut()
			}, 1000)
		},
		getVerification: function () {
			this.phoneNumber = $("#phoneNum").val()
			this.type = 'login'
			if (this.phoneNumber === '') {
				$(".tip-error").text(this.$i18n.t('message.insertPhoneNum'))
				this.$options.methods.showMessage()
				return false
			}
			let pattern = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
			if (!pattern.test(this.phoneNumber)) {
				$(".tip-error").text(this.$i18n.t('message.wrongPhoneNum'))
				this.$options.methods.showMessage()
				return false
			}
			axios({ // get verification code
				method: 'POST',
				// url: process.env.api_url + '/api/certifications/phone-num/sign-up',
				url: 'http://dev-new-api.beanpop.cn/login/sendCode',
				params: {phoneNumber: this.phoneNumber, country: this.selectedCountry, type: this.type}
			}).then((response) => {
				// var responseMessage = response.data.message
				var responseData = response.data.data
				console.log(responseData)
				var now = new Date()
				var setNow = new Date(now.getTime() + 180000)
				this.countDown = setNow - now
				this.$refs.countdown.init()
				this.$refs.countdown.start()
			}).catch((ex) => {
				console.log(ex)
				$(".tip-error").text(this.$i18n.t('message.sendFail'))
				this.$options.methods.showMessage()
				this.isCountDown = false
				// var errorResponseData = ex.response.data
				// console.log(errorResponseData)
			})
		},
		doLogin: function () {
			this.phoneNumber = $("#phoneNum").val().replace(/ /gi, '')
			this.verificationCode = $("#verification").val().replace(/ /gi, '')
			if (this.phoneNumber === '') {
				$(".tip-error").text(this.$i18n.t('message.insertPhoneNum'))
				this.$options.methods.showMessage()
				return false
			}
			let pattern = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
			if (!pattern.test(this.phoneNumber)) {
				$(".tip-error").text(this.$i18n.t('message.wrongPhoneNum'))
				this.$options.methods.showMessage()
				return false
			}
			if (this.verificationCode === '') {
				$(".tip-error").text(this.$i18n.t('message.insertAuthCode'))
				this.$options.methods.showMessage()
				return false
			}
			if (this.verificationCode.length !== 6) {
				$(".tip-error").text(this.$i18n.t('message.wrongAuthCodeSize'))
				this.$options.methods.showMessage()
				return false
			}
			axios({ // login
				method: 'POST',
				// url: process.env.api_url + '/api/register/code',
				url: 'http://dev-new-api.beanpop.cn/login/code',
				// url: '/api/login/code',
				params: {
					phoneNumber: this.phoneNumber,
					country: this.selectedCountry,
					code: this.verificationCode,
					mobileOs: 'web'
				},
				withCredentials: true,
				headers: {'lang': 'zh', 'token': '', 'os': 'web', 'version': '1.0.0', 'time': '', 'Content-Type': 'application/x-www-form-urlencoded'}
			}).then((response) => {
				var responseMessage = response.data.message
				var responseStatus = response.data.code
				if (responseStatus > 200) {
					$(".tip-error").text(this.$i18n.t(responseMessage))
					this.$options.methods.showMessage()
					return false
				}
				console.log(document.cookie)
				this.$router.push({name: 'SpellBean'})
			}).catch((ex) => {
				// var responseStatus = ex.response.status
				// var errorResponseData = ex.response.data
				// // console.log(responseStatus)
				// // console.log(errorResponseData)
				// if (responseStatus === 404) {
				// 	if (errorResponseData.status === 100) {
				// 		alert(this.$i18n.t('message.wrongRecommendCode'))
				// 		return false
				// 	} else if (errorResponseData.status === 200) {
				// 		alert(this.$i18n.t('message.wrongAuthCode'))
				// 		return false
				// 	} else {
				// 		console.log(ex)
				// 		return false
				// 	}
				// } else if (responseStatus === 400) {
				// 	alert(this.$i18n.t('message.wrongAuthCode'))
				// 	return false
				// } else {
				// 	console.log(ex)
				// 	return false
				// }
			})
		}
	}
}
</script>

<style scoped>
li{
	list-style: none;
}
a{
	text-decoration: none;
}
a:active, a:hover{
	text-decoration: none;
}
p, li{
	margin: 0px;
	padding: 0px;
}
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color:#CCC;
}
input:-moz-placeholder, textarea:-moz-placeholder {
    color:#CCC;
}
input::-moz-placeholder, textarea::-moz-placeholder {
    color:#CCC;
}
input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color:#CCC;
}
.login-box{
	padding-top: 15px;
}
.phone-num-box, .verification-code-box{
	width: 70%;
	margin-left: 15%;
	display: flex;
	border-bottom: 1px solid #DDDDDD;
	padding: 15px 0px;
}
.phone-num-box select{
	/*float: left;*/
	border: none;
	outline: none;
	appearance:none;
	-moz-appearance:none;
	-webkit-appearance: none;
	background: url('/static/img/share/open_hollow.png') no-repeat scroll right center transparent;
	background-size: 16px 16px;
	padding-right: 15px;
	height: 20px;
}
.phone-num-box #phoneNum{
	margin-left: 10px;
	border-left: 1px solid #DDDDDD;
	padding: 0px 8px;
}
.count-down{
	vertical-align: middle;
	padding: 3px 5px 0px 0px;
	font-size: 14px;
}
.get-verification{
	border: none;
	background: #FFFFFF;
	padding: 0px;
	color: #EE6807;
}
.get-verification:focus{
	outline: none;
}
.login-box input{
	flex: 1;
	height: 20px;
	padding: 0px;
	border: none;
	appearance:none;
	-moz-appearance:none;
	-webkit-appearance: none;
	font-size: 14px;
	width: 100px;
}
.login-box input:focus{
	outline: none;
}
.login-btn-box{
	width: 70%;
	background:linear-gradient(90deg,rgba(255,222,0,1) 0%,rgba(255,230,0,1) 100%);
	border-radius:22px;
	text-align: center;
	font-size: 18px;
	padding: 10px 0px;
	margin: 20px 0px 20px 15%;
}
.tip-container{
	position: fixed;
    z-index: 999;
    pointer-events: none;
    left: 0;
    top: 35%;
    width: 100%;
    display: none;
}
.tip-error{
    width: 50%;
    left: 25%;
    height: 24px;
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
    overflow: hidden;
    padding: 10px 0px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    -moz-box-shadow: 0 0 12px #999;
    -webkit-box-shadow: 0 0 12px #999;
    box-shadow: 0 0 12px #999;
    background: #BD362F;
    color: #FFF;
    opacity: .8;
    -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);
    filter: alpha(opacity=80);
}
.tip-error-msg{
	word-wrap: break-word;
	font-size: 14px;
	line-height: 20px;
	margin-left: 15px;
}
</style>
