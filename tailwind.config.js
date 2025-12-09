/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#F9FAFB",  // light background
          dark: "#0F172A",     // dark background
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#1E293B",     // card, modal, sheet arkaplanı
        },

        // **METİN RENKLERİ**
        text: {
          DEFAULT: "#0F172A",  // strong text
          muted: "#64748B",    // kategori, açıklama vs.
          inverse: "#F8FAFC",  // darkmode text
          dark: {
            DEFAULT: "#F8FAFC",
            muted: "#94A3B8",
            inverse: "#0F172A",
          }
        },

        // **ÜRÜN LİSTELEME UYGULAMASI İÇİN TEMALAR**
        primary: {
          DEFAULT: "#2563EB",   // CTA button
          dark: "#3B82F6",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F59E0B",   // accent
          dark: "#FBBF24",
          foreground: "#0F172A",
        },

        // **STATE RENKLERİ**
        success: {
          DEFAULT: "#22C55E",
          dark: "#16A34A",
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#FACC15",
          dark: "#EAB308",
          foreground: "#0F172A",
        },
        danger: {
          DEFAULT: "#EF4444",
          dark: "#DC2626",
          foreground: "#FFFFFF",
        },

        // **FORM INPUT – BORDER – MUTED**
        border: {
          DEFAULT: "#E2E8F0",
          dark: "#334155",
        },
        input: {
          DEFAULT: "#FFFFFF",
          dark: "#1E293B",
        },
        muted: {
          DEFAULT: "#94A3B8",
          dark: "#64748B",
        },

        // **CARD / PRODUCT TILE RENKLERİ**
        card: {
          DEFAULT: "#FFFFFF",
          dark: "#1E293B",
          foreground: "#0F172A",
          darkForeground: "#F8FAFC",
        },

        // **BADGE RENKLERİ (Etiket, kampanya vs)**
        badge: {
          sale: "#EF4444",
          new: "#3B82F6",
          featured: "#F59E0B",
          darkSale: "#DC2626",
          darkNew: "#60A5FA",
          darkFeatured: "#FBBF24",
        }
      },
      spacing: {
        '3xs': '2px',
        '2xs': '4px',
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '20px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '40px',
      },
      fontSize: {
        xs: ['12px', '18px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '30px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '38px'],
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
        pill: '999px',
      },
      boxShadow: {
        soft: '0 4px 16px rgba(15, 23, 42, 0.08)',
        strong: '0 12px 32px rgba(15, 23, 42, 0.18)',
      },
    },
  },
  plugins: [],
}

