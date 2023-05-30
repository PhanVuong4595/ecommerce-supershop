export const filesPayloadExists = (req, res, next) => {
  if (!req.files) {
    return res.status(400).json({ status: "error", message: "Missing files" });
  }

  next();
};

const MB = 5; // 5 MB
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

export const fileSizeLimiter = (req, res, next) => {
  if (req.files) {
    const files = req.files;

    const filesOverLimit = [];
    // Which files are over the limit?
    Object.keys(files).forEach((key) => {
      if (files[key].size > FILE_SIZE_LIMIT) {
        filesOverLimit.push(files[key].name);
        console.log(files[key].name);
      }
    });

    if (filesOverLimit.length) {
      const properVerb = filesOverLimit.length > 1 ? "are" : "is";

      const sentence =
        `Upload failed. ${filesOverLimit.toString()} ${properVerb} over the file size limit of ${MB} MB.`.replaceAll(
          ",",
          ", "
        );

      const message =
        filesOverLimit.length < 3
          ? sentence.replace(",", " and")
          : sentence.replace(/,(?=[^,]*$)/, " and");
      return res.status(413).json({ status: "error", message });
    }
  }

  next();
};

import path from "path";

export const fileExtLimiter = (allowedExtArray) => {
  return (req, res, next) => {
    if (req.files) {
      const files = req.files;

      let fileExtensions = [];
      Object.keys(files).forEach((key) => {
        fileExtensions.push(path.extname(files[key].name));
      });

      // Are the file extension allowed?
      //const extensions = [...allowedExtArray];
      const allowed = fileExtensions.every((ext) =>
        allowedExtArray.includes(ext)
      );

      if (!allowed) {
        const message = `Upload failed. Only - ${allowedExtArray.join(
          ", "
        )} files are allowed.`;
        //const message = `Upload failed. Only ${allowedExtArray.toString()} files allowed.`.replaceAll(",", ", ");
        return res.status(422).json({ status: "error", message });
      }
    }
    next();
  };
};

