//时间转化
export function newTime(data) {
	let newTime = new Date(+new Date(data) + 8 * 3600 * 1000).toISOString().replace(
		/T/g, ' ').replace(/\.[\d]{3}Z/, '')
	return newTime
}
export function WidthHeight() {
	let value
	let WidthHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
	return value = WidthHeight - 1 - 100 + 'px'
}
