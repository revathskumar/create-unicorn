import fs from "node:fs";

// destination.txt will be created or overwritten by default.
fs.copyFile("README.md", "README.md", (err) => {
  if (err) throw err;
  console.log("README.md was copied");
});
