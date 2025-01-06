import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { fileURLToPath } from 'url'

const baseUrl = import.meta.env && import.meta.env.VITE_BASE_URL;

// https://vitejs.dev/config/
export default defineConfig({
  base: "/ra67-diplom-react/",
  plugins: [react()],
}
)
