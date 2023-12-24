const resources = {
  zh: {
    translation: {
      "text_title": "地理位置距离计算",
      "text_description": "🚗 批量计算地理位置之间各种交通方式的距离及所需时间",
      "text_description_2": "👉 [演示与使用说明](https://fexakcngwi.feishu.cn/docx/TDb1dc7uIoD4IXx0QYHcn7yQnxb)",
      "select_table": "选择数据表 - 必填",
      "select_table_placeholder": "请选择",
      "select_latitude_field": "输入字段1 - 必填",
      "select_latitude_field_placeholder": "请选择，需「地理位置」类型",
      "select_longitude_field": "输入字段2 - 必填",
      "select_longitude_field_placeholder": "请选择，需「地理位置」类型",
      "select_type": "计算模式 - 必填",
      "select_type_placeholder": "请选择",
      "direct": "直线距离",
      "driving": "驾车 | 距离&时间",
      "walking": "步行 | 距离&时间",
      "bicycling": "骑行 | 距离&时间 - 最大支持500千米",
      "transit": "公交 | 步行距离&时间 - 步行距离不支持跨城市",
      "select_output_field_distance": "距离输出字段（千米）",
      "select_output_field_distance_placeholder": "请选择，需「数字」类型",
      "select_output_field_duration": "时间输出字段（分钟）",
      "select_output_field_duration_placeholder": "请选择，需「数字」类型",
      "button": "开始计算",
      "completed": "计算完成",
      "form_incomplete_error": "必填项未填写完整",
      "processing_data": "计算中...",
      "APIerror": "API 错误",
      "output_field_error": "两个输出字段请至少填写一个",
      "latitude_longitude_field_error": "两个输入字段不能一致",
      "output_field_same_error": "两个输出字段不能一致",
    },
  },
  en: {
    translation: {
      "text_title": "Location Distance Calculator",
      "text_description": "> Batch calculate the distance and duration between two Location fields.",
      "select_table": "Select Data Table*",
      "select_table_placeholder": "Please select",
      "select_latitude_field": "Enter Field 1*",
      "select_latitude_field_placeholder": "Please select. Requires 'Location' type",
      "select_longitude_field": "Enter Field 2*",
      "select_longitude_field_placeholder": "Please select. Requires 'Location' type",
      "select_type": "Select Calculation Mode*",
      "select_type_placeholder": "Please select.",
      "direct": "Direct Distance",
      "driving": "Driving Distance/Duration",
      "walking": "Walking Distance/Duration",
      "bicycling": "Bicycling Distance/Duration",
      "transit": "Transit Duration",
      "select_output_field_distance": "Distance Output Field (Kilometers)",
      "select_output_field_distance_placeholder": "Please select. Requires 'Number' type",
      "select_output_field_duration": "Duration Output Field (Minutes)",
      "select_output_field_duration_placeholder": "Please select. Requires 'Number' type, not supported in Direct Distance Calculation Mode",
      "button": "Start Calculation",
      "completed": "Calculation Completed",
      "form_incomplete_error": "Mandatory fields not completely filled",
      "processing_data": "Calculating...",
      "APIerror": "API Error",
      "output_field_error": "Please fill in at least one of the two output fields",
      "latitude_longitude_field_error": "The two input fields cannot be the same",
      "output_field_same_error": "The two output fields cannot be the same",
    },
  },

};

export default resources;
