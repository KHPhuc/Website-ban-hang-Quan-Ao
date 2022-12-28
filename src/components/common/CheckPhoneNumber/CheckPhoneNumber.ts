// var _ = require("lodash");
export const detectPhoneNumber = function (phone_number: any) {
  phone_number = phone_number.replace(/[+,.\s]/g, "");
  phone_number = phone_number.replace(/^84/g, "0");
  var VIETTEL = /^0(9[678]|16[23456789]|86|3[23456789])[0-9]{7}/;
  var VINAPHONE = /^0(9[14]|12[34579]|8[834512])[0-9]{7}/;
  var MOBIFONE = /^0(9[03]|12[01268]|89|7[09768])[0-9]{7}/;
  var VIETNAMOBILE = /^0(92|18[86]|5[682])[0-9]{7}/;
  var GMOBILE = /^0(?:(99[34567])([0-9]{6})|(59|199)[0-9]{7})/;
  var vendor;
  if (VIETTEL.test(phone_number)) {
    vendor = "VIETTEL";
  } else if (VINAPHONE.test(phone_number)) {
    vendor = "VINAPHONE";
  } else if (MOBIFONE.test(phone_number)) {
    vendor = "MOBIFONE";
  } else if (VIETNAMOBILE.test(phone_number)) {
    vendor = "VIETNAMOBILE";
  } else if (GMOBILE.test(phone_number)) {
    vendor = "BEELINE";
  } else {
    return false;
    // throw new Error("Can not detect phone number");
  }
  return true;
  //   var _a = getPhoneNumberChange(phone_number),
  //     old_number = _a.old_number,
  //     new_number = _a.new_number;
  //   return {
  //     phone_number: phone_number,
  //     // old_number: old_number,
  //     // new_number: new_number,
  //     vendor: vendor,
  //     // is_change: !(old_number === new_number),
  //   };
};
// var getPhoneNumberChange = function (phone_number: any) {
//   var old_number = phone_number;
//   var new_number = phone_number;
//   var list_province = [
//     {
//       province_name: "Viettel",
//       old_province_code: "0162",
//       new_province_code: "032",
//     },
//     {
//       province_name: "Viettel",
//       old_province_code: "0163",
//       new_province_code: "033",
//     },
//     {
//       province_name: "Viettel",
//       old_province_code: "0164",
//       new_province_code: "034",
//     },
//     {
//       province_name: "Viettel",
//       old_province_code: "0165",
//       new_province_code: "035",
//     },
//     {
//       province_name: "Viettel",
//       old_province_code: "0166",
//       new_province_code: "036",
//     },
//     {
//       province_name: "Viettel",
//       old_province_code: "0167",
//       new_province_code: "037",
//     },
//     {
//       province_name: "Viettel",
//       old_province_code: "0168",
//       new_province_code: "038",
//     },
//     {
//       province_name: "Viettel",
//       old_province_code: "0169",
//       new_province_code: "039",
//     },
//     {
//       province_name: "Viettel",
//       old_province_code: "016966",
//       new_province_code: "03966",
//     },
//     {
//       province_name: "Mobifone",
//       old_province_code: "0128",
//       new_province_code: "078",
//     },
//     {
//       province_name: "Mobifone",
//       old_province_code: "0126",
//       new_province_code: "076",
//     },
//     {
//       province_name: "Mobifone",
//       old_province_code: "0122",
//       new_province_code: "077",
//     },
//     {
//       province_name: "Mobifone",
//       old_province_code: "0121",
//       new_province_code: "079",
//     },
//     {
//       province_name: "Mobifone",
//       old_province_code: "0120",
//       new_province_code: "070",
//     },
//     {
//       province_name: "Vinaphone",
//       old_province_code: "0125",
//       new_province_code: "085",
//     },
//     {
//       province_name: "Vinaphone",
//       old_province_code: "0123",
//       new_province_code: "083",
//     },
//     {
//       province_name: "Vinaphone",
//       old_province_code: "0129",
//       new_province_code: "082",
//     },
//     {
//       province_name: "Vinaphone",
//       old_province_code: "0127",
//       new_province_code: "081",
//     },
//     {
//       province_name: "Vinaphone",
//       old_province_code: "0124",
//       new_province_code: "084",
//     },
//     {
//       province_name: "Vietnamobile",
//       old_province_code: "01865",
//       new_province_code: "0565",
//     },
//     {
//       province_name: "Vietnamobile",
//       old_province_code: "01866",
//       new_province_code: "0566",
//     },
//     {
//       province_name: "Vietnamobile",
//       old_province_code: "01867",
//       new_province_code: "0567",
//     },
//     {
//       province_name: "Vietnamobile",
//       old_province_code: "01868",
//       new_province_code: "0568",
//     },
//     {
//       province_name: "Vietnamobile",
//       old_province_code: "01869",
//       new_province_code: "0569",
//     },
//     {
//       province_name: "Vietnamobile",
//       old_province_code: "01882",
//       new_province_code: "0582",
//     },
//     {
//       province_name: "Vietnamobile",
//       old_province_code: "01883",
//       new_province_code: "0583",
//     },
//     {
//       province_name: "Vietnamobile",
//       old_province_code: "01884",
//       new_province_code: "0584",
//     },
//     {
//       province_name: "Vietnamobile",
//       old_province_code: "01885",
//       new_province_code: "0585",
//     },
//     {
//       province_name: "Vietnamobile",
//       old_province_code: "01886",
//       new_province_code: "0586",
//     },
//     {
//       province_name: "Vietnamobile",
//       old_province_code: "01887",
//       new_province_code: "0587",
//     },
//     {
//       province_name: "Vietnamobile",
//       old_province_code: "01888",
//       new_province_code: "0588",
//     },
//     {
//       province_name: "Vietnamobile",
//       old_province_code: "01889",
//       new_province_code: "0589",
//     },
//     {
//       province_name: "Vietnamobile",
//       old_province_code: "01863",
//       new_province_code: "0563",
//     },
//     {
//       province_name: "Vietnamobile",
//       old_province_code: "01864",
//       new_province_code: "0564",
//     },
//     {
//       province_name: "Vietnamobile",
//       old_province_code: "01862",
//       new_province_code: "0562",
//     },
//     {
//       province_name: "Gmobile",
//       old_province_code: "01999",
//       new_province_code: "0599",
//     },
//     {
//       province_name: "Gmobile",
//       old_province_code: "01998",
//       new_province_code: "0598",
//     },
//     {
//       province_name: "Gmobile",
//       old_province_code: "01993",
//       new_province_code: "0593",
//     },
//     {
//       province_name: "Gmobile",
//       old_province_code: "01992",
//       new_province_code: "0592",
//     },
//   ];
//   var filter_by_old = _.filter(list_province, function (obj) {
//     var regex = new RegExp("^" + obj.old_province_code);
//     return regex.test(phone_number);
//   });
//   var filter_by_new = _.filter(list_province, function (obj) {
//     var regex = new RegExp("^" + obj.new_province_code);
//     return regex.test(phone_number);
//   });
//   if (filter_by_old.length > 0) {
//     new_number = phone_number.replace(
//       new RegExp("^" + filter_by_old[0].old_province_code),
//       filter_by_old[0].new_province_code
//     );
//   }
//   if (filter_by_new.length > 0) {
//     old_number = phone_number.replace(
//       new RegExp("^" + filter_by_new[0].new_province_code),
//       filter_by_new[0].old_province_code
//     );
//   }
//   return {
//     old_number: old_number,
//     new_number: new_number,
//   };
// };
