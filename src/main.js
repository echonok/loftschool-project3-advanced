import "./styles/main.pcss";
import '@babel/polyfill';

if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

import "./scripts/parallax";
import "./scripts/skills";
import "./scripts/works";
import "./scripts/reviews";