import type { Prospect } from '../types';

function buildExpectedOutput(prospect: Prospect) {
  return JSON.stringify(
    {
      title: `Diagnóstico Express — ${prospect.name}`,
      slug: prospect.diagnosis.slug || 'slug-sugerido-del-negocio',
      visibility: 'UNLISTED',
      status: 'READY',
      summary:
        'Lectura ejecutiva breve, serena y orientada a la ruta de decisión, la confianza y la conversión del interés en conversación.',
      markdown:
        '# Lectura ejecutiva\nTexto...\n\n## Lo que ya esta bien\nTexto...\n\n## Oportunidades principales\nTexto...\n\n## Siguiente paso recomendado\nTexto...',
      publicNotes:
        'Observación externa basada en fuentes públicas disponibles, sin inventar métricas ni afirmar pérdidas comerciales.',
      scores: [
        { label: 'Claridad de oferta', value: 8.2 },
        { label: 'Confianza', value: 8.4 },
        { label: 'WhatsApp', value: 8.6 },
      ],
      structured: {
        sections: {
          executiveReading: [
            'La marca ya tiene una base reconocible, pero la oportunidad visible esta en ordenar mejor la ruta de decisión.',
          ],
          strengths: [
            'Ya existen señales publicas que ayudan a construir confianza y diferenciación.',
          ],
          opportunities: [
            'La distancia entre interés y contacto todavía podría reducirse con una ruta más clara desde mobile.',
          ],
          nextStep: [
            'El siguiente movimiento recomendado sería un sprint corto de claridad y conversión digital.',
          ],
        },
        opportunities: ['Oportunidad 1', 'Oportunidad 2', 'Oportunidad 3'],
        quickWin: 'Mejora rápida sugerida.',
        minimumSystem: 'Sistema mínimo recomendado.',
        whatsappUrl: 'https://wa.me/573001234567',
      },
    },
    null,
    2,
  );
}

function buildProspectContext(prospect: Prospect) {
  const primaryPhone = prospect.phones[0] || prospect.normalizedPrimaryPhone;
  const cues = [
    prospect.category ? `Categoría: ${prospect.category}` : null,
    prospect.city ? `Ciudad: ${prospect.city}` : null,
    prospect.website ? `Sitio web: ${prospect.website}` : null,
    prospect.instagram ? `Instagram: ${prospect.instagram}` : null,
    primaryPhone ? `Teléfono o WhatsApp visible: ${primaryPhone}` : null,
    prospect.address ? `Ubicación pública: ${prospect.address}` : null,
    prospect.sourceUrls.length ? `Fuentes públicas relevantes: ${prospect.sourceUrls.join(' | ')}` : null,
    prospect.evidenceNotes ? `Notas de evidencia manual: ${prospect.evidenceNotes}` : null,
  ].filter(Boolean);

  return cues.length > 0 ? cues.join(' | ') : 'Sin contexto resumido adicional.';
}

