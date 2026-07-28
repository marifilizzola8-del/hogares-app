# +Hogares — Contexto del Proyecto

> **Fuente de datos:** `Data mock/mock_data.py` — generador Python determinístico.
> Los 5 solicitantes del prototipo son los seeds reales (persona_id 0–4) del archivo Python.
> Las reglas de negocio (tasa cuota, ratio máximo, ai_decision) son las mismas del Python.

## Qué es esto

Prototipo funcional de **+Hogares**, la consola operativa de evaluación hipotecaria del Banco de la Nación Argentina. Permite a analistas humanos revisar solicitudes de crédito hipotecario, ver datos del solicitante consolidados (RENAPER, BCRA, AFIP, propiedad), y tomar una decisión (aprobar / rechazar / en espera) luego de ejecutar un análisis de IA.

Es un **frontend estático puro** — HTML + CSS + JavaScript vanilla, sin frameworks, sin build step, sin backend. Se abre directamente en el browser.

---

## Estructura de archivos

```
hogares-app/
├── index.html        Dashboard principal (KPIs, distribuciones, Top 5, histórico)
├── solicitudes.html  Cola operativa (tabla de solicitudes pendientes)
├── detalle.html      Detalle de una solicitud (datos del solicitante)
├── analisis.html     Resultado del análisis IA + panel de decisión
├── shared.css        Hoja de estilos compartida por todas las páginas
├── mock-data.js      Datos mock de 10 solicitantes + helpers de navegación
└── AGENT.md          Este archivo
```

---

## Flujo de navegación

```
index.html
  └── solicitudes.html          (?sin params)
        └── detalle.html        (?id=REQ-XXXXX)
              └── analisis.html (?id=REQ-XXXXX)
```

La ID se pasa siempre como query param `?id=REQ-XXXXX`. Si no hay param, se usa la primera solicitud por defecto (`SOLICITUDES[0]`).

Los links del Top 5 en el dashboard también enlazan directo a `detalle.html?id=REQ-XXXXX`.

---

## mock-data.js

**Origen:** derivado de `Data mock/mock_data.py`. Los 5 objetos corresponden exactamente a los seeds `RENAPER[0..4]` / `BCRA[0..4]` / `AFIP[0..4]` del Python. Las reglas aplicadas:
- `cuota = precio_pesos × 0.0030` (`_TASA_CUOTA_MENSUAL`)
- `ratio = cuota / neto`
- `ai_decision`: score ≥ 900 → APROBAR · score < 620 → RECHAZAR · resto → REVISAR
- `sla_vencido`: true si `created_at + 1440h < now` y status no es aprobada/rechazada
- `prioridad`: alta si edad en cola ≥ 30 días

Exporta en el scope global:

- **`SOLICITUDES`** — array de 10 objetos, uno por solicitante
- **`getSolicitudById(id)`** — devuelve el objeto o `null`
- **`getIdFromURL()`** — lee `?id=` del query string, fallback al primer elemento
- **`getIndexById(id)`** — devuelve el índice en el array (para navegación Anterior/Siguiente)

### Estructura de cada solicitud

```js
{
  id: 'REQ-00049',
  fecha_creacion: '15/05/2026',
  sla_vencido: true,           // boolean
  tiempo_cola: 'hace 70 d 0 h',
  agente: 'María Eugenia López',
  prioridad: 'alta',           // 'alta' | 'media' | 'baja'
  ai_decision: 'APROBAR',      // 'APROBAR' | 'REVISAR' | 'RECHAZAR'
  ai_color: 'verde',           // 'verde' | 'amarillo' | 'rojo'
  renaper: { nombre, dni, cuil, nacimiento, domicilio, telefono },
  bcra:    { situacion, score, deudas, negativos },
  afip:    { categoria, empleador, estado, inscripcion },
  propiedad: { direccion, tipo, superficie, precio, cuota, ratio, elegible },
  credito:   { destino, valor, sucursal },
  payslips:  [ { periodo, bruto, neto }, ... ],  // 3 meses
  analisis: {
    estado,           // 'verde' | 'amarillo' | 'rojo'
    decision,         // texto: 'Sugerencia: Aprobar'
    resumen,          // párrafo de resumen
    razones,          // array de strings
    condiciones,      // array de strings
    haberes_tendencia,
    haberes_promedio,
    haberes_consistencia,
  }
}
```

### IDs disponibles (seeds reales de mock_data.py)

| ID        | persona_id | Nombre                  | Decisión IA | Score | Ratio  | SLA vencido |
|-----------|------------|-------------------------|-------------|-------|--------|-------------|
| REQ-00001 | 0          | Carlos Alberto Méndez   | APROBAR     | 940   | 24.7%  | ✓ sí        |
| REQ-00002 | 1          | Luciana Paola Ferreyra  | REVISAR     | 910   | 41.4%  | ✓ sí        |
| REQ-00003 | 2          | Roberto Carlos Sánchez  | RECHAZAR    | 720   | 37.8%  | ✓ sí        |
| REQ-00004 | 3          | Valentina Inés Torres   | REVISAR     | 965   | 44.4%  | no          |
| REQ-00005 | 4          | Martín Ezequiel Ibáñez  | APROBAR     | 955   | 22.6%  | no          |

**Propiedades del pool** (de `PROPIEDADES` en mock_data.py):

