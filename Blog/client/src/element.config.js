import Vue from "vue"
import {
	Form,
	FormItem,
	Input,
	Dialog,
	Row,
	Button,
	Menu,
	MenuItem,
	Submenu,
	Card,
	Pagination,
	Timeline,
	TimelineItem,
	Container,
	Aside,
	Col,
	Main,
	Header,
	Breadcrumb,
	BreadcrumbItem,
	Table,
	TableColumn,
	Checkbox,
	Upload

} from "element-ui"

const elements = [Form,
	FormItem,
	Input,
	Dialog,
	Row,
	Button,
	Menu,
	MenuItem,
	Submenu,
	Card,
	Pagination,
	Timeline,
	TimelineItem,
	Container,
	Aside,
	Col,
	Main,
	Header,
	Breadcrumb,
	BreadcrumbItem,
	Table,
	TableColumn,
	Checkbox,
	Upload
]

export default {
	install(vue) {
		/**
		 * Vue.use 方法会自动调用install函数
		 * Install Element-ui Component plugin
		 * @param Vue
		 */
		elements.forEach(Component => {
			Vue.use(Component)
		})
	}
}
