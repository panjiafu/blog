import serve from "./request.js";
//登录
export function loginUser(url,params){
	return serve.post(url,params)
}
//注册
export function regUser(url,params){
	return serve.post(url,params)
}
//获取文章
export function getarticle(url,parmas){
	return serve.get(url,parmas)
}
//详细信息
export function getdetail(url,params){
	return serve.get(url,params)
}
//后台
export function getbackstage(url){
	return serve.get(url)
}
//文章表数据
export function getArticle(url){
	return serve.get(url)
}
//用户表数据
export function getUser(url,params){
	return serve.get(url)
}
//浏览量
export function getVisit(url,params){
	return serve.post(url,params)
}
//评论总数
export function reviewcount(url,params){
	return serve.get(url,params)
}
//发表评论
export function postReview(url,params){
	return serve.post(url,params)
}
//获取评论
export function getReview(url,params){
	return serve.get(url,params)
}
//回复评论
export function getReplay(url,params){
	return serve.post(url,params)
}
//归档
export function getPigeonhole(url){
	return serve.get(url)
}
//编辑用户
export function editorUser(url,params){
	return serve.post(url,params)
}
//删除用户
export function deleteUser(url,params){
	return serve.post(url,params)
}
//编辑Art
export function editorArt(url,params){
	return serve.post(url,params)
}
//删除Art
export function deleteArt(url,params){
	return serve.post(url,params)
}

//发布Art
export function publishArt(url,params){
	return serve.post(url,params)
}

//评论表数据
export function userReview(url){
	return serve.get(url)
}

//评论表数据delete
export function deleteUserreview(url,params){
	return serve.post(url,params)
}
//评论表数据批量delete
export function delListUreview(url,params){
	return serve.post(url,params)
}

//发布message
export function messagedata(url,params){
	return serve.post(url,params)
}
//获取message
export function getmessage(url,params){
	return serve.get(url,params)
}

//回复message
export function replayMessage(url,params){
	return serve.post(url,params)
}
