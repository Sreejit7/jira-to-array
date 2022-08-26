function convertStringtoArrayObjects(csv, field) {
  const arrV = csv.split(/,\s*/);
  const arrO = arrV.map((val) => ({
    [field]: val,
  }));

  return JSON.stringify(arrO, null, 2);
}

function convertListtoArrayObjects(list, field) {
  const arrV = list.split(/\n/);
  const arrO = arrV.map((val) => ({
    [field]: val.replace(/[•-\d.]*\s*/, "").trim(),
  }));

  return JSON.stringify(arrO, null, 2);
}

export function convert(type = "CSV", input, fieldName) {
  console.log(fieldName);
  switch (type) {
    case "CSV":
      return convertStringtoArrayObjects(input, fieldName);
    case "List":
      return convertListtoArrayObjects(input, fieldName);
    default:
      console.error("This type isn't supported yet!");
      return;
  }
}
