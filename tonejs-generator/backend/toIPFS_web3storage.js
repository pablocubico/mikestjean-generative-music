import process from "process";
import minimist from "minimist";
import { File, Web3Storage, getFilesFromPath } from "web3.storage";
import * as dotenv from "dotenv";
dotenv.config({
  path: "./.env.local",
});

const token = process.env.WEB3_STORAGE_TOKEN;

async function main() {
  const args = minimist(process.argv.slice(2));

  if (!token) {
    return console.error(
      "A token is needed. You can create one on https://web3.storage"
    );
  }

  // if (args._.length < 1) {
  //   return console.error("Please supply the path to a file or directory");
  // }

  const path = "dist/index.html";

  const fileData = {
    name: "Song #123",
    key: "Ab Melodic Minor",
    mood: "Soulful",
  };

  const buffer = Buffer.from(JSON.stringify(fileData));
  const dataFile = new File([buffer], "metadata.json");

  const storage = new Web3Storage({ token });
  const files = [];

  const pathFiles = await getFilesFromPath(path);
  files.push(...pathFiles);
  files.push(dataFile);

  console.log(`Uploading ${files.length} files`);
  const cid = await storage.put(files);
  console.log("Content added with CID:", cid);
}

main();
