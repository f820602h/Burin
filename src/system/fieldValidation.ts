import { string, type AnySchema } from "yup";

interface FieldValidation {
  [field: string]: AnySchema;
}

export const userFieldValidation: FieldValidation = {
  name: string().max(40, "請勿超過 40 個字元").required("請輸入使用者名稱"),
  email: string().email("電子信箱格式錯誤").required("請輸入電子信箱"),
  password: string().min(8, "密碼長度不足").required("請輸入密碼"),
};

export const taskCategoryFieldValidation: FieldValidation = {
  name: string().max(12, "最多 12 個字元").required("請輸入群組名稱"),
  colorS: string().max(7),
  colorE: string().max(7),
};
