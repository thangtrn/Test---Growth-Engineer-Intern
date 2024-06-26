import type { Config } from "tailwindcss";

const config: Config = {
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         colors: {
            primary: "#1890ff",
         },
         textColor: {
            title: "#e5e8ed",
            subtitle: "#8693a3",
         },
         backgroundColor: {
            darkness: "#061f41",
            overlay: "#00000080",
         },
      },
   },
   plugins: [],
};
export default config;
