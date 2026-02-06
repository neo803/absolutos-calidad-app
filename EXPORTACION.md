# SISTEMA DE EXPORTACIÓN DE RESULTADOS

## 📊 Características Implementadas

La app ahora guarda automáticamente todas las evaluaciones y permite exportarlas en formato CSV para análisis posterior.

## 🔄 Funcionamiento Automático

### Al Completar una Evaluación:
1. El usuario completa un módulo de evaluación
2. **Automáticamente se guarda** en el historial local:
   - Fecha y hora
   - Datos del participante (nombre, apellido, empresa, correo)
   - Módulo evaluado
   - Cada pregunta con su respuesta
   - Respuesta correcta vs seleccionada
   - Puntuación total y porcentaje

## 📥 Dos Formas de Exportar

### 1️⃣ Exportar Resultado Individual
**Ubicación:** Pantalla de Resultados (después de completar un módulo)

**Botón:** 📥 Descargar Resultado (CSV)

**Contenido del archivo:**
```
Información del Participante
Nombre,Claudio
Apellido,González
Empresa,Bechtel
Correo,claudio@bechtel.com
Fecha,2025-02-06
Hora,14:30:25

Módulo,PARAR - Detenerse cuando no esté seguro
Puntuación,3/4
Porcentaje,75%

Detalle de Respuestas
Pregunta,Respuesta Seleccionada,Respuesta Correcta,Resultado
"¿Cuándo debes detenerte...","Cuando las cosas no parezcan...","Cuando las cosas no parezcan...","Correcta"
...
```

**Nombre del archivo:** `Evaluacion_PARAR_Claudio_González_2025-02-06.csv`

### 2️⃣ Exportar Todas las Evaluaciones
**Ubicación:** Pantalla Principal (Home)

**Botón:** 📊 Exportar Todas las Evaluaciones (X)
- El número (X) indica cuántas evaluaciones hay guardadas
- Solo aparece si hay evaluaciones guardadas

**Contenido del archivo:**
```csv
Fecha,Hora,Nombre,Apellido,Empresa,Correo,Módulo,Pregunta,Respuesta Seleccionada,Respuesta Correcta,Resultado,Puntuación Total,Porcentaje
2025-02-06,14:30:25,Claudio,González,Bechtel,claudio@bechtel.com,PARAR,"¿Cuándo debes...","Opción B","Opción B",Correcta,3/4,75%
2025-02-06,14:35:10,Claudio,González,Bechtel,claudio@bechtel.com,SEGUIR,"¿Qué significa...","Opción A","Opción B",Incorrecta,2/4,50%
...
```

**Nombre del archivo:** `Evaluaciones_Absolutos_Calidad_2025-02-06.csv`

## 📋 Estructura de los Datos Exportados

### Campos Incluidos:
1. **Información del Participante:**
   - Fecha de evaluación
   - Hora de evaluación
   - Nombre
   - Apellido
   - Empresa
   - Correo electrónico

2. **Información del Módulo:**
   - Nombre del módulo (PARAR, SEGUIR, etc.)
   - Subtítulo del módulo

3. **Resultados:**
   - Puntuación (Ej: 3/4)
   - Porcentaje (Ej: 75%)

4. **Detalle por Pregunta:**
   - Texto de la pregunta
   - Respuesta seleccionada por el usuario
   - Respuesta correcta
   - Resultado (Correcta/Incorrecta)

## 💾 Almacenamiento

- **Ubicación:** Navegador del usuario (localStorage)
- **Capacidad:** Ilimitada (prácticamente)
- **Persistencia:** Los datos permanecen aunque cierre el navegador
- **Privacidad:** Los datos solo están en el dispositivo del usuario

## 📊 Uso de los Archivos CSV

### Abrir con Excel:
1. Descarga el archivo CSV
2. Abre Excel
3. Archivo → Abrir → Selecciona el CSV
4. Excel mostrará los datos en columnas organizadas

### Importar a Google Sheets:
1. Abre Google Sheets
2. Archivo → Importar
3. Sube el archivo CSV
4. Selecciona "Detectar automáticamente"

### Análisis Recomendado:
- **Filtrar por fecha** para ver evaluaciones de un período
- **Filtrar por módulo** para análisis por tema
- **Filtrar por usuario** para seguimiento individual
- **Crear tablas dinámicas** para estadísticas
- **Generar gráficos** de porcentajes de aprobación

## 🔒 Privacidad y Seguridad

✅ Los datos se guardan **solo en el dispositivo del usuario**
✅ **No se envían** a ningún servidor
✅ El supervisor puede solicitar el archivo al usuario
✅ El usuario controla cuándo compartir sus resultados

## 📧 Compartir Resultados

El usuario puede enviar los archivos CSV por:
- ✉️ Email
- 💬 WhatsApp
- 📱 Slack
- ☁️ Google Drive / OneDrive
- 📎 Adjuntos en sistemas LMS

## 🎯 Casos de Uso

### Para Supervisores de Calidad:
1. Solicitar a cada trabajador que exporte y envíe sus resultados
2. Consolidar todos los CSV en una hoja maestra
3. Analizar estadísticas de capacitación del equipo
4. Identificar áreas que requieren refuerzo

### Para Registros de Proyecto:
1. Exportar evaluación individual después de cada módulo
2. Archivar en carpeta personal de capacitación
3. Presentar como evidencia de competencia

### Para Auditorías:
1. Demostrar que el personal fue capacitado
2. Mostrar resultados de evaluación
3. Evidenciar fechas de capacitación

## ⚠️ Importante

- Los datos se **borran** si el usuario limpia los datos del navegador
- Recomendar **exportar regularmente** para no perder historial
- Para evaluaciones oficiales, exportar inmediatamente después de completar

## 🔄 Actualizar la App

Si sube una versión nueva a GitHub:
- Los datos guardados **se mantienen** en el navegador
- El historial no se pierde al actualizar la app
- Solo se pierde si el usuario borra datos del navegador manualmente

---

**Recomendación:** Instruir a los usuarios a exportar sus evaluaciones después de cada módulo completado y enviarlas a su supervisor de calidad para registro oficial.
