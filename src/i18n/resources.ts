const resources = {
  zh: {
    translation: {
      text_title: "地理位置距离计算",
      text_description: "🚗 批量计算地理位置之间各种交通方式的距离及所需时间",
      text_description_2:
        "👉 [演示与使用说明](https://fexakcngwi.feishu.cn/docx/TDb1dc7uIoD4IXx0QYHcn7yQnxb)",
      select_table: "选择数据表 - 必填",
      select_table_placeholder: "请选择",
      select_latitude_field: "输入字段1 - 必填",
      select_latitude_field_placeholder: "请选择，需「地理位置」类型",
      select_longitude_field: "输入字段2 - 必填",
      select_longitude_field_placeholder: "请选择，需「地理位置」类型",
      select_type: "计算模式 - 必填",
      select_type_placeholder: "请选择",
      direct: "直线距离",
      driving: "驾车 | 距离&时间",
      walking: "步行 | 距离&时间",
      bicycling: "骑行 | 距离&时间 - 最大支持500千米",
      transit: "公交 | 步行距离&时间 - 步行距离不支持跨城市",
      select_output_field_distance: "距离输出字段（千米）",
      select_output_field_distance_placeholder: "请选择，需「数字」类型",
      select_output_field_duration: "时间输出字段（分钟）",
      select_output_field_duration_placeholder: "请选择，需「数字」类型",
      button: "开始计算",
      completed: "计算完成",
      form_incomplete_error: "必填项未填写完整",
      processing_data: "计算中...",
      APIerror: "API 错误",
      output_field_error: "两个输出字段请至少填写一个",
      latitude_longitude_field_error: "两个输入字段不能一致",
      output_field_same_error: "两个输出字段不能一致",
    },
  },
  en: {
    translation: {
      text_title: "Location Distance Calculation",
      text_description:
        "🚗 Bulk calculate the distance and duration between locations for various modes of transportation",
      text_description_2:
        "👉 [Demo and Usage Instructions](https://fexakcngwi.feishu.cn/docx/TDb1dc7uIoD4IXx0QYHcn7yQnxb)",
      select_table: "Select Data Table - Required",
      select_table_placeholder: "Please Select",
      select_latitude_field: "Location Field 1 - Required",
      select_latitude_field_placeholder:
        "Please Select, Requires 'Location' Type",
      select_longitude_field: "Location Field 2 - Required",
      select_longitude_field_placeholder:
        "Please Select, Requires 'Location' Type",
      select_type: "Calculation Mode - Required",
      select_type_placeholder: "Please Select",
      direct: "Straight Line Distance",
      driving: "Driving | Distance & Duration",
      walking: "Walking | Distance & Duration",
      bicycling:
        "Bicycling | Distance & Duration - Maximum Support 500 Kilometers",
      transit:
        "Transit | Walking Distance & Duration - Walking Distance Does Not Support Cross-City",
      select_output_field_distance: "Distance Output Field (Kilometers)",
      select_output_field_distance_placeholder:
        "Please Select, Requires 'Number' Type",
      select_output_field_duration: "Duration Output Field (Minutes)",
      select_output_field_duration_placeholder:
        "Please Select, Requires 'Number' Type",
      button: "Start Calculation",
      completed: "Calculation Completed",
      form_incomplete_error: "Required Fields Not Completely Filled",
      processing_data: "Calculating...",
      APIerror: "API Error",
      output_field_error:
        "Please Fill in at Least One of the Two Output Fields",
      latitude_longitude_field_error:
        "The Two Location Fields Cannot Be the Same",
      output_field_same_error: "The Two Output Fields Cannot Be the Same",
    },
  },
};

export default resources;
