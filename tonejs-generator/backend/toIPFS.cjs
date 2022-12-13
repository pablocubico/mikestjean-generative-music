const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
require("dotenv").config();

const JWT = `Bearer ${process.env.PINATA_JWT}`;

const pinFileToIPFS = async () => {
  const formData = new FormData();
  const src = "dist/index.html";

  const file = fs.createReadStream(src);
  formData.append("file", file);

  const metadata = JSON.stringify({
    name: "Song #114",
  });
  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", options);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: JWT,
        },
      }
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

pinFileToIPFS();
