const styleFile = require.context("./src", false, /\.less$/);
styleFile.keys().forEach((item) => styleFile(item));
