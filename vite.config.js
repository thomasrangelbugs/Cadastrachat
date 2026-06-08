import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Configura o Vite para compilar JSX com o runtime automático do React.
export default defineConfig({
  plugins: [react()],
});
