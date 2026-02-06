# GUÍA DE INSTALACIÓN - GITHUB PAGES

## 📋 Pasos para subir la app a GitHub

### 1️⃣ Crear Repositorio en GitHub

1. Ve a https://github.com y inicia sesión
2. Haz clic en el botón **"New"** (verde) o en el **"+"** arriba a la derecha
3. Completa los datos:
   - **Repository name**: `absolutos-calidad-app`
   - **Description**: `App de capacitación - Absolutos de Calidad Bechtel`
   - **Public** o **Private** (ambos funcionan)
   - ✅ Marca "Add a README file"
4. Haz clic en **"Create repository"**

### 2️⃣ Subir los Archivos

**Opción A: Desde la interfaz web de GitHub (Más fácil)**

1. En tu repositorio recién creado, haz clic en **"Add file"** → **"Upload files"**
2. Arrastra estos 4 archivos:
   - `index.html`
   - `app.js`
   - `manifest.json`
   - `README.md`
3. Escribe un mensaje: "Versión inicial de la app"
4. Haz clic en **"Commit changes"**

**Opción B: Usando Git (Si tienes Git instalado)**

```bash
# Clona el repositorio
git clone https://github.com/TU-USUARIO/absolutos-calidad-app.git

# Entra al directorio
cd absolutos-calidad-app

# Copia los 4 archivos al directorio

# Agrega los archivos
git add .

# Haz commit
git commit -m "Versión inicial de la app"

# Sube los cambios
git push origin main
```

### 3️⃣ Activar GitHub Pages

1. En tu repositorio, ve a **"Settings"** (⚙️)
2. En el menú lateral, busca **"Pages"** (dentro de "Code and automation")
3. En **"Source"**, selecciona:
   - Branch: **main**
   - Folder: **/ (root)**
4. Haz clic en **"Save"**
5. Espera 1-2 minutos

### 4️⃣ Acceder a tu App

Tu app estará disponible en:
```
https://TU-USUARIO.github.io/absolutos-calidad-app/
```

Por ejemplo:
- Si tu usuario es `claudio-qa`: https://claudio-qa.github.io/absolutos-calidad-app/

## 📱 Usar en iPhone

### Opción 1: Abrir directamente
1. Abre Safari en tu iPhone
2. Escribe la URL: `https://TU-USUARIO.github.io/absolutos-calidad-app/`
3. ¡Listo!

### Opción 2: Agregar como App (Recomendado)
1. Abre la URL en Safari
2. Toca el botón **"Compartir"** (cuadrado con flecha hacia arriba)
3. Desplázate y toca **"Añadir a inicio"**
4. Ajusta el nombre si quieres: "Absolutos Calidad"
5. Toca **"Añadir"**
6. Ya tienes un ícono en tu pantalla de inicio
7. Funciona sin internet después de la primera carga

## 🔗 Compartir con tu Equipo

Una vez publicada, puedes compartir el link por:
- ✅ WhatsApp
- ✅ Email
- ✅ SMS
- ✅ Slack
- ✅ Código QR

### Generar QR Code (Opcional)
1. Ve a: https://www.qr-code-generator.com/
2. Pega tu URL: `https://TU-USUARIO.github.io/absolutos-calidad-app/`
3. Descarga el QR
4. Imprime y pega en áreas comunes del proyecto

## ⚙️ Actualizar la App

Si necesitas hacer cambios:

1. Edita los archivos en tu computadora
2. Ve a tu repositorio en GitHub
3. Haz clic en el archivo que quieres cambiar
4. Haz clic en el ícono de lápiz (✏️ Edit)
5. Haz los cambios
6. Haz clic en **"Commit changes"**
7. Los cambios se reflejarán en 1-2 minutos

## 🆘 Solución de Problemas

**Problema: "404 - No se encuentra la página"**
- Solución: Espera 2-3 minutos después de activar Pages
- Verifica que los archivos estén en la raíz del repositorio

**Problema: "La app no carga bien en iPhone"**
- Solución: Asegúrate de usar Safari (no Chrome)
- Limpia la caché del navegador

**Problema: "Perdí mi progreso"**
- Solución: El progreso se guarda en el navegador local
- Si borras datos del navegador, se pierden los progresos

## 📞 Contacto

Para soporte técnico o mejoras a la app, contacta al Quality Lead.

---

¡Éxito con la capacitación! 🎯