export function buildDiagnosisResearchPrompt(prospect: Prospect) {
  const payload = JSON.stringify(prospect, null, 2);
  const expectedOutput = buildExpectedOutput(prospect);
  const prospectContext = buildProspectContext(prospect);

  return [
    'Actúa como senior product engineer, estratega de conversión y editor de marca de El Ojo Negro.',
    'Tu trabajo no es describir si una marca existe. Tu trabajo es diagnosticar si su presencia ayuda a decidir.',
    'Frase rectora implícita: No diagnosticamos si una marca existe. Diagnosticamos si su presencia ayuda a decidir.',
    'Construye un diagnóstico público, sobrio y premium a partir de observación externa en fuentes públicas.',
    'Tu respuesta debe ser SOLO un JSON válido. No agregues explicaciones, markdown fences ni texto fuera del JSON.',
    '',
    'Objetivo editorial:',
    '- convertir un diagnóstico descriptivo en una lectura estratégica de percepción, confianza y ruta de decisión',
    '- hacer visible qué ya existe, qué no está suficientemente claro todavía y dónde podría estar apareciendo fricción comercial elegante',
    '- abrir de forma natural la necesidad de un sprint corto, concreto y accionable, sin sonar vendedor ni agresivo',
    '',
    'Reglas obligatorias:',
    '- no inventar métricas',
    '- no afirmar pérdidas comerciales',
    '- no prometer resultados',
    '- no usar frases agresivas como "están perdiendo clientes"',
    '- no sonar como auditoría técnica, checklist crudo ni plantilla genérica',
    '- usar solo observaciones prudentes basadas en fuentes públicas',
    '- si un dato no está claro, usa formulaciones seguras: se observa, podría estar generando fricción, la oportunidad visible está en, el siguiente movimiento recomendado sería, esto puede reducir la distancia entre interés y contacto',
    '- no repitas la misma idea entre summary, markdown y structured.sections',
    '- no abuses de bullets; prioriza párrafos cortos y legibles en mobile',
    '- mantén un tono premium, sobrio, estratégico, comercialmente claro y editorial',
    '',
    'Qué debe responder el diagnóstico, directa o indirectamente:',
    '- qué ya tiene el prospecto',
    '- qué no está suficientemente claro todavía',
    '- dónde se puede estar perdiendo confianza, recordación o acción sin afirmarlo como hecho cerrado',
    '- qué debería ordenar un sprint',
    '- por qué ese sprint tiene sentido ahora',
    '',
    'Profundidad de lectura requerida:',
    '- no digas solo que existe Instagram, sitio web, WhatsApp o ubicación; explica cómo esa presencia ayuda o no ayuda a que una persona entienda rápido qué se ofrece, por qué confiar y qué paso tomar',
    '- muestra fricción invisible en la mente del prospecto: claridad de oferta, confianza, recordación, diferenciación, CTA, mobile, velocidad para decidir y dispersión entre web, Instagram, Google, directorios, landing y WhatsApp',
    '- si el prospecto tiene teléfono, WhatsApp, sitio web, Instagram, ubicación o fuentes añadidas manualmente, trátalos como señales relevantes para construir la lectura; no los ignores',
    '- convierte cada observación en tensión comercial elegante',
    '- evita lenguaje absoluto; trabaja desde oportunidad visible y arquitectura de percepción',
    '- adapta el texto al contexto real del negocio, su categoría, ciudad, propuesta pública, canales y señales encontradas',
    '',
    'Intención por sección:',
    '- summary: una lectura ejecutiva breve que reconozca la base existente sin complacencia y nombre la oportunidad principal de percepción/conversión',
    '- markdown / Lectura ejecutiva: abrir con visión de negocio, no con inventario de activos',
    '- markdown / Lo que ya está bien: reconocer activos reales y explicar por qué importan comercialmente para confianza, descubrimiento, diferenciación o conversión',
    '- markdown / Oportunidades principales: hablar de fricciones en la ruta de decisión y de la distancia entre interés y contacto',
    '- markdown / Siguiente paso recomendado: cerrar con un sprint de claridad y conversión digital, sprint de percepción y ruta de decisión, sprint mobile-first o sprint para ordenar propuesta, confianza, servicios y CTA',
    '- structured.sections: replica esas cuatro secciones con texto específico, corto y listo para ser consumido por frontend sin cambiar el contrato actual',
    '- structured.opportunities: conserva exactamente tres oportunidades, específicas y no genéricas',
    '- structured.quickWin y structured.minimumSystem: recomendaciones prudentes, concretas y accionables',
    '',
    'Estructura esperada dentro de markdown:',
    '- # Lectura ejecutiva',
    '- ## Lo que ya esta bien',
    '- ## Oportunidades principales',
    '- ## Siguiente paso recomendado',
    '',
    'Criterios de estilo:',
    '- más arquitectura de percepción que reporte SEO',
    '- más diagnóstico para decidir que resumen de presencia digital',
    '- más tensión comercial elegante que enumeración descriptiva',
    '- específico para este prospecto, no reusable como copy para cualquier negocio',
    '',
    'Contexto resumido del prospecto:',
    prospectContext,
    '',
    'Schema esperado de salida JSON:',
    expectedOutput,
    '',
    'Prospecto JSON:',
    payload,
  ].join('\n');
}
