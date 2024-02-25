import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [react(), Autoprefixer()],
});
