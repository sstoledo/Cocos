// @type { import('tailwindcss').Config }
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      am: '250px',
      sm: '480px',
      dsm: '640px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      // Modo Light
      'light-bg': {
        primary: '#fffbfa',      // Fondo principal (blanco cálido)
        secondary: '#fffaea',    // Fondo secundario (amarillo muy claro)
        tertiary: '#eae7cb',     // Fondo terciario (beige)
        container: '#ffffff',    // Contenedores (blanco puro)
        surface: '#f8f7f6',      // Superficie de tarjetas/modales
        hover: '#f5f4f2',        // Estado hover para fondos
        active: '#f0efed',       // Estado active para fondos
        accent: '#eae7cb',       // Énfasis sutil (beige)
        muted: '#f5f5f5',        // Elementos atenuados
        overlay: '#fffbfae6',    // Overlay con transparencia
      },
      'light-text': {
        primary: '#00203e',      // Texto principal (azul marino)
        secondary: '#787878',    // Texto secundario (gris medio)
        tertiary: '#9a9a9a',     // Texto terciario (gris más claro)
        muted: '#b0b0b0',        // Texto atenuado
        accent: '#00315e',       // Texto destacado (azul marino más claro)
        inverse: '#ffffff',      // Texto inverso
        disabled: '#c0c0c0',     // Texto deshabilitado
      },
      'light-border': {
        default: '#eae7cb',      // Borde por defecto (beige)
        accent: '#00203e',       // Borde destacado (azul marino)
        hover: '#787878',        // Borde en hover (gris)
        active: '#00315e',       // Borde en active
        muted: '#e5e5e5',        // Borde atenuado
        divider: '#f0f0f0',      // Divisores
      },
      'light-btn': {
        primary: {
          DEFAULT: '#00203e',    // Botón primario (azul marino)
          hover: '#00315e',      // Hover (azul marino más claro)
          active: '#004280',     // Active (azul marino aún más claro)
          disabled: '#00203e80', // Deshabilitado
          text: '#ffffff',       // Texto del botón
        },
        secondary: {
          DEFAULT: '#787878',    // Botón secundario (gris)
          hover: '#898989',      // Hover
          active: '#696969',     // Active
          disabled: '#78787880', // Deshabilitado
          text: '#ffffff',       // Texto del botón
        },
        tertiary: {
          DEFAULT: '#eae7cb',    // Botón terciario (beige)
          hover: '#e0ddc1',      // Hover
          active: '#d6d3b7',     // Active
          disabled: '#eae7cb80', // Deshabilitado
          text: '#00203e',       // Texto del botón
        },
        destructive: {
          DEFAULT: '#dc2626',    // Botón destructivo
          hover: '#b91c1c',      // Hover
          active: '#991b1b',     // Active
          disabled: '#dc262680', // Deshabilitado
          text: '#ffffff',       // Texto del botón
        },
        ghost: {
          DEFAULT: 'transparent',// Botón fantasma
          hover: '#f5f4f2',      // Hover
          active: '#f0efed',     // Active
          disabled: '#78787840', // Deshabilitado
          text: '#00203e',       // Texto del botón
        }
      },
      'light-input': {
        default: '#ffffff',      // Fondo del input
        hover: '#fffbfa',        // Estado hover
        focus: '#fffaea',        // Estado focus
        disabled: '#f5f5f5',     // Estado deshabilitado
        border: '#eae7cb',       // Borde normal (beige)
        border_hover: '#787878', // Borde hover (gris)
        border_focus: '#00203e', // Borde focus (azul marino)
      },
      'light-status': {
        success: {
          DEFAULT: '#22c55e',    // Éxito
          bg: '#f0fdf4',         // Fondo
          text: '#166534',       // Texto
        },
        warning: {
          DEFAULT: '#f59e0b',    // Advertencia
          bg: '#fffbeb',         // Fondo
          text: '#b45309',       // Texto
        },
        error: {
          DEFAULT: '#ef4444',    // Error
          bg: '#fef2f2',         // Fondo
          text: '#b91c1c',       // Texto
        },
        info: {
          DEFAULT: '#00203e',    // Información (usando el azul marino)
          bg: '#f8fafc',         // Fondo
          text: '#00315e',       // Texto
        }
      },
      'light-scrollbar': {
        track: '#f5f4f2',        // Fondo de la pista
        thumb: '#787878',        // Pulgar de la barra (gris)
        thumb_hover: '#696969',  // Pulgar en hover
      },
      'light-selection': {
        bg: '#eae7cb',           // Fondo de selección de texto (beige)
        text: '#00203e',         // Texto seleccionado (azul marino)
      },

      // Modo Dark
      'dark-bg': {
        primary: '#2a3139',      // Fondo principal
        secondary: '#87919b',    // Fondo secundario
        tertiary: '#c4cbd5',     // Fondo terciario
        container: '#343b44',    // Contenedores (más oscuro que primary)
        surface: '#232931',      // Superficie de tarjetas/modales
        hover: '#313842',        // Estado hover para fondos
        active: '#3f464f',       // Estado active para fondos
        accent: '#4a515a',       // Énfasis sutil
        muted: '#1f252d',        // Elementos atenuados
        overlay: '#2a3139e6',    // Overlay con transparencia
      },
      'dark-text': {
        primary: '#ffffff',      // Texto principal
        secondary: '#c4cbd5',    // Texto secundario (usando tertiary como base)
        tertiary: '#87919b',     // Texto terciario (usando secondary como base)
        muted: '#6c757d',        // Texto atenuado
        accent: '#60a5fa',       // Texto destacado
        inverse: '#2a3139',      // Texto inverso
        disabled: '#4b5563',     // Texto deshabilitado
      },
      'dark-border': {
        default: '#404750',      // Borde por defecto
        accent: '#525b66',       // Borde destacado
        hover: '#5f6773',        // Borde en hover
        active: '#6b7380',       // Borde en active
        muted: '#343b44',        // Borde atenuado
        divider: '#383f48',      // Divisores
      },
      'dark-btn': {
        primary: {
          DEFAULT: '#60a5fa',    // Botón primario
          hover: '#3b82f6',      // Hover
          active: '#2563eb',     // Active
          disabled: '#60a5fa80', // Deshabilitado
          text: '#ffffff',       // Texto del botón
        },
        secondary: {
          DEFAULT: '#87919b',    // Botón secundario (usando secondary como base)
          hover: '#757f89',      // Hover
          active: '#646d77',     // Active
          disabled: '#87919b80', // Deshabilitado
          text: '#ffffff',       // Texto del botón
        },
        tertiary: {
          DEFAULT: '#404750',    // Botón terciario
          hover: '#4a515a',      // Hover
          active: '#545b64',     // Active
          disabled: '#40475080', // Deshabilitado
          text: '#c4cbd5',       // Texto del botón
        },
        destructive: {
          DEFAULT: '#ef4444',    // Botón destructivo
          hover: '#dc2626',      // Hover
          active: '#b91c1c',     // Active
          disabled: '#ef444480', // Deshabilitado
          text: '#ffffff',       // Texto del botón
        },
        ghost: {
          DEFAULT: 'transparent',// Botón fantasma
          hover: '#313842',      // Hover
          active: '#3f464f',     // Active
          disabled: '#2a313980', // Deshabilitado
          text: '#c4cbd5',       // Texto del botón
        }
      },
      'dark-input': {
        default: '#343b44',      // Fondo del input
        hover: '#3f464f',        // Estado hover
        focus: '#404750',        // Estado focus
        disabled: '#2a313980',   // Estado deshabilitado
        border: '#404750',       // Borde normal
        border_hover: '#525b66', // Borde hover
        border_focus: '#60a5fa', // Borde focus
      },
      'dark-status': {
        success: {
          DEFAULT: '#22c55e',    // Éxito
          bg: '#22c55e1a',       // Fondo
          text: '#86efac',       // Texto
        },
        warning: {
          DEFAULT: '#f59e0b',    // Advertencia
          bg: '#f59e0b1a',       // Fondo
          text: '#fcd34d',       // Texto
        },
        error: {
          DEFAULT: '#ef4444',    // Error
          bg: '#ef44441a',       // Fondo
          text: '#fca5a5',       // Texto
        },
        info: {
          DEFAULT: '#3b82f6',    // Información
          bg: '#3b82f61a',       // Fondo
          text: '#93c5fd',       // Texto
        }
      },
      'dark-scrollbar': {
        track: '#2a3139',        // Fondo de la pista
        thumb: '#404750',        // Pulgar de la barra
        thumb_hover: '#4a515a',  // Pulgar en hover
      },
      'dark-selection': {
        bg: '#60a5fa40',         // Fondo de selección de texto
        text: '#ffffff',         // Texto seleccionado
      }
    },
    extend: {
      // ... resto de la configuración existente
    },
  },
  plugins: [require('tailwindcss-animate')],
};