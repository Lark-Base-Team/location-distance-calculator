const resources = {
  zh: {
    translation: {
      "text_title": "地理位置距离计算",
      "text_description": "> 批量计算两个字段的地理位置之间的距离及所需时间。",
      "select_data_table": "选择数据表*",
      "select_data_table_placeholder": "请选择",
      "select_latitude_field": "输入字段1*",
      "select_latitude_field_placeholder": "请选择，需「地理位置」类型",
      "select_longitude_field": "输入字段2*",
      "select_longitude_field_placeholder": "请选择，需「地理位置」类型",
      "select_distance_type": "计算模式*",
      "select_distance_type_placeholder": "请选择",
      "direct_distance": "直线距离",
      "driving_distance": "驾车距离/时间",
      "walking_distance": "步行距离/时间",
      "select_output_field": "距离输出字段（千米）",
      "select_output_field_placeholder": "请选择，需「数字」类型",
      "select_output_field_duration": "时间输出字段（分钟）",
      "select_output_field_duration_placeholder": "请选择，需「数字」类型，不支持「直线距离」计算模式",
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
      "select_data_table": "Select Data Table*",
      "select_data_table_placeholder": "Please select",
      "select_latitude_field": "Enter Field 1*",
      "select_latitude_field_placeholder": "Please select. Requires 'Location' type",
      "select_longitude_field": "Enter Field 2*",
      "select_longitude_field_placeholder": "Please select. Requires 'Location' type",
      "select_distance_type": "Select Calculation Mode*",
      "select_distance_type_placeholder": "Please select.",
      "direct_distance": "Direct Distance",
      "driving_distance": "Driving Distance/Duration",
      "walking_distance": "Walking Distance/Duration",
      "select_output_field": "Distance Output Field (Kilometers)",
      "select_output_field_placeholder": "Please select. Requires 'Number' type",
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
