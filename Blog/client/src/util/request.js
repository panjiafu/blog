import axios from "axios";


let url = "http://localhost:8085"
const serve = axios.create({
	baseURL: url,
	timeout: 5000,
})

//请求拦截器
serve.interceptors.request.use(
	function(config) {
		let token = sessionStorage.getItem("token")
		if (token) {
			config.headers.Authorization = token
		}
		return config
	},
	function(err) {
		return Promise.reject(error)
	}
)

//响应拦截器
serve.interceptors.response.use(
	function(config) {
		return config
	},
	function(err) {
		return Promise.reject(error)
	}
)
//导出
export default serve
