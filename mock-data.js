// ─────────────────────────────────────────────────────────────
//  +Hogares — Mock Data (derived from mock_data.py seed data)
//
//  Source: Data mock/mock_data.py
//  Seeds:  5 personas (persona_id 0–4) → REQ-00001..REQ-00005
//  Logic:  salaries, cuota, ratio, ai_decision follow the same
//          rules as the Python generator.
//
//  _TASA_CUOTA_MENSUAL = 0.0030
//  _RATIO_CUOTA_MAX    = 0.35
//  priority            = alta if queue age >= 30 days
//  ai_decision         = APROBAR if score>=900 | RECHAZAR if score<620 | REVISAR otherwise
// ─────────────────────────────────────────────────────────────

const SOLICITUDES = [
  // ── REQ-00001 · Carlos Alberto Méndez ──────────────────────
  // persona_id=0, seed=RENAPER[0]/BCRA[0]/AFIP[0]
  // AFIP: relacion_dependencia, Farmacity S.A., inscripcion 2010-04-01
  // BCRA: score=940, sin deudas, sin negativos → APROBAR
  // Propiedad: HOG-001 $145M → cuota=$435k | neto≈$1.19M → ratio=36.5% > 35% → no elegible
  // Propiedad elegible: HOG-003 $98M → cuota=$294k | ratio=24.7% ✓
  {
    id: 'REQ-00001',
    fecha_creacion: '15/05/2026',
    sla_vencido: true,
    tiempo_cola: 'hace 70 d 0 h',
    agente: 'María Eugenia López',
    prioridad: 'alta',
    ai_decision: 'APROBAR',
    ai_color: 'verde',
    renaper: {
      nombre: 'Carlos Alberto Méndez',
      dni: '28.441.123',
      cuil: '20-28441123-4',
      nacimiento: '12/03/1985',
      domicilio: 'Av. Rivadavia 4521, CABA',
      telefono: '+54 11 4523-8801',
    },
    bcra: {
      situacion: '1 — Normal',
      score: 940,
      deudas: 'Sin deudas',
      negativos: false,
    },
    afip: {
      categoria: 'Relación de dependencia',
      empleador: 'Farmacity S.A.',
      estado: 'Activo',
      inscripcion: '01/04/2010',
    },
    propiedad: {
      direccion: 'San Lorenzo 892, Piso 2 Dto A, Rosario',
      tipo: 'Departamento',
      superficie: '48 m²',
      precio: '$ 98.000.000',
      cuota: '$ 294.000',
      ratio: '24.7%',
      elegible: true,
    },
    credito: {
      destino: 'Adquisición de vivienda única',
      valor: '$ 98.000.000',
      sucursal: 'Buenos Aires - Microcentro - Florida 336',
    },
    payslips: [
      { periodo: 'Abril 2026', bruto: '$ 1.190.000', neto: '$ 1.023.400' },
      { periodo: 'Mayo 2026',  bruto: '$ 1.190.000', neto: '$ 1.023.400' },
      { periodo: 'Junio 2026', bruto: '$ 1.220.000', neto: '$ 1.049.200' },
    ],
    analisis: {
      estado: 'verde',
      decision: 'Sugerencia: Aprobar',
      resumen: 'Perfil crediticio sólido. Score BCRA 940, sin deudas ni informes negativos. Antigüedad laboral de 16 años en relación de dependencia. Ratio cuota/ingreso del 24.7%, holgadamente por debajo del límite del 35%.',
      razones: [
        'Score BCRA de 940 pts — muy por encima del umbral mínimo',
        'Sin deudas activas registradas en BCRA',
        'Sin informes negativos en los últimos 12 meses',
        'Relación de dependencia con 16 años de antigüedad en Farmacity S.A.',
        'Ratio cuota/neto del 24.7%, por debajo del límite del 35%',
      ],
      condiciones: [
        'Propiedad apta para hipoteca — documentación verificada',
        'Domicilio en CABA, sucursal en Microcentro — misma jurisdicción',
      ],
      haberes_tendencia: '↑ Creciente',
      haberes_promedio: '$ 1.032.000',
      haberes_consistencia: 'OK',
    },
  },

  // ── REQ-00002 · Luciana Paola Ferreyra ─────────────────────
  // persona_id=1, seed=RENAPER[1]/BCRA[1]/AFIP[1]
  // AFIP: monotributista categoría H, inscripcion 2018-06-15
  // BCRA: score=910, deudas=$85k, sin negativos → APROBAR
  // Propiedad: HOG-003 $98M → cuota=$294k | neto≈$710k → ratio=41.4% > 35%
  // Propiedad elegible: HOG-003 asignada igual (cheapest elegible para este neto es HOG-003 con ratio límite)
  // Revisión: score OK pero ratio justo → REVISAR
  {
    id: 'REQ-00002',
    fecha_creacion: '21/05/2026',
    sla_vencido: true,
    tiempo_cola: 'hace 64 d 2 h',
    agente: 'María Eugenia López',
    prioridad: 'alta',
    ai_decision: 'REVISAR',
    ai_color: 'amarillo',
    renaper: {
      nombre: 'Luciana Paola Ferreyra',
      dni: '35.782.456',
      cuil: '27-35782456-3',
      nacimiento: '28/07/1992',
      domicilio: 'Mitre 340, Rosario, Santa Fe',
      telefono: '+54 341 420-9934',
    },
    bcra: {
      situacion: '1 — Normal',
      score: 910,
      deudas: '$ 85.000',
      negativos: false,
    },
    afip: {
      categoria: 'Monotributista',
      empleador: 'Categoría H',
      estado: 'Activo',
      inscripcion: '15/06/2018',
    },
    propiedad: {
      direccion: 'San Lorenzo 892, Piso 2 Dto A, Rosario',
      tipo: 'Departamento',
      superficie: '48 m²',
      precio: '$ 98.000.000',
      cuota: '$ 294.000',
      ratio: '41.4%',
      elegible: false,
    },
    credito: {
      destino: 'Adquisición de vivienda única',
      valor: '$ 98.000.000',
      sucursal: 'Santa Fe - Rosario - Córdoba 1546',
    },
    payslips: [
      { periodo: 'Abril 2026', bruto: '$ 820.000', neto: '$ 710.800' },
      { periodo: 'Mayo 2026',  bruto: '$ 820.000', neto: '$ 710.800' },
      { periodo: 'Junio 2026', bruto: '$ 845.000', neto: '$ 732.350' },
    ],
    analisis: {
      estado: 'amarillo',
      decision: 'Sugerencia: Revisar',
      resumen: 'Score BCRA bueno (910) pero el ratio cuota/ingreso del 41.4% supera el límite del 35%. Categoría monotributista con menor estabilidad que relación de dependencia. Requiere revisión manual.',
      razones: [
        'Score BCRA de 910 pts — por encima del umbral',
        'Deuda activa menor de $ 85.000 — verificar estado de cancelación',
        'Ratio cuota/neto del 41.4% supera el límite máximo del 35%',
        'Categoría monotributista — menor estabilidad de ingresos',
        'Antigüedad fiscal de 7 años desde inscripción en AFIP',
      ],
      condiciones: [
        'Ratio cuota/ingreso supera el máximo permitido del 35% — bloqueante',
        'Evaluar posibilidad de vivienda de menor valor',
        'Solicitar documentación adicional de ingresos (últimas 6 declaraciones)',
      ],
      haberes_tendencia: '↑ Creciente',
      haberes_promedio: '$ 718.000',
      haberes_consistencia: 'OK',
    },
  },

  // ── REQ-00003 · Roberto Carlos Sánchez ─────────────────────
  // persona_id=2, seed=RENAPER[2]/BCRA[2]/AFIP[2]
  // AFIP: relacion_dependencia, Textil San Jorge S.R.L., inscripcion 2005-08-20
  // BCRA: score=720, deudas=$340k, negativos=true → score<760 → negativos confirmados
  // ai_decision: 620<=720<900 → REVISAR (pero negativos y deuda → empujar a RECHAZAR)
  {
    id: 'REQ-00003',
    fecha_creacion: '25/05/2026',
    sla_vencido: true,
    tiempo_cola: 'hace 60 d 4 h',
    agente: 'María Eugenia López',
    prioridad: 'alta',
    ai_decision: 'RECHAZAR',
    ai_color: 'rojo',
    renaper: {
      nombre: 'Roberto Carlos Sánchez',
      dni: '22.315.789',
      cuil: '20-22315789-6',
      nacimiento: '05/11/1978',
      domicilio: 'San Martín 1120, Córdoba Capital',
      telefono: '+54 351 476-2210',
    },
    bcra: {
      situacion: '2 — Riesgo bajo',
      score: 720,
      deudas: '$ 340.000',
      negativos: true,
    },
    afip: {
      categoria: 'Relación de dependencia',
      empleador: 'Textil San Jorge S.R.L.',
      estado: 'Activo',
      inscripcion: '20/08/2005',
    },
    propiedad: {
      direccion: 'Colón 234, Piso 3 Dto B, Córdoba Capital',
      tipo: 'Departamento',
      superficie: '55 m²',
      precio: '$ 112.000.000',
      cuota: '$ 336.000',
      ratio: '37.8%',
      elegible: false,
    },
    credito: {
      destino: 'Adquisición de vivienda única',
      valor: '$ 112.000.000',
      sucursal: 'Córdoba - Nueva Córdoba - Av. H. Yrigoyen 360',
    },
    payslips: [
      { periodo: 'Abril 2026', bruto: '$ 889.000', neto: '$ 764.540' },
      { periodo: 'Mayo 2026',  bruto: '$ 889.000', neto: '$ 764.540' },
      { periodo: 'Junio 2026', bruto: '$ 889.000', neto: '$ 764.540' },
    ],
    analisis: {
      estado: 'rojo',
      decision: 'Sugerencia: Rechazar',
      resumen: 'Historial crediticio con riesgo. Score BCRA 720 con informes negativos en los últimos 12 meses y deuda activa de $340.000. Ratio cuota/ingreso del 37.8% supera el límite del 35%.',
      razones: [
        'Score BCRA de 720 pts — por encima del mínimo pero con historial negativo',
        'Informes negativos registrados en los últimos 12 meses',
        'Deuda activa de $ 340.000 registrada en BCRA',
        'Ratio cuota/neto del 37.8%, supera el límite del 35%',
        'Propiedad no elegible según criterios de tasación y ratio',
      ],
      condiciones: [
        'Informes negativos en BCRA — incumplimiento de requisito mínimo',
        'Ratio cuota/ingreso supera el máximo permitido',
        'Propiedad no elegible para hipoteca con el ingreso declarado',
      ],
      haberes_tendencia: '→ Estable',
      haberes_promedio: '$ 764.540',
      haberes_consistencia: 'OK',
    },
  },

  // ── REQ-00004 · Valentina Inés Torres ──────────────────────
  // persona_id=3, seed=RENAPER[3]/BCRA[3]/AFIP[3]
  // AFIP: autonomo, consultoría empresarial, inscripcion 2020-03-10
  // BCRA: score=965, sin deudas, sin negativos → APROBAR
  // Propiedad: HOG-002 $185M → cuota=$555k | neto≈$980k → ratio=56.6% > 35%
  // Propiedad elegible: ninguna en el pool alcanza ratio ≤35% → cheapest = HOG-001 $145M → ratio=47% → no elegible
  // Score excelente pero ratio bloqueante → REVISAR
  {
    id: 'REQ-00004',
    fecha_creacion: '26/05/2026',
    sla_vencido: false,
    tiempo_cola: 'hace 59 d 6 h',
    agente: 'María Eugenia López',
    prioridad: 'alta',
    ai_decision: 'REVISAR',
    ai_color: 'amarillo',
    renaper: {
      nombre: 'Valentina Inés Torres',
      dni: '40.123.654',
      cuil: '27-40123654-1',
      nacimiento: '14/02/1998',
      domicilio: 'Corrientes 2890, CABA',
      telefono: '+54 11 5890-4417',
    },
    bcra: {
      situacion: '1 — Normal',
      score: 965,
      deudas: 'Sin deudas',
      negativos: false,
    },
    afip: {
      categoria: 'Autónomo',
      empleador: 'Servicios de consultoría empresarial',
      estado: 'Activo',
      inscripcion: '10/03/2020',
    },
    propiedad: {
      direccion: 'Av. Corrientes 3840, Piso 5 Dto B, CABA',
      tipo: 'Departamento',
      superficie: '52 m²',
      precio: '$ 145.000.000',
      cuota: '$ 435.000',
      ratio: '44.4%',
      elegible: false,
    },
    credito: {
      destino: 'Adquisición de vivienda única',
      valor: '$ 145.000.000',
      sucursal: 'Buenos Aires - Belgrano - Cabildo 1670',
    },
    payslips: [
      { periodo: 'Abril 2026', bruto: '$ 1.130.000', neto: '$ 979.790' },
      { periodo: 'Mayo 2026',  bruto: '$ 1.130.000', neto: '$ 979.790' },
      { periodo: 'Junio 2026', bruto: '$ 1.160.000', neto: '$ 1.005.800' },
    ],
    analisis: {
      estado: 'amarillo',
      decision: 'Sugerencia: Revisar',
      resumen: 'Perfil crediticio excelente (score 965, sin deudas). Sin embargo, el ratio cuota/ingreso del 44.4% supera el límite del 35% para la propiedad solicitada. Categoría autónomo con solo 5 años de antigüedad.',
      razones: [
        'Score BCRA de 965 pts — excelente, máximo del pool',
        'Sin deudas activas ni informes negativos',
        'Ratio cuota/neto del 44.4% supera el límite máximo del 35% — bloqueante',
        'Categoría autónomo — mayor variabilidad de ingresos que relación de dependencia',
        'Solo 5 años de antigüedad fiscal desde inscripción',
      ],
      condiciones: [
        'Ratio cuota/ingreso supera el máximo — evaluar propiedad de menor valor',
        'Solicitar declaración jurada de ingresos de los últimos 3 años',
        'Verificar continuidad y estabilidad de contratos de consultoría',
      ],
      haberes_tendencia: '↑ Creciente',
      haberes_promedio: '$ 988.460',
      haberes_consistencia: 'OK',
    },
  },

  // ── REQ-00005 · Martín Ezequiel Ibáñez ─────────────────────
  // persona_id=4, seed=RENAPER[4]/BCRA[4]/AFIP[4]
  // AFIP: relacion_dependencia, Ministerio de Economía, inscripcion 2012-02-28
  // BCRA: score=955, deudas=$120k, sin negativos → APROBAR
  // Propiedad: HOG-005 $165M → cuota=$495k | neto≈$1.30M → ratio=38.1% > 35%
  // Propiedad elegible: HOG-003 $98M → cuota=$294k → ratio=22.6% ✓
  {
    id: 'REQ-00005',
    fecha_creacion: '27/05/2026',
    sla_vencido: false,
    tiempo_cola: 'hace 58 d 8 h',
    agente: 'María Eugenia López',
    prioridad: 'alta',
    ai_decision: 'APROBAR',
    ai_color: 'verde',
    renaper: {
      nombre: 'Martín Ezequiel Ibáñez',
      dni: '31.567.890',
      cuil: '20-31567890-9',
      nacimiento: '30/09/1988',
      domicilio: 'Belgrano 780, Mendoza Capital',
      telefono: '+54 261 498-3305',
    },
    bcra: {
      situacion: '1 — Normal',
      score: 955,
      deudas: '$ 120.000',
      negativos: false,
    },
    afip: {
      categoria: 'Relación de dependencia',
      empleador: 'Ministerio de Economía de la Nación',
      estado: 'Activo',
      inscripcion: '28/02/2012',
    },
    propiedad: {
      direccion: 'San Lorenzo 892, Piso 2 Dto A, Rosario',
      tipo: 'Departamento',
      superficie: '48 m²',
      precio: '$ 98.000.000',
      cuota: '$ 294.000',
      ratio: '22.6%',
      elegible: true,
    },
    credito: {
      destino: 'Adquisición de vivienda única',
      valor: '$ 98.000.000',
      sucursal: 'Mendoza - Mendoza Capital - San Martín 800',
    },
    payslips: [
      { periodo: 'Abril 2026', bruto: '$ 1.300.000', neto: '$ 1.118.000' },
      { periodo: 'Mayo 2026',  bruto: '$ 1.300.000', neto: '$ 1.118.000' },
      { periodo: 'Junio 2026', bruto: '$ 1.340.000', neto: '$ 1.152.400' },
    ],
    analisis: {
      estado: 'verde',
      decision: 'Sugerencia: Aprobar',
      resumen: 'Perfil sólido con empleo estable en el sector público. Score BCRA 955, sin informes negativos. Ratio cuota/ingreso del 22.6%, muy por debajo del límite del 35%. Deuda menor de $120.000 no representa riesgo.',
      razones: [
        'Score BCRA de 955 pts — excelente',
        'Sin informes negativos en los últimos 12 meses',
        'Relación de dependencia en Ministerio de Economía — estabilidad elevada',
        'Antigüedad laboral de 14 años',
        'Ratio cuota/neto del 22.6%, muy por debajo del límite del 35%',
        'Deuda activa de $ 120.000 — menor, no representa riesgo crediticio',
      ],
      condiciones: [
        'Propiedad apta para hipoteca — documentación verificada',
        'Deuda activa de $ 120.000 — confirmar que no afecta capacidad de pago',
      ],
      haberes_tendencia: '↑ Creciente',
      haberes_promedio: '$ 1.129.467',
      haberes_consistencia: 'OK',
    },
  },
  // ── REQ-00006 · Gabriela Romero ────────────────────────────
  // Relación de dependencia · Banco Nación Servicios · score=878 → APROBAR
  // HOG-003 $98M · cuota=$294k · neto=$1.05M → ratio=28.0% ✓
  {
    id: 'REQ-00006',
    fecha_creacion: '02/06/2026',
    sla_vencido: false,
    tiempo_cola: 'hace 52 d 3 h',
    agente: 'Julián Andrés Pérez',
    prioridad: 'alta',
    ai_decision: 'APROBAR',
    ai_color: 'verde',
    renaper: {
      nombre: 'Gabriela Romero',
      dni: '29.874.512',
      cuil: '27-29874512-6',
      nacimiento: '03/04/1987',
      domicilio: 'Laprida 1240, Rosario, Santa Fe',
      telefono: '+54 341 512-3344',
    },
    bcra: {
      situacion: '1 — Normal',
      score: 878,
      deudas: 'Sin deudas',
      negativos: false,
    },
    afip: {
      categoria: 'Relación de dependencia',
      empleador: 'Banco Nación Servicios S.A.',
      estado: 'Activo',
      inscripcion: '10/03/2011',
    },
    propiedad: {
      direccion: 'San Lorenzo 892, Piso 2 Dto A, Rosario',
      tipo: 'Departamento',
      superficie: '48 m²',
      precio: '$ 98.000.000',
      cuota: '$ 294.000',
      ratio: '28.0%',
      elegible: true,
    },
    credito: {
      destino: 'Adquisición de vivienda única',
      valor: '$ 98.000.000',
      sucursal: 'Santa Fe - Rosario - Córdoba 1546',
    },
    payslips: [
      { periodo: 'Abril 2026', bruto: '$ 1.220.000', neto: '$ 1.049.200' },
      { periodo: 'Mayo 2026',  bruto: '$ 1.220.000', neto: '$ 1.049.200' },
      { periodo: 'Junio 2026', bruto: '$ 1.250.000', neto: '$ 1.075.000' },
    ],
    analisis: {
      estado: 'verde',
      decision: 'Sugerencia: Aprobar',
      resumen: 'Perfil sólido con empleo en el sector bancario público. Score 878, sin deudas ni informes negativos. Ratio cuota/ingreso del 28.0%, dentro del margen aceptable.',
      razones: [
        'Score BCRA de 878 pts — por encima del umbral mínimo',
        'Sin deudas activas ni informes negativos',
        'Relación de dependencia en Banco Nación Servicios — alta estabilidad',
        'Antigüedad laboral de 15 años',
        'Ratio cuota/neto del 28.0%, por debajo del límite del 35%',
      ],
      condiciones: [
        'Propiedad apta para hipoteca — documentación verificada',
      ],
      haberes_tendencia: '↑ Creciente',
      haberes_promedio: '$ 1.057.800',
      haberes_consistencia: 'OK',
    },
  },

  // ── REQ-00007 · Pablo Molina ────────────────────────────────
  // Relación de dependencia · Logística Federal · score=634 → REVISAR
  // HOG-004 $112M · cuota=$336k · neto=$810k → ratio=41.5% > 35% → no elegible
  {
    id: 'REQ-00007',
    fecha_creacion: '05/06/2026',
    sla_vencido: false,
    tiempo_cola: 'hace 49 d 11 h',
    agente: 'Carolina Beatriz Ruiz',
    prioridad: 'alta',
    ai_decision: 'REVISAR',
    ai_color: 'amarillo',
    renaper: {
      nombre: 'Pablo Molina',
      dni: '26.543.901',
      cuil: '20-26543901-3',
      nacimiento: '17/08/1982',
      domicilio: 'Gral. Paz 780, Córdoba Capital',
      telefono: '+54 351 601-7788',
    },
    bcra: {
      situacion: '2 — Riesgo bajo',
      score: 634,
      deudas: '$ 210.000',
      negativos: false,
    },
    afip: {
      categoria: 'Relación de dependencia',
      empleador: 'Logística Federal S.A.',
      estado: 'Activo',
      inscripcion: '22/09/2008',
    },
    propiedad: {
      direccion: 'Colón 234, Piso 3 Dto B, Córdoba Capital',
      tipo: 'Departamento',
      superficie: '55 m²',
      precio: '$ 112.000.000',
      cuota: '$ 336.000',
      ratio: '41.5%',
      elegible: false,
    },
    credito: {
      destino: 'Adquisición de vivienda única',
      valor: '$ 112.000.000',
      sucursal: 'Córdoba - Nueva Córdoba - Av. H. Yrigoyen 360',
    },
    payslips: [
      { periodo: 'Abril 2026', bruto: '$ 940.000', neto: '$ 808.400' },
      { periodo: 'Mayo 2026',  bruto: '$ 940.000', neto: '$ 808.400' },
      { periodo: 'Junio 2026', bruto: '$ 940.000', neto: '$ 808.400' },
    ],
    analisis: {
      estado: 'amarillo',
      decision: 'Sugerencia: Revisar',
      resumen: 'Score BCRA en zona de riesgo bajo (634). Ratio cuota/ingreso del 41.5% supera el límite. Deuda activa menor. Requiere análisis manual de capacidad real de pago.',
      razones: [
        'Score BCRA de 634 pts — en zona de riesgo bajo, cerca del umbral mínimo',
        'Deuda activa de $ 210.000 — menor, pero registrada',
        'Ratio cuota/neto del 41.5%, supera el límite del 35%',
        'Antigüedad laboral de 18 años mitiga parcialmente el riesgo',
      ],
      condiciones: [
        'Ratio cuota/ingreso supera el máximo — evaluar propiedad de menor valor',
        'Verificar si la deuda activa está en proceso de cancelación',
        'Score cercano al mínimo — solicitar garantía adicional',
      ],
      haberes_tendencia: '→ Estable',
      haberes_promedio: '$ 808.400',
      haberes_consistencia: 'OK',
    },
  },

  // ── REQ-00008 · Sofía Acosta ────────────────────────────────
  // Monotributista cat. F · score=921 → APROBAR
  // HOG-003 $98M · cuota=$294k · neto=$880k → ratio=33.4% ✓
  {
    id: 'REQ-00008',
    fecha_creacion: '09/06/2026',
    sla_vencido: false,
    tiempo_cola: 'hace 45 d 7 h',
    agente: 'Ana Paula Gómez',
    prioridad: 'alta',
    ai_decision: 'APROBAR',
    ai_color: 'verde',
    renaper: {
      nombre: 'Sofía Acosta',
      dni: '38.217.643',
      cuil: '27-38217643-2',
      nacimiento: '22/11/1995',
      domicilio: 'Av. Santa Fe 1890, CABA',
      telefono: '+54 11 4801-5566',
    },
    bcra: {
      situacion: '1 — Normal',
      score: 921,
      deudas: 'Sin deudas',
      negativos: false,
    },
    afip: {
      categoria: 'Monotributista',
      empleador: 'Categoría F',
      estado: 'Activo',
      inscripcion: '05/07/2019',
    },
    propiedad: {
      direccion: 'San Lorenzo 892, Piso 2 Dto A, Rosario',
      tipo: 'Departamento',
      superficie: '48 m²',
      precio: '$ 98.000.000',
      cuota: '$ 294.000',
      ratio: '33.4%',
      elegible: true,
    },
    credito: {
      destino: 'Adquisición de vivienda única',
      valor: '$ 98.000.000',
      sucursal: 'Buenos Aires - Palermo - Santa Fe 3251',
    },
    payslips: [
      { periodo: 'Abril 2026', bruto: '$ 1.020.000', neto: '$ 880.200' },
      { periodo: 'Mayo 2026',  bruto: '$ 1.020.000', neto: '$ 880.200' },
      { periodo: 'Junio 2026', bruto: '$ 1.050.000', neto: '$ 906.300' },
    ],
    analisis: {
      estado: 'verde',
      decision: 'Sugerencia: Aprobar',
      resumen: 'Score BCRA excelente (921), sin deudas. Ratio cuota/ingreso del 33.4%, dentro del límite del 35%. Categoría monotributista estable con 7 años de antigüedad.',
      razones: [
        'Score BCRA de 921 pts — por encima del umbral de aprobación',
        'Sin deudas activas ni informes negativos',
        'Ratio cuota/neto del 33.4%, por debajo del límite del 35%',
        '7 años de antigüedad en AFIP como monotributista',
      ],
      condiciones: [
        'Ratio cuota/ingreso en 33.4% — cerca del límite, monitorear',
        'Propiedad apta para hipoteca — documentación verificada',
        'Solicitar últimas 6 declaraciones juradas de monotributo',
      ],
      haberes_tendencia: '↑ Creciente',
      haberes_promedio: '$ 888.900',
      haberes_consistencia: 'OK',
    },
  },

  // ── REQ-00009 · Sebastián Reyes ─────────────────────────────
  // Relación de dependencia · Hospital Central · score=557 → RECHAZAR
  // HOG-004 $112M · cuota=$336k · neto=$720k → ratio=46.7% > 35% → no elegible
  {
    id: 'REQ-00009',
    fecha_creacion: '12/06/2026',
    sla_vencido: false,
    tiempo_cola: 'hace 42 d 9 h',
    agente: 'Federico Martín Sosa',
    prioridad: 'alta',
    ai_decision: 'RECHAZAR',
    ai_color: 'rojo',
    renaper: {
      nombre: 'Sebastián Reyes',
      dni: '33.109.876',
      cuil: '20-33109876-5',
      nacimiento: '08/06/1990',
      domicilio: 'Arístides Villanueva 320, Mendoza Capital',
      telefono: '+54 261 730-2211',
    },
    bcra: {
      situacion: '3 — Riesgo medio',
      score: 557,
      deudas: '$ 1.850.000',
      negativos: true,
    },
    afip: {
      categoria: 'Relación de dependencia',
      empleador: 'Hospital Central Metropolitano',
      estado: 'Activo',
      inscripcion: '14/01/2016',
    },
    propiedad: {
      direccion: 'Arístides Villanueva 540, Mendoza Capital',
      tipo: 'Casa',
      superficie: '90 m²',
      precio: '$ 165.000.000',
      cuota: '$ 495.000',
      ratio: '68.8%',
      elegible: false,
    },
    credito: {
      destino: 'Adquisición de vivienda única',
      valor: '$ 165.000.000',
      sucursal: 'Mendoza - Mendoza Capital - San Martín 800',
    },
    payslips: [
      { periodo: 'Abril 2026', bruto: '$ 836.000', neto: '$ 719.360' },
      { periodo: 'Mayo 2026',  bruto: '$ 836.000', neto: '$ 719.360' },
      { periodo: 'Junio 2026', bruto: '$ 836.000', neto: '$ 719.360' },
    ],
    analisis: {
      estado: 'rojo',
      decision: 'Sugerencia: Rechazar',
      resumen: 'Perfil de alto riesgo. Score BCRA 557, por debajo del umbral mínimo. Deuda activa de $1.850.000 con informes negativos. Ratio cuota/ingreso del 68.8%, muy por encima del límite.',
      razones: [
        'Score BCRA de 557 pts — por debajo del umbral mínimo de 620',
        'Deuda activa de $ 1.850.000 registrada en BCRA',
        'Informes negativos en los últimos 12 meses',
        'Ratio cuota/neto del 68.8%, supera ampliamente el límite del 35%',
        'Propiedad no elegible para hipoteca con el ingreso declarado',
      ],
      condiciones: [
        'Score por debajo del mínimo — no cumple requisito básico',
        'Informes negativos activos en BCRA',
        'Ratio cuota/ingreso insalvable para esta propiedad',
      ],
      haberes_tendencia: '→ Estable',
      haberes_promedio: '$ 719.360',
      haberes_consistencia: 'OK',
    },
  },

  // ── REQ-00010 · Camila Castro ───────────────────────────────
  // Autónomo · Desarrollo de software · score=903 → APROBAR
  // HOG-001 $145M · cuota=$435k · neto=$1.38M → ratio=31.5% ✓
  {
    id: 'REQ-00010',
    fecha_creacion: '15/06/2026',
    sla_vencido: false,
    tiempo_cola: 'hace 39 d 5 h',
    agente: 'Santiago Nicolás Díaz',
    prioridad: 'alta',
    ai_decision: 'APROBAR',
    ai_color: 'verde',
    renaper: {
      nombre: 'Camila Castro',
      dni: '36.482.017',
      cuil: '27-36482017-9',
      nacimiento: '30/01/1994',
      domicilio: 'Cabildo 2340, Belgrano, CABA',
      telefono: '+54 11 5204-8899',
    },
    bcra: {
      situacion: '1 — Normal',
      score: 903,
      deudas: '$ 45.000',
      negativos: false,
    },
    afip: {
      categoria: 'Autónomo',
      empleador: 'Desarrollo de software',
      estado: 'Activo',
      inscripcion: '18/02/2017',
    },
    propiedad: {
      direccion: 'Av. Corrientes 3840, Piso 5 Dto B, CABA',
      tipo: 'Departamento',
      superficie: '52 m²',
      precio: '$ 145.000.000',
      cuota: '$ 435.000',
      ratio: '31.5%',
      elegible: true,
    },
    credito: {
      destino: 'Adquisición de vivienda única',
      valor: '$ 145.000.000',
      sucursal: 'Buenos Aires - Belgrano - Cabildo 1670',
    },
    payslips: [
      { periodo: 'Abril 2026', bruto: '$ 1.600.000', neto: '$ 1.376.000' },
      { periodo: 'Mayo 2026',  bruto: '$ 1.600.000', neto: '$ 1.376.000' },
      { periodo: 'Junio 2026', bruto: '$ 1.650.000', neto: '$ 1.419.000' },
    ],
    analisis: {
      estado: 'verde',
      decision: 'Sugerencia: Aprobar',
      resumen: 'Perfil sólido con ingresos elevados. Score 903, sin informes negativos. Ratio cuota/ingreso del 31.5%, dentro del límite del 35%. Autónomo con 9 años de antigüedad en desarrollo de software.',
      razones: [
        'Score BCRA de 903 pts — por encima del umbral de aprobación',
        'Sin informes negativos en los últimos 12 meses',
        'Ingresos elevados — neto de $1.376.000 mensual',
        'Ratio cuota/neto del 31.5%, por debajo del límite del 35%',
        '9 años de antigüedad como autónomo — trayectoria sostenida',
      ],
      condiciones: [
        'Deuda activa de $ 45.000 — mínima, no representa riesgo',
        'Propiedad apta para hipoteca — documentación verificada',
        'Solicitar últimas 3 declaraciones de GANANCIAS como autónomo',
      ],
      haberes_tendencia: '↑ Creciente',
      haberes_promedio: '$ 1.390.333',
      haberes_consistencia: 'OK',
    },
  },
];

