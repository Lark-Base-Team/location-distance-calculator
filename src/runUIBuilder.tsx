import {
  FieldType,
  ITable,
  ILocationField,
  INumberField,
  UIBuilder,
} from "@lark-base-open/js-sdk";
import { UseTranslationResponse } from "react-i18next";
// import { cityCodes } from './CityCodes';

export default async function main(
  uiBuilder: UIBuilder,
  { t }: UseTranslationResponse<"translation", undefined>
) {
  const apiKey = "6e1abfcb4d7681ab33ec051c0a25dfda"; // 高德API密钥
  // uiBuilder.markdown(`## ${t('text_title')}`);
  uiBuilder.markdown(t("text_description"));
  uiBuilder.form(
    (form) => ({
      formItems: [
        // 选择数据表
        form.tableSelect("table", {
          label: t("select_table"),
          placeholder: t("select_table_placeholder"),
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
          label: t("select_type"),
          options: [
            { label: t("direct"), value: "direct" },
            { label: t("driving"), value: "driving" },
            { label: t("walking"), value: "walking" },
            { label: t("bicycling"), value: "bicycling" },
            { label: t("transit"), value: "transit" },
          ],
          placeholder: t("select_type_placeholder"),
        }),

        // 选择输出字段：距离
        form.fieldSelect("outputField_distance", {
          label: t("select_output_field_distance"),
          sourceTable: "table",
          placeholder: t("select_output_field_distance_placeholder"),
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
      const table = values.table as ITable;
      const latitudeField = values.latitudeField as ILocationField;
      const longitudeField = values.longitudeField as ILocationField;
      const distanceType = values.distanceType as string;
      console.log("table:", table);
      console.log("latitudeField:", latitudeField);
      console.log("longitudeField:", longitudeField);
      console.log("distanceType:", distanceType);
      // 选填
      const outputFieldDistance = values.outputField_distance as INumberField;
      const outputFieldDuration = values.outputField_duration as INumberField;
      console.log("outputFieldDistance:", outputFieldDistance);
      console.log("outputFieldDuration:", outputFieldDuration);

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

      const recordIdList = await table.getRecordIdList();
      for (const recordId of recordIdList) {
        const latitudeVal = await latitudeField.getValue(recordId);
        const longitudeVal = await longitudeField.getValue(recordId);

        if (!latitudeVal || !longitudeVal) {
          // 处理空值的情况，例如显示错误信息或跳过当前记录
          continue;
        }

        const latitudeLocation = latitudeVal.location;
        const longitudeLocation = longitudeVal.location;
        const latitudeCity = latitudeVal.cityname;
        const longitudeCity = longitudeVal.cityname;
        console.log("latitudeLocation:", latitudeLocation);
        console.log("longitudeLocation:", longitudeLocation);
        console.log("latitudeCity:", latitudeCity);
        console.log("longitudeCity:", longitudeCity);
        // const latitudeCityCode = cityCodes[latitudeCity];
        // const longitudeCityCode = cityCodes[longitudeCity];
        // console.log("latitudeCityCode:", latitudeCityCode);
        // console.log("longitudeCityCode:", longitudeCityCode);

        const result = await calculateDistance(
          latitudeLocation,
          longitudeLocation,
          latitudeCity,
          longitudeCity,
          distanceType,
          apiKey,
          (errorMsg) => {
            uiBuilder.message.error(t("APIerror") + ": " + errorMsg); // 显示具体的错误消息
          }
        );

        if (result) {
          console.log("distance:", result.distance);
          console.log("duration:", result.duration);
          if (outputFieldDistance) {
            await outputFieldDistance.setValue(recordId, result.distance);
          }
          if (outputFieldDuration) {
            await outputFieldDuration.setValue(recordId, result.duration);
          }
        } else {
          // 处理结果为undefined的情况
          // uiBuilder.message.error(t("APIerror")); // 显示错误消息
          continue;
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

// type TravelMode = 'direct' | 'driving' | 'walking' | 'bicycling'  | 'transit';

// interface RouteResult {
//   distance: string;  // 路径距离
//   duration: string;  // 预计耗时
// }

async function calculateDistance(
  origin: string,
  destination: string,
  originCity: string,
  destinationCity: string,
  mode: string,
  apiKey: string,
  errorCallback: (errorMsg: string) => void
) {
  let url: string;

  // 根据不同的出行方式选择不同的API
  switch (mode) {
    case "direct":
      url = `https://restapi.amap.com/v3/distance?type=0&origins=${origin}&destination=${destination}&key=${apiKey}`;
      break;
    case "driving":
      url = `https://restapi.amap.com/v3/distance?type=1&origins=${origin}&destination=${destination}&key=${apiKey}`;
      break;
    case "walking":
      url = `https://restapi.amap.com/v3/distance?type=3&origins=${origin}&destination=${destination}&key=${apiKey}`;
      break;
    case "bicycling":
      url = `https://restapi.amap.com/v4/direction/bicycling?origin=${origin}&destination=${destination}&key=${apiKey}`;
      break;
    case "transit":
      url = `https://restapi.amap.com/v3/direction/transit/integrated?origin=${origin}&destination=${destination}&key=${apiKey}&city=${originCity}&cityd=${destinationCity}`;
      break;
    default:
      throw new Error("Unknown mode");
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("data:", data);

    // 处理返回的结果
    let distance, duration;
    //如果是direct或者walking或者driving模式
    if (mode === "direct" || mode === "walking" || mode === "driving") {
      if (data.status !== "1") {
        throw new Error(data.info);
      }
      distance = data.results[0].distance / 1000;
      duration = data.results[0].duration / 60;
    } else if (mode === "bicycling") {
      if (data.errcode !== 0) {
        throw new Error(data.errdetail);
      }
      distance = data.data.paths[0].distance / 1000;
      duration = data.data.paths[0].duration / 60;
    } else if (mode === "transit") {
      if (data.status !== "1") {
        throw new Error(data.info);
      }
      distance = 0;
      duration = data.route.transits[0].duration / 60;
    } else {
      throw new Error("Unknown mode");
    }
    return { distance, duration };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      errorCallback(error.message); // 安全地调用错误回调函数
    } else {
      // 如果 error 不是一个 Error 实例，处理其他情况
      console.error("An unknown error occurred");
      errorCallback("An unknown error occurred"); // 或者使用一个通用的错误消息
    }
  }
}
