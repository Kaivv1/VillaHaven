import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Sass from "sass";
import Autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [react(), Sass({}), Autoprefixer()],
});
