// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.query_reports["Employee Leave Balance"] = {
	filters: [
		{
			fieldname: "from_date",
			label: __("Bắt đầu"),
			fieldtype: "Date",
			reqd: 1,
			default: frappe.defaults.get_default("year_start_date")
		},
		{
			fieldname: "to_date",
			label: __("Kết thúc"),
			fieldtype: "Date",
			reqd: 1,
			default: frappe.defaults.get_default("year_end_date")
		},
		{
			label: __("Công ty"),
			fieldname: "company",
			fieldtype: "Link",
			options: "Company",
			reqd: 1,
			default: frappe.defaults.get_user_default("Company")
		},
		{
			fieldname: "department",
			label: __("Phòng ban"),
			fieldtype: "Link",
			options: "Department",
		},
		{
			fieldname: "employee",
			label: __("Nhân viên"),
			fieldtype: "Link",
			options: "Employee",
		},
		{
			fieldname: "consolidate_employee_name",
			label: __("Tổng hợp theo tên"),
			fieldtype: "Check",
			default: 1,
			depends_on: "eval: !doc.employee",
		}

		// {
		// 	fieldname: "employee_status",
		// 	label: __("Employee Status"),
		// 	fieldtype: "Select",
		// 	options: [
		// 		"",
		// 		{ "value": "Active", "label": __("Active") },
		// 		{ "value": "Inactive", "label": __("Inactive") },
		// 		{ "value": "Suspended", "label": __("Suspended") },
		// 		{ "value": "Left", "label": __("Left") },
		// 	],
		// 	default: "Active",
		// },
		// {
		// 	fieldname: "consolidate_leave_types",
		// 	label: __("Consolidate Leave Types"),
		// 	fieldtype: "Check",
		// 	default: 1,
		// 	depends_on: "eval: !doc.employee",
		// }
	],
	onload: () => {
		const today = frappe.datetime.now_date();

		frappe.call({
			type: "GET",
			method: "hrms.hr.utils.get_leave_period",
			args: {
				"from_date": today,
				"to_date": today,
				"company": frappe.defaults.get_user_default("Company")
			},
			freeze: true,
			callback: (data) => {
				frappe.query_report.set_filter_value("from_date", data.message[0].from_date);
				frappe.query_report.set_filter_value("to_date", data.message[0].to_date);
			}
		});
	}
}
