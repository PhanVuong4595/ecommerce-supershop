import path from "path";
import fs from "fs";

export const saveImages = async (files, getPath) => {
  let returnPath = [];
  Object.keys(files).forEach((key) => {
    let fileConvertedName = Date.now().toString();
    let extensionName = path.extname(files[key].name);
    let fileName = fileConvertedName + extensionName;

    const filePath = path.join(
      __dirname,
      "..",
      `/public/images/${getPath}/`,
      fileName
    );

    returnPath.push(`/images/${getPath}/` + fileName);
    files[key].mv(filePath, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ status: "error", message: err });
      }
    });
  });
  return returnPath;
};

export const removeFiles = (getPath) => {
  const filePath = path.join(__dirname, "..", `/public/images/${getPath}/`);
  let removed = true;

  if (fs.existsSync(filePath)) {
    fs.rmdirSync(filePath, { recursive: true }, (err) => {
      if (err) {
        return (removed = false);
      }
    });
  }
  return removed;
};