| ID      | Dirección                              | Precio       | Cuota (×0.003) |
|---------|----------------------------------------|--------------|----------------|
| HOG-001 | Av. Corrientes 3840, CABA              | $ 145.000.000 | $ 435.000      |
| HOG-002 | Gurruchaga 1456, CABA                  | $ 185.000.000 | $ 555.000      |
| HOG-003 | San Lorenzo 892, Rosario               | $ 98.000.000  | $ 294.000      |
| HOG-004 | Colón 234, Córdoba Capital             | $ 112.000.000 | $ 336.000      |
| HOG-005 | Arístides Villanueva 540, Mendoza      | $ 165.000.000 | $ 495.000      |

**Agentes** (de `AGENTS` en mock_data.py):

| ID        | Nombre                  | Sucursal        |
|-----------|-------------------------|-----------------|
| agent-001 | María Eugenia López     | Casa Central    |
| agent-002 | Julián Andrés Pérez     | Rosario Centro  |
| agent-003 | Carolina Beatriz Ruiz   | Córdoba Centro  |
| agent-004 | Federico Martín Sosa    | Mendoza Centro  |
| agent-005 | Ana Paula Gómez         | Microcentro     |
| agent-006 | Santiago Nicolás Díaz   | Belgrano        |

---

## shared.css — Design tokens

```css
--blue:       #2b6e8e   /* color principal BNA */
--blue-dark:  #1f5870
--blue-light: #e8f2f7
--gold:       #f26c29   /* acento naranja BNA */
--bg:         #f0f4f8   /* fondo general */
--surface:    #f8fafc
--border:     #dde3ed
--text:       #0f172a
--muted:      #475569
--verde:      #15803d
--rojo:       #b91c1c
--amber:      #92400e
--radius:     12px
```

### Componentes principales disponibles

| Clase / componente | Descripción |
|--------------------|-------------|
| `.navbar` / `.navbar-inner` | Barra de navegación fija (56px alto) |
| `.context-bar` | Barra sticky debajo del navbar (`top: 56px`) con breadcrumb y chips |
| `.bc-status-alta/media/baja/vencida/analisis` | Chips de estado del context bar |
| `.chip`, `.chip-alta/media/baja/pendiente/vencida` | Chips de prioridad |
| `.chip-aprobar/revisar/rechazar` | Chips de decisión IA |
| `.btn-analizar`, `.btn-analizar-lg` | Botón primary "Analizar con IA" |
| `.btn-ghost` | Botón secondary outline |
| `.btn-abrir` | Botón compacto de tabla "Abrir →" |
| `.card`, `.card-section-title` | Card genérica con sombra |
| `.field-table`, `.field-row` | Grilla de campos label/valor |
| `.kpi-card`, `.kpi-value`, `.kpi-label` | Cards de KPI del dashboard |
| `.rec-panel`, `.rec-verde/amarillo/rojo` | Panel de recomendación IA con semáforo |
| `.semaforo`, `.semaforo.verde/amarillo/rojo` | Indicador de semáforo |
| `.timeline`, `.tl-item`, `.tl-dot-blue/red/green` | Timeline del historial |
| `.haberes-table`, `.haberes-reciente` | Tabla de historial de haberes |
| `.decision-panel`, `.btn-decision`, `.btn-aprobar/esperar/rechazar` | Panel de decisión del analista |
| `.modal-overlay`, `.modal-card` | Modal de confirmación |
| `.toast` | Notificación toast post-decisión |
| `.cta-analizar-banner` | Banner CTA al pie del detalle |
| `.row-sla` | Fila de tabla con SLA vencido (fondo rojo tenue) |
| `.score-mini`, `.score-bar`, `.score-fill` | Mini-barra de score BCRA |
| `.sla-banner` | Banner de alerta SLA |

---

## Decisiones de diseño importantes

### Flujo de decisión forzado
Los botones Aprobar / Rechazar / En espera **solo aparecen en `analisis.html`**, nunca en `detalle.html`. El analista debe ejecutar el análisis IA antes de poder tomar una decisión. Esto es intencional.

### Context bar sticky
Cada página tiene una barra contextual pegada debajo del navbar (`position: sticky; top: 56px`). Muestra breadcrumb + chips de estado de la solicitud activa. Visible en todo momento mientras se hace scroll.

### Navegación Anterior/Siguiente
En `detalle.html`, los botones Anterior/Siguiente calculan la solicitud vecina usando `getIndexById()` sobre el array `SOLICITUDES`. El primero y el último se deshabilitan automáticamente.

### Sin controles de estado manual en el detalle
El bloque de dropdowns "Prioridad manual / Estado / Guardar cambios" fue eliminado. El estado de una solicitud solo cambia como resultado de la decisión formal en `analisis.html`.

### Botón "Analizar con IA" — solo 2 apariciones en detalle
Solo aparece en el **header del detalle** (acceso rápido) y en el **banner CTA al final** de la página. Se eliminó la aparición en el context bar y en la card de recibos para evitar ruido visual.

---

## Cosas que NO están implementadas (pendiente o fuera de scope)

- Backend / API real — todo es mock estático
- Autenticación / login
- Persistencia de notas internas (se pierden al recargar)
- Paginación real de la tabla (está hardcodeada a "1 de 45")
- Filtros funcionales en `solicitudes.html` (los dropdowns no filtran todavía)
- El gráfico histórico en el dashboard es SVG estático
- Exportar CSV / JSON (botones presentes pero sin lógica)
