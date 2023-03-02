// pinia
import { defineStore } from 'pinia';

interface Patient {
	name: string;
	_id: string;
}

export const myData = defineStore('my_data', {
	// 数据仓库
	state: () => ({
		// 用户在某些页面选择就诊人需要值存在这里
		patient: {} as Patient,
	}),
	// 同步异步传值
	actions: {
		// 调用传值给state=》patient
		addPatient(value: Patient) {
			this.patient = value;
		},
	},
	// 计算属性
});
