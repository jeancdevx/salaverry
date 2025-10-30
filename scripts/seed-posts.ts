import 'dotenv/config'

import { db } from '@/db'
import { post, user } from '@/db/schema'

const SAMPLE_POSTS = [
  {
    title: 'Estado Actual de la Playa de Salaverry',
    slug: 'estado-actual-playa-salaverry',
    excerpt:
      'Un análisis detallado del estado actual de nuestra playa y los desafíos que enfrentamos en su conservación.',
    content: `La Playa de Salaverry, ubicada en el distrito del mismo nombre en la provincia de Trujillo, es uno de los principales atractivos turísticos de La Libertad. Sin embargo, en los últimos años hemos observado cambios significativos en su ecosistema.

Estado Actual:
- Calidad del agua: Aceptable, con variaciones estacionales
- Presencia de microplásticos: Moderada
- Flora y fauna marina: Diversa pero vulnerable
- Erosión costera: Problema creciente

Principales Desafíos:
1. Contaminación por residuos sólidos
2. Falta de conciencia ambiental
3. Actividades pesqueras no reguladas
4. Cambio climático y su impacto en las mareas

Es fundamental que la comunidad se involucre en la protección de este recurso natural invaluable.`,
    coverImage:
      'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1600&h=900&fit=crop',
    status: 'published' as const,
    publishedAt: new Date('2025-10-25')
  },
  {
    title: 'Cómo Reducir el Plástico en Nuestras Playas',
    slug: 'reducir-plastico-playas',
    excerpt:
      'Consejos prácticos para disminuir el uso de plástico y contribuir a la limpieza de nuestras costas.',
    content: `El plástico es uno de los principales contaminantes de nuestros océanos. Aquí te compartimos estrategias efectivas para reducir su impacto:

Acciones Individuales:
- Usa botellas reutilizables
- Lleva tus propias bolsas al mercado
- Evita productos con microplásticos
- Participa en jornadas de limpieza

Alternativas Sostenibles:
• Botellas de acero inoxidable
• Bolsas de tela
• Cepillos de dientes de bambú
• Envases de vidrio

Recuerda: Cada pequeña acción cuenta. Si todos ponemos nuestro granito de arena, podemos hacer una gran diferencia en la salud de nuestras playas.

¡Únete al cambio!`,
    coverImage:
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&h=900&fit=crop',
    status: 'published' as const,
    publishedAt: new Date('2025-10-22')
  },
  {
    title: 'La Importancia de los Ecosistemas Marinos',
    slug: 'importancia-ecosistemas-marinos',
    excerpt:
      'Descubre por qué los ecosistemas marinos son vitales para nuestro planeta y cómo podemos protegerlos.',
    content: `Los ecosistemas marinos son fundamentales para la vida en la Tierra. Producen más del 50% del oxígeno que respiramos y regulan el clima global.

Biodiversidad en Salaverry:
- Aves marinas: pelícanos, gaviotas, cormoranes
- Peces: lenguado, corvina, pejerrey
- Invertebrados: cangrejos, pulpos, estrellas de mar
- Mamíferos marinos ocasionales: lobos marinos

Servicios Ecosistémicos:
1. Regulación del clima
2. Producción de oxígeno
3. Fuente de alimento
4. Turismo y recreación

Amenazas Actuales:
• Sobrepesca
• Contaminación
• Acidificación de los océanos
• Destrucción de hábitats

La protección de estos ecosistemas requiere el compromiso de todos. Desde pescadores hasta turistas, cada uno tiene un rol importante que cumplir.`,
    coverImage:
      'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1600&h=900&fit=crop',
    status: 'published' as const,
    publishedAt: new Date('2025-10-20')
  },
  {
    title: 'Jornadas de Limpieza: Resultados del Último Mes',
    slug: 'jornadas-limpieza-resultados',
    excerpt:
      'Resumen de las actividades de limpieza realizadas en octubre y el impacto positivo en nuestra playa.',
    content: `Durante el mes de octubre, organizamos tres jornadas de limpieza en la Playa de Salaverry con resultados extraordinarios.

Estadísticas:
- Participantes: 150 voluntarios
- Residuos recolectados: 850 kg
- Plástico: 65%
- Vidrio: 15%
- Metal: 10%
- Otros: 10%

Logros Destacados:
✓ Limpieza de 2 km de costa
✓ Reciclaje del 70% de los residuos
✓ Educación ambiental a 200 niños
✓ Plantación de 50 árboles nativos

Testimonios:
"Es increíble ver cómo la comunidad se une por una causa común. Nuestra playa se ve más hermosa cada día." - María, voluntaria

Próximas Jornadas:
📅 Sábado 15 de noviembre, 8:00 AM
📍 Punto de encuentro: Muelle de Salaverry

¡Te esperamos!`,
    coverImage:
      'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=1600&h=900&fit=crop',
    status: 'published' as const,
    publishedAt: new Date('2025-10-28')
  },
  {
    title: 'El Cambio Climático y Sus Efectos en la Costa Peruana',
    slug: 'cambio-climatico-costa-peruana',
    excerpt:
      'Análisis del impacto del cambio climático en nuestras costas y qué podemos hacer al respecto.',
    content: `El cambio climático está afectando significativamente las costas del Perú, incluyendo la Playa de Salaverry.

Efectos Observados:
- Aumento del nivel del mar: 3mm por año
- Temperaturas más altas: +1.5°C en los últimos 30 años
- Eventos climáticos extremos más frecuentes
- Cambios en las corrientes marinas

Impactos Locales:
• Erosión acelerada de la costa
• Cambios en la distribución de especies marinas
• Afectación de actividades pesqueras
• Riesgo para infraestructura costera

Acciones de Mitigación:
1. Reducir emisiones de CO2
2. Proteger y restaurar manglares
3. Implementar sistemas de alerta temprana
4. Fortalecer la resiliencia comunitaria

Adaptación Local:
- Construcción de rompeolas
- Reforestación costera
- Monitoreo constante del mar
- Educación ambiental

El futuro de nuestra playa depende de las acciones que tomemos hoy. Es momento de actuar.`,
    coverImage:
      'https://images.unsplash.com/photo-1569163139394-de4798aa62b1?w=1600&h=900&fit=crop',
    status: 'published' as const,
    publishedAt: new Date('2025-10-18')
  },
  {
    title: 'Guía Completa para el Cuidado de Nuestras Playas',
    slug: 'guia-cuidado-playas',
    excerpt:
      'Todo lo que necesitas saber para ser un visitante responsable y contribuir a la conservación.',
    content: `Visitar la playa es un placer, pero también una responsabilidad. Aquí te presentamos una guía completa para disfrutar mientras proteges el ecosistema marino.

Antes de Ir:
☑ Prepara una bolsa para tus residuos
☑ Lleva protector solar biodegradable
☑ Empaca snacks sin empaques desechables
☑ Revisa las condiciones del mar

Durante tu Visita:
• No dejes basura en la playa
• Respeta la flora y fauna
• No alimentes a los animales
• Usa las áreas designadas
• Respeta las señalizaciones

Después:
- Llévate todo lo que trajiste
- Reporta cualquier contaminación
- Comparte tu experiencia positiva
- Inspira a otros a cuidar la playa

Actividades Recomendadas:
🏊 Natación en zonas seguras
🤿 Observación de fauna marina
📸 Fotografía responsable
🏃 Ejercicio en la orilla

Prohibiciones:
✗ No extraer animales o plantas
✗ No hacer fogatas sin autorización
✗ No usar jabón o champú en el mar
✗ No arrojar colillas de cigarrillos

Recuerda: Somos visitantes en el hogar de miles de especies. Tratemos la playa con el respeto que merece.`,
    coverImage:
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1600&h=900&fit=crop',
    status: 'published' as const,
    publishedAt: new Date('2025-10-15')
  }
]

async function seed() {
  try {
    console.log('🌱 Iniciando seed de posts de prueba...')

    // Verificar que existe al menos un usuario
    const users = await db.select().from(user).limit(1)

    if (users.length === 0) {
      console.error(
        '❌ Error: No hay usuarios en la base de datos. Por favor, crea un usuario primero.'
      )
      process.exit(1)
    }

    const authorId = users[0].id
    console.log(`✅ Usuario encontrado: ${users[0].name} (${authorId})`)

    // Insertar posts
    console.log('\n📝 Insertando posts...')

    for (const postData of SAMPLE_POSTS) {
      await db.insert(post).values({
        ...postData,
        authorId
      })
      console.log(`  ✓ ${postData.title}`)
    }

    console.log(`\n🎉 ¡Seed completado exitosamente!`)
    console.log(`   Total de posts insertados: ${SAMPLE_POSTS.length}`)
    console.log('\n🔗 Puedes ver los posts en: http://localhost:3000/posts')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error al hacer seed:', error)
    process.exit(1)
  }
}

seed()
