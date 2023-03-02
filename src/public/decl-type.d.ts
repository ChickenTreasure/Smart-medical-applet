// -----------类型声明文件：d.ts文件--------------

// 首页第一项数据：疫苗预约
export interface Vaccine {
	image: string;
	title: string;
}
// 首页第二项数据：疫苗预约
export interface Phydata {
	describe: string;
	image: string;
	title: string;
}
// 首页第三项数据：热门挂号
export interface Registered {
	background: string;
	dep_id: string;
	image: string;
	title: string;
}
// 首页第四项数据：健康自测
export interface Selftest {
	describe: string;
	image: string;
	minute: number;
	name: string;
	number_of_people: number;
	question: number;
}
// --------------新冠疫苗接种预约页面-------------
// 定义返回的类型
interface Time {
	end_time: string;
	over: number;
	start_time: string;
	when: number;
}
interface Period {
	period: string;
	time: Time[];
}
interface Week {
	Have: string;
	date: string;
	day: string;
}
export interface Newapptime {
	Hospital: string;
	address: string;
	company: string[];
	lasting: Period[];
	week: Week[];
}
// ----------------提交新冠疫苗预约接口数据----------
export interface Rescovidapi {
	name: string;
	id_card: string;
	phone: string;
	address: string;
	de_address: string;
	crowd_sort: string;
	date: string;
	period: string;
	reserve_time: string;
	when: number;
}
// ----------新冠疫苗订单------------
export interface Xinguanorder {
	address: string;
	cancel: boolean;
	company: string;
	date: string;
	name: string;
	period: string;
	time: string;
	_id: string;
}
// ------------取消新冠疫苗预约-----------
export interface Covidcancelapi {
	_id: string;
}
export interface PhyId {
	id: string;
}
// -----------------小程序用户登录-------------
export interface Wxloginapi {
	appid: string;
	secret: string;
	nickName: string;
	avatarUrl: string;
	code: string;
}
// ------------HPV筛选的导航和疫苗列表----------
export interface Hpvselect {
	name: string;
	_id: string;
}
export interface Hpvlist {
	hpv_id: string;
	name: string;
	describe: string[];
	price: string[];
	_id: string;
}
// -------------hpv详情页-----------------
// 套餐名称
interface HpvName {
	combo: string;
	combo_id: string;
}
export interface Hpvcomboname {
	title: string;
	name: HpvName[];
}
// 接种时间
interface HpvTime {
	time: string;
	time_id: string;
}
export interface Hpvcombotime {
	title: string;
	name: HpvTime[];
}
// 查询hpv套餐价格---
export interface Hpvpriceapi {
	hpv_id: string;
	combo_id: string;
	time_id: string;
}
// 提交hpv疫苗
export interface Reshpvapi {
	name: string;
	id_card: string;
	gender: string;
	born_date: string;
	phone: string;
	combo: string;
	ino_time: string;
	price: number;
	hpv_name: string;
}
// ----------HPV疫苗预约订单------------
export interface Hpvorder {
	name: string;
	combo: string;
	ino_time: string;
	price: number;
	hpv_name: string;
	time: string;
	address: string;
	order_number: string;
	cancel: boolean;
	_id: string;
}
// -----------核酸检测预约---------
interface Date {
	date: string;
	week: string;
}
interface Style {
	title: string;
	desc: string[];
}
export interface Nucleicacid {
	address: string;
	hospital: string;
	logo: string;
	name: string;
	phone: string;
	price: number;
	boon: string[];
	date: Date[];
	style: Style[];
	_id?: string;
}
// 核酸检测提交
export interface Resnuataapi {
	name: string;
	phone: string;
	id_card: string;
	time: string;
}
// 核酸检测订单
export interface Nuatauserorder {
	address: string;
	cancel: boolean;
	name: string;
	order_number: string;
	phy_name: string;
	phy_time: string;
	price: number;
	time: string;
	_id: string;
}
// 提交图文咨询
export interface Graphics {
	illness: string;
	guide: boolean;
	ins_report: string[];
	patient_id: string;
}
// -----------获取就诊人---------
export interface Mypatient {
	age: string;
	born: string;
	id_card: string;
	name: string;
	phone: string;
	relation: string;
	sex: string;
	_id: string;
}
// ----------提交就诊人------
export interface Patientres {
	name: string;
	sex: string;
	born: string;
	relation: string;
	id_card: string;
	phone: string;
}
// ---------获取体检套餐----------
export interface Phyterm {
	query_val: string;
	_id: string;
	filter_val: string[];
}
export interface Phydata {
	be_suit: string;
	describe: string;
	image: string;
	price: number;
	sales: number;
	title: string;
	_id: string;
}
// ---------查询体检套餐---------
export interface FilterData {
	type: string;
	sales: string;
	price: string;
}
// ------------获取体检详情页数据-----------
interface Crowd {
	image: string;
	name: string;
}
interface Content {
	details: string;
	thing: string;
}
interface Project {
	title: string;
	content: Content[];
}
export interface Phydetail {
	image: string;
	price: number;
	sales: number;
	title: string;
	_id: string;
	crowd: Crowd[];
	date: Date[];
	project: Project[];
}
// --------提交体检套餐预约----------
export interface PhyRes {
	phy_name: string;
	phy_time: string;
	patient_id: string;
}
// ----------获取体检套餐订单--------
export interface PhyOredr {
	address: string;
	cancel: boolean;
	name: string;
	order_number: string;
	phy_name: string;
	phy_time: string;
	price: number;
	time: string;
	_id: string;
}
// ---------健康自测----------
// 题目
interface Options {
	son_id: string;
	title: string;
}
export interface Topic {
	topic: string;
	_id: string;
	options: Options[];
}
// 测评结果
interface Recommend {
	dep_id: string;
	dep_name: string;
	hospital: string;
}
export interface Testres {
	result: string;
	scope: string;
	suggest: string;
	_id: string;
	outline: string[];
	recommend: Recommend[] | [];
}
// 测评分享
export interface Sharedata {
	type: string;
	name: string;
	share_title: string;
	share_path: string;
	share_url: string;
}
// -------医师课堂
export interface Videotype {
	avatar: string;
	controls: boolean;
	name: string;
	play_but: boolean;
	video_title: string;
	video_url: string;
	_id: string;
}
// -----------请求的父科室数据----------
export interface Department {
	dep_ment: string;
	_id: string;
}
// -----------请求的字科室数据
interface DepList {
	dep_id: string;
	dep_name: string;
}
export interface Reglist {
	dep_ment: string;
	_id: string;
	dep_ment_list: DepList[];
}
// --------------选择挂号医生的日期-------
export interface Doctortime {
	date: string;
	dep_id: string;
	nu_source: number;
	week: string;
}
// --------------挂号医生列表-------
export interface Doctorlist {
	avatar: string;
	good_at: string;
	name: string;
	post: string;
	_id: string;
}
// ------------挂号医生主页-----------
interface DoctorHomeTime {
	already: number;
	nu_source: number;
	when: number;
	the_time: string[];
}
interface Appment {
	day: string;
	total_source: number;
	week: string;
	time: DoctorHomeTime[];
}
export interface Doctorhome {
	avatar: string;
	cost: number;
	good_at: string;
	hospital: string;
	name: string;
	post: string;
	_id: string;
	App_ment: Appment[];
}
// 提交挂号预约
export interface Regappoin {
	week: string;
	the_time: string;
	when: number;
	_id: string;
	patient_id: string;
}
// 预约挂号订单
export interface Registratorder {
	avatar: string;
	cancel: boolean;
	dep_ment: string;
	patient_name: string;
	que_number: string;
	reg_cost: number;
	remark: string;
	se_number: string;
	the_time: string;
	tre_doctor: string;
	tre_place: string;
	tre_time: string;
	_id: string;
}
