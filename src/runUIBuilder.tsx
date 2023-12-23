import {
  FieldType,
  IWidgetField,
  IWidgetTable,
  UIBuilder,
} from "@lark-base-open/js-sdk";
import { UseTranslationResponse } from "react-i18next";

export default async function main(
  uiBuilder: UIBuilder,
  { t }: UseTranslationResponse<"translation", undefined>
) {
  // uiBuilder.markdown(`## ${t('text_title')}`);
  uiBuilder.markdown(t("text_description"));
  uiBuilder.form(
    (form) => ({
      formItems: [
        // 选择数据表
        form.tableSelect("table", {
          label: t("select_data_table"),
          placeholder: t("select_data_table_placeholder"),
        }),

        // 选择地理位置字段
        form.fieldSelect("latitudeField", {
          label: t("select_latitude_field"),
          sourceTable: "table",
          placeholder: t("select_latitude_field_placeholder"),
          multiple: false,
          filterByTypes: [FieldType.Location as any],
        }),
        form.fieldSelect("longitudeField", {
          label: t("select_longitude_field"),
          sourceTable: "table",
          placeholder: t("select_longitude_field_placeholder"),
          multiple: false,
          filterByTypes: [FieldType.Location as any],
        }),

        // 选择距离模式
        form.select("distanceType", {
          label: t("select_distance_type"),
          options: [
            { label: t("direct_distance"), value: "direct" },
            { label: t("driving_distance"), value: "driving" },
            { label: t("walking_distance"), value: "walking" },
          ],
          placeholder: t("select_distance_type_placeholder"),
        }),

        // 选择输出字段：距离
        form.fieldSelect("outputField", {
          label: t("select_output_field"),
          sourceTable: "table",
          placeholder: t("select_output_field_placeholder"),
          multiple: false,
          filterByTypes: [FieldType.Number as any],
        }),
        // 选择输出字段：时间
        form.fieldSelect("outputField_duration", {
          label: t("select_output_field_duration"),
          sourceTable: "table",
          placeholder: t("select_output_field_duration_placeholder"),
          multiple: false,
          filterByTypes: [FieldType.Number as any],
        }),
      ],
      buttons: [t("button")],
    }),
    async ({ values }) => {
      // 必填
      const table = values.table as IWidgetTable;
      const latitudeField = values.latitudeField as IWidgetField;
      const longitudeField = values.longitudeField as IWidgetField;
      const distanceType = values.distanceType as string;
      // 选填
      const outputFieldDistance = values.outputField as IWidgetField;
      const outputFieldDuration = values.outputField_duration as IWidgetField;

      // 检查是否填写了必填字段
      if (!table || !latitudeField || !longitudeField || !distanceType) {
        uiBuilder.message.error(t("form_incomplete_error"));
        throw new Error(t("form_incomplete_error"));
      }

      // 检查是否至少填写了一个输出字段
      if (!outputFieldDistance && !outputFieldDuration) {
        uiBuilder.message.error(t("output_field_error"));
        throw new Error(t("output_field_error"));
      }

      // 检查两个输入字段是否是同一个字段
      if (latitudeField === longitudeField) {
        uiBuilder.message.error(t("latitude_longitude_field_error"));
        throw new Error(t("latitude_longitude_field_error"));
      }

      // 检查两个输出字段是否是同一个字段
      if (outputFieldDistance === outputFieldDuration) {
        uiBuilder.message.error(t("output_field_same_error"));
        throw new Error(t("output_field_same_error"));
      }

      uiBuilder.showLoading(t("processing_data"));

      // 获取纪录列表
      const latitudeRecords = await latitudeField.getFieldValueList();
      const longitudeRecords = await longitudeField.getFieldValueList();

      // console.log("latitudeRecords:", latitudeRecords);
      // console.log("longitudeRecords:", longitudeRecords);

      // 检查是否有缺失的经纬度记录
      latitudeRecords.forEach((latRecord, index) => {
        if (!longitudeRecords[index]) {
          uiBuilder.hideLoading();
          uiBuilder.message.error(
            t("longitude_record_missing_error", {
              recordId: latRecord.record_id,
            })
          );
          throw new Error(
            t("longitude_record_missing_error", {
              recordId: latRecord.record_id,
            })
          );
        }
      });

      const updates = [];
      for (let index = 0; index < latitudeRecords.length; index++) {
        const latRecord = latitudeRecords[index];
        const [lon1, lat1] = latRecord.value.location.split(",").map(Number);
        const [lon2, lat2] = longitudeRecords[index].value.location
          .split(",")
          .map(Number);

        const { distance, duration } = await calculateDistance(
          lon1,
          lat1,
          lon2,
          lat2,
          distanceType,
          "6e1abfcb4d7681ab33ec051c0a25dfda",
          (errorMsg) => {
            uiBuilder.hideLoading();
            uiBuilder.message.error(t("APIerror")); // 显示错误消息
          }
        );

        const fields = {};
        if (outputFieldDistance) {
          fields[outputFieldDistance.id] = distance; // 千米
        }
        if (outputFieldDuration) {
          fields[outputFieldDuration.id] = duration; // 分钟
        }

        updates.push({
          recordId: latRecord.record_id,
          fields,
        });
      }

      // 分批处理，每批不超过 5000 条记录
      const BATCH_SIZE = 5000;
      for (let i = 0; i < updates.length; i += BATCH_SIZE) {
        const batchUpdates = updates.slice(i, i + BATCH_SIZE);
        if (batchUpdates.length > 0) {
          const res = await table.setRecords(batchUpdates);
          console.log(res);
        }
      }

      uiBuilder.hideLoading();
      uiBuilder.message.success(t("completed"));
    }
  );
}

// function calculateDistance(lat1, lon1, lat2, lon2) {
//   // 不使用API的计算方法
// console.log("lat1, lon1:", lat1, lon1);
// console.log("lat2, lon2:", lat2, lon2);
//   // Haversine formula to calculate the distance
//   const R = 6371; // Radius of the Earth in km
//   const dLat = deg2rad(lat2 - lat1);
//   const dLon = deg2rad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const distance = R * c; // Distance in km
// console.log("distance:", distance);
// console.log("typeof distance:", typeof distance); //打印distance的类别
//   return distance;
// }

// function deg2rad(deg) {
//   return deg * (Math.PI / 180);
// }

async function calculateDistance(
  lon1,
  lat1,
  lon2,
  lat2,
  distanceType,
  apiKey,
  errorCallback
) {
  const origins = `${lon1},${lat1}`;
  const destination = `${lon2},${lat2}`;
  let type;

  switch (distanceType) {
    case "direct":
      type = 0;
      break;
    case "driving":
      type = 1;
      break;
    case "walking":
      type = 3;
      break;
    default:
      throw new Error("Unknown distance type");
  }

  const url = `https://restapi.amap.com/v3/distance?origins=${origins}&destination=${destination}&type=${type}&key=${apiKey}`;

  // console.log("url:", url);

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "1") {
      throw new Error("AMap API request failed");
    }
    const result = data.results[0];
    // console.log("result:", result);
    // console.log("result.distance:", result.distance);
    return {
      distance: result.distance / 1000, // 转换为千米
      duration: result.duration / 60, // 转换为分钟
    };
  } catch (error) {
    console.error(error);
    errorCallback(error.message); // 调用错误回调函数
  }
}
