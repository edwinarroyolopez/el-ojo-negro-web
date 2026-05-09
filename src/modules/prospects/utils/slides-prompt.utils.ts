import type { Prospect, ProspectDiagnosis } from '../types';

function sanitizeInternalNotes(internalNotes?: string) {
  if (!internalNotes?.trim()) return undefined;

  const lowered = internalNotes.toLowerCase();
  const blockedTokens = [
    'token',
    'secret',
    'password',
    'credencial',
    'private',
    'interno confidencial',
  ];

  if (blockedTokens.some((token) => lowered.includes(token))) {
    return undefined;
  }

  return internalNotes.length > 900
    ? `${internalNotes.slice(0, 900)}...`
    : internalNotes;
}

export function serializeDiagnosisForPrompt(diagnosis: ProspectDiagnosis, publicUrl?: string | null) {
  return {
    title: diagnosis.title,
    summary: diagnosis.summary,
    markdown: diagnosis.markdown,
    structured: diagnosis.structured,
    scores: diagnosis.scores,
    publicNotes: diagnosis.publicNotes,
    status: diagnosis.status,
    slug: diagnosis.slug,
    visibility: diagnosis.visibility,
    publicUrl: publicUrl || null,
  };
}

export function serializeProspectForPrompt(prospect: Prospect) {
  return {
    id: prospect.id,
    name: prospect.name,
    category: prospect.category,
    city: prospect.city,
    country: prospect.country,
    phones: prospect.phones,
    website: prospect.website,
    instagram: prospect.instagram,
    facebook: prospect.facebook,
    address: prospect.address,
    sourceUrls: prospect.sourceUrls,
    evidenceNotes: prospect.evidenceNotes,
    internalNotes: sanitizeInternalNotes(prospect.internalNotes),
    rawDiscovery: prospect.rawDiscovery,
    normalizedCandidate: prospect.normalizedCandidate,
    providerIntelligence: prospect.providerIntelligence,
    importProjection: prospect.importProjection,
    scores: prospect.scores,
    signals: prospect.signals,
  };
}

export function buildSlidesResearchContext(prospect: Prospect, publicUrl?: string | null) {
  return [
    'Actúa como estratega senior de growth, UX, conversión y diseño de presentaciones para negocios premium en Colombia.',
    'También actúa como director creativo editorial y como consultor comercial obsesionado con claridad, percepción y deseo de avanzar.',
    '',
    'Voy a darte toda la información disponible de un prospecto y un diagnóstico ya generado. Tu tarea es investigar profundamente la marca y producir un entregable final de exactamente 4 slides listos para compartir con el prospecto.',
    'No quiero un resultado correcto o aceptable. Quiero un resultado extraordinariamente bueno, sobrio, preciso y persuasivo.',
    'La reacción ideal del prospecto al ver las slides debe ser: “Necesito trabajar contigo”.',
    'Eso no se logra con humo. Se logra con investigación real, criterio visual alto, copy elegante y una lectura que haga sentir claridad, oportunidad y dirección.',
    '',
    'Este material será compartido con el prospecto, por lo tanto:',
    '- no uses lenguaje agresivo,',
    '- no inventes métricas,',
    '- no hagas afirmaciones no verificadas,',
    '- si algo no se puede confirmar, trátalo como hipótesis o evita afirmarlo,',
    '- mantén un tono elegante, útil, claro y accionable.',
    '- no busques impresionar con exageración; impresiona con precisión, criterio y valor.',
    '',
    'Investiga profundamente usando prioritariamente las URLs y fuentes ya provistas:',
    '- website oficial',
    '- Instagram oficial',
    '- otras fuentes públicas visibles si están referenciadas',
    '- colores de marca',
    '- logo',
    '- identidad visual',
    '- tono de comunicación',
    '- propuesta visible',
    '- estilo fotográfico o estético',
    '- consistencia entre web, Instagram y otros activos',
    '- señales de claridad, confianza, conversión y experiencia mobile',
    '- percepción de nivel premium o no premium',
    '- qué parte de la experiencia transmite autoridad y qué parte introduce fricción',
    '- qué promesa comercial parece fuerte y cuál parece difusa',
    '',
    'Si encuentras identidad visual clara, úsala.',
    'Si no logras verificar logo o colores con certeza, aproxima con sobriedad sin inventar atributos falsos.',
    'Si la marca tiene una estética débil, no la humilles ni la contradigas: elévala con elegancia usando lo que sí es verificable.',
    '',
    'Datos del prospecto:',
    JSON.stringify(serializeProspectForPrompt(prospect), null, 2),
    '',
    'Diagnóstico base:',
    JSON.stringify(serializeDiagnosisForPrompt(prospect.diagnosis, publicUrl), null, 2),
  ].join('\n');
}