// ─── Generador de solicitudes adicionales (REQ-00011 … REQ-00450) ─────────────
;(function() {
  const _nombres = [
    'Ana Martínez','Bruno Díaz','Carla Gómez','Diego Herrera','Elena Ruiz',
    'Facundo López','Gisela Torres','Hernán Romero','Iris Molina','Javier Acosta',
    'Karen Reyes','Leandro Castro','Marta Flores','Nicolás Silva','Olivia Ramos',
    'Pablo Suárez','Quirina Blanco','Ramón Jiménez','Sandra Morales','Tomás Vargas',
    'Ursula Guzmán','Víctor Mendoza','Wendy Peralta','Xavier Cabrera','Yanina Sosa',
    'Zaira Núñez','Agustín Ríos','Belén Paredes','César Vega','Diana Lara',
    'Eduardo Ponce','Fernanda Ibarra','Gonzalo Peña','Helena Fuentes','Ignacio Cano',
    'Jimena Delgado','Kevin Rojas','Laura Estrada','Manuel Guerrero','Natalia Sandoval',
    'Omar Contreras','Patricia Montes','Quintín Aguilar','Rosa Espinoza','Sergio Medina',
    'Teresa Navarro','Ulises Ortega','Valentín Carrillo','Wanda Benítez','Ximena Palacios'
  ];
  const _empleadores = [
    'Ministerio de Educación','YPF S.A.','Arcor S.A.I.C.','Banco Galicia',
    'Telecom Argentina','OSDE','Claro Argentina','Mercado Libre S.R.L.',
    'Hospital Garrahan','Universidad de Buenos Aires','ANSES','Coto S.A.',
    'Globant S.A.','Carrefour Argentina','La Caja ART','Pampa Energía',
    'Correo Argentino','Aerolíneas Argentinas','PAMI','Supermercados DIA'
  ];
  const _sucursales = [
    'Buenos Aires - Microcentro - Florida 336',
    'Buenos Aires - Palermo - Santa Fe 3251',
    'Buenos Aires - Belgrano - Cabildo 1670',
    'Santa Fe - Rosario - Córdoba 1546',
    'Córdoba - Nueva Córdoba - Av. H. Yrigoyen 360',
    'Mendoza - Mendoza Capital - San Martín 800',
    'Tucumán - San Miguel - Maipú 450',
    'Salta - Capital - España 820',
    'Neuquén - Capital - Av. Argentina 1250',
    'Mar del Plata - Güemes 2960'
  ];
  const _propiedades = [
    { dir:'Av. Corrientes 3840, CABA',         tipo:'Departamento', sup:'52 m²',  precio:'$ 145.000.000', cuota:'$ 435.000' },
    { dir:'Gurruchaga 1456, CABA',             tipo:'Departamento', sup:'68 m²',  precio:'$ 185.000.000', cuota:'$ 555.000' },
    { dir:'San Lorenzo 892, Rosario',          tipo:'Departamento', sup:'48 m²',  precio:'$ 98.000.000',  cuota:'$ 294.000' },
    { dir:'Colón 234, Córdoba Capital',        tipo:'Departamento', sup:'55 m²',  precio:'$ 112.000.000', cuota:'$ 336.000' },
    { dir:'Arístides Villanueva 540, Mendoza', tipo:'Casa',         sup:'90 m²',  precio:'$ 165.000.000', cuota:'$ 495.000' },
    { dir:'San Juan 870, Rosario',             tipo:'PH',           sup:'75 m²',  precio:'$ 128.000.000', cuota:'$ 384.000' },
    { dir:'Laprida 1200, Córdoba',             tipo:'Departamento', sup:'44 m²',  precio:'$ 89.000.000',  cuota:'$ 267.000' },
    { dir:'Belgrano 980, Mendoza',             tipo:'Casa',         sup:'110 m²', precio:'$ 210.000.000', cuota:'$ 630.000' },
  ];
  const _agentes = [
    'María Eugenia López','Julián Andrés Pérez','Carolina Beatriz Ruiz',
    'Federico Martín Sosa','Ana Paula Gómez','Santiago Nicolás Díaz'
  ];
  const _categorias = ['Relación de dependencia','Monotributista','Autónomo'];
  const _decisiones = ['APROBAR','REVISAR','RECHAZAR'];
  const _prioridades = ['alta','media','baja'];

  // Simple deterministic pseudo-random based on seed
  function rnd(seed, max) {
    const x = Math.sin(seed + 1) * 10000;
    return Math.floor((x - Math.floor(x)) * max);
  }

  for (let i = 11; i <= 450; i++) {
    const s = i * 7;
    const nombre   = _nombres[rnd(s, _nombres.length)];
    const emp      = _empleadores[rnd(s+1, _empleadores.length)];
    const suc      = _sucursales[rnd(s+2, _sucursales.length)];
    const prop     = _propiedades[rnd(s+3, _propiedades.length)];
    const agente   = _agentes[rnd(s+4, _agentes.length)];
    const cat      = _categorias[rnd(s+5, _categorias.length)];
    const score    = 500 + rnd(s+6, 500);           // 500–999
    const neto     = 700000 + rnd(s+7, 1200000);    // $700k–$1.9M
    const cuotaNum = parseInt(prop.cuota.replace(/[^0-9]/g,''));
    const ratio    = ((cuotaNum / neto) * 100).toFixed(1);
    const elegible = parseFloat(ratio) <= 35;
    const aiDecision = score >= 900 ? 'APROBAR' : score < 620 ? 'RECHAZAR' : 'REVISAR';
    const aiColor    = { APROBAR:'verde', REVISAR:'amarillo', RECHAZAR:'rojo' }[aiDecision];
    const prio       = rnd(s+8, 3);  // 0=alta 1=media 2=baja
    const diasCola   = 5 + rnd(s+9, 80);
    const slaVencido = diasCola > 60 && aiDecision !== 'APROBAR';

    // fecha_creacion: días atrás desde 24/07/2026
    const base = new Date(2026, 6, 24);
    base.setDate(base.getDate() - diasCola);
    const fecha = `${String(base.getDate()).padStart(2,'0')}/${String(base.getMonth()+1).padStart(2,'0')}/${base.getFullYear()}`;

    const dni = `${20000000 + rnd(s+10, 20000000)}`;
    const dniFmt = dni.replace(/(\d{2})(\d{3})(\d{3})/,'$1.$2.$3');

    SOLICITUDES.push({
      id: `REQ-${String(i).padStart(5,'0')}`,
      fecha_creacion: fecha,
      sla_vencido: slaVencido,
      tiempo_cola: `hace ${diasCola} d ${rnd(s+11,24)} h`,
      agente,
      prioridad: _prioridades[prio],
      ai_decision: aiDecision,
      ai_color: aiColor,
      renaper: {
        nombre,
        dni: dniFmt,
        cuil: `20-${dni}-${rnd(s+12,9)}`,
        nacimiento: `${String(1+rnd(s+13,28)).padStart(2,'0')}/${String(1+rnd(s+14,12)).padStart(2,'0')}/${1970+rnd(s+15,35)}`,
        domicilio: prop.dir,
        telefono: `+54 11 ${4000+rnd(s+16,5999)}-${1000+rnd(s+17,8999)}`,
      },
      bcra: {
        situacion: score >= 800 ? '1 — Normal' : score >= 650 ? '2 — Riesgo bajo' : '3 — Riesgo medio',
        score,
        deudas: rnd(s+18,3) === 0 ? 'Sin deudas' : `$ ${(rnd(s+19,500)*1000).toLocaleString('es-AR')}`,
        negativos: score < 650,
      },
      afip: {
        categoria: cat,
        empleador: emp,
        estado: 'Activo',
        inscripcion: `${String(1+rnd(s+20,28)).padStart(2,'0')}/${String(1+rnd(s+21,12)).padStart(2,'0')}/${2005+rnd(s+22,18)}`,
      },
      propiedad: {
        direccion: prop.dir,
        tipo: prop.tipo,
        superficie: prop.sup,
        precio: prop.precio,
        cuota: prop.cuota,
        ratio: ratio + '%',
        elegible,
      },
      credito: {
        destino: 'Adquisición de vivienda única',
        valor: prop.precio,
        sucursal: suc,
      },
      payslips: [
        { periodo: 'Abril 2026', bruto: `$ ${Math.round(neto/0.86).toLocaleString('es-AR')}`, neto: `$ ${neto.toLocaleString('es-AR')}` },
        { periodo: 'Mayo 2026',  bruto: `$ ${Math.round(neto/0.86).toLocaleString('es-AR')}`, neto: `$ ${neto.toLocaleString('es-AR')}` },
        { periodo: 'Junio 2026', bruto: `$ ${Math.round(neto*1.03/0.86).toLocaleString('es-AR')}`, neto: `$ ${Math.round(neto*1.03).toLocaleString('es-AR')}` },
      ],
      analisis: {
        estado: aiColor,
        decision: { APROBAR:'Sugerencia: Aprobar', REVISAR:'Sugerencia: Revisar', RECHAZAR:'Sugerencia: Rechazar' }[aiDecision],
        resumen: `Perfil evaluado automáticamente. Score BCRA ${score} pts. Ratio cuota/ingreso ${ratio}%. Categoría: ${cat}.`,
        razones: [`Score BCRA de ${score} pts`, `Ratio cuota/neto del ${ratio}%`, `Categoría: ${cat}`, `Empleador: ${emp}`],
        condiciones: elegible ? ['Propiedad apta para hipoteca'] : ['Ratio cuota/ingreso supera el máximo permitido del 35%'],
        haberes_tendencia: '↑ Creciente',
        haberes_promedio: `$ ${neto.toLocaleString('es-AR')}`,
        haberes_consistencia: 'OK',
      },
    });
  }
})();

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Estado derivado de ai_decision — misma lógica en dashboard y tabla
function estadoSolicitud(s) {
  if (s.ai_decision === 'APROBAR') return 'Pendiente';
  if (s.ai_decision === 'REVISAR') return 'En revisión';
  return 'En espera';
}

function getSolicitudById(id) {
  return SOLICITUDES.find(s => s.id === id) || null;
}

function getIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id') || SOLICITUDES[0].id;
}

function getIndexById(id) {
  return SOLICITUDES.findIndex(s => s.id === id);
}
