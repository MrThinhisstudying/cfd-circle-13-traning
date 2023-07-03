export const validate = (rules, values) => {
  let errorsObj = {};

  for (const errorKey in rules) {
    for (const rule of rules[errorKey]) {
      if (rule.required) {
        if (!!!values[errorKey]?.trim()) {
          errorsObj[errorKey] = rule.message || "Vui lòng điền thông tin";
          break;
        }
      }
      if (rule?.regex instanceof RegExp) {
        if (!rule.regex.test(values[errorKey])) {
          errorsObj[errorKey] = rule.message || "Vui lòng nhập đúng định dạng";
          break;
        }
      }
    }
  }

  return errorsObj;
};