export function buildSlidesDeckStructure() {
  return [
    'Tu salida final debe ser un deck de exactamente 4 slides, no más y no menos.',
    'No entregues una lista de ideas sueltas.',
    'No entregues solo análisis.',
    'No entregues un documento largo.',
    'No entregues 5 slides.',
    'No entregues texto sin estructura visual.',
    'Genera el contenido final de 4 slides.',
    'Cada slide debe sentirse como una pieza final de alto nivel, no como borrador ni como outline operativo.',
    'La secuencia completa debe crear una progresión emocional y comercial: atención → confianza → oportunidad → siguiente paso.',
    '',
    'Estructura exacta de las 4 slides:',
    '',
    'Slide 1 — Portada + lectura ejecutiva',
    '- Nombre del prospecto',
    '- Título del diagnóstico',
    '- Subtítulo elegante',
    '- Resumen ejecutivo corto',
    '- Branding visual del prospecto',
    '- Firma sutil: Diagnóstico por El Ojo Negro',
    '- Debe abrir con presencia visual suficiente para que el prospecto sienta que esto fue pensado específicamente para su marca',
    '',
    'Slide 2 — Lo que ya está bien + lectura actual',
    '- Señales positivas observadas',
    '- Scores o lectura visual resumida',
    '- Qué transmite hoy la presencia digital',
    '- Dónde ya existe base valiosa',
    '- Mantener tono positivo y preciso',
    '- Debe hacer que el prospecto sienta: “Sí, entendieron mi marca y vieron algo real”',
    '',
    'Slide 3 — Oportunidades principales',
    '- 3 oportunidades visibles de mejora',
    '- Cada una con: observación, impacto posible, recomendación concreta',
    '- No usar lenguaje acusatorio',
    '- No afirmar pérdidas como hecho',
    '- Las oportunidades deben sentirse accionables y valiosas, no genéricas',
    '',
    'Slide 4 — Ruta recomendada + siguiente paso',
    '- Sistema mínimo recomendado',
    '- Ruta visual: Instagram/Google → Landing/Servicio → Confianza → WhatsApp → Agenda/Seguimiento',
    '- Resumen de Propuesta 2: Sistema mínimo de captación',
    '- Posible continuidad: Growth Partner mensual',
    '- CTA final sobrio: Si esto hace sentido, el siguiente paso es convertir este diagnóstico en una ruta clara de captación.',
    '- Debe cerrar con suficiente claridad y deseo como para que el prospecto quiera conversar',
  ].join('\n');
}

export function buildSlidesOutputInstructions() {
  return [
    'Requisitos visuales:',
    '- usar colores de la marca del prospecto como base',
    '- usar logo si es verificable desde fuentes públicas',
    '- usar una estética limpia, premium, sobria y editorial',
    '- evitar saturación',
    '- jerarquía impecable',
    '- máximo enfoque en claridad',
    '- diseño pensado para verse bien como slides compartibles',
    '- mantener consistencia visual entre las 4 slides',
    '- si la identidad de marca del prospecto es débil, usar una adaptación elegante sin traicionar su estética pública',
    '- no usar layouts genéricos de consultora barata ni recursos visuales vacíos',
    '- el deck debe verse inevitable, específico y hecho a medida para esta marca',
    '- priorizar composición, ritmo, contraste, espacio negativo y foco narrativo',
    '- si propones imágenes o texturas, deben reforzar percepción premium y no distraer del argumento',
    '',
    'Requisitos de lenguaje:',
    '- escribir en español',
    '- mantener tono consultivo y premium',
    '- evitar lenguaje agresivo',
    '- no decir “están perdiendo clientes” como hecho',
    '- no decir “tu negocio está fallando”',
    '- priorizar claridad comercial, confianza, conversión a WhatsApp, experiencia mobile y consistencia digital',
    '- usar lenguaje como: se observa, hay una oportunidad visible, podría mejorar, ruta más clara',
    '- si algo no es verificable, no inventarlo',
    '- evita exageración marketinera, clichés y promesas infladas',
    '- cada frase debe poder compartirse con el prospecto sin incomodidad ni sensación de ataque',
    '',
    'Formato final esperado:',
    '- si diseñas directamente, produce las 4 slides finales',
    '- si trabajas en modo textual, entrega para cada slide: título, copy final, estructura visual, elementos visuales sugeridos y notas de identidad visual aplicadas',
    '- en modo textual, no seas abstracto: especifica jerarquía, distribución, énfasis visual, tono de titulares y rol de cada elemento',
    '',
    'Barra de calidad obligatoria:',
    '- si el resultado parece plantilla, reházalo mentalmente antes de entregarlo',
    '- si el resultado podría servirle igual a cualquier otra clínica, reházalo',
    '- si el resultado no genera deseo de conversar, reházalo',
    '- quiero 4 slides que se sientan como un diagnóstico premium, compartible y comercialmente inevitable',
  ].join('\n');
}

export function buildSlidesGenerationPrompt(
  prospect: Prospect,
  options?: { publicUrl?: string | null },
) {
  const publicUrl = options?.publicUrl ?? null;

  return [
    buildSlidesResearchContext(prospect, publicUrl),
    '',
    buildSlidesDeckStructure(),
    '',
    buildSlidesOutputInstructions(),
  ].join('\n\n');
}
