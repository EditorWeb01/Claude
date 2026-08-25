---
name: Prime Express
description: El plano de elevación de racks convertido en interfaz — una página que se recorre como un pasillo de almacén.
colors:
  plan-white: "#eef2f6"
  paper: "#ffffff"
  rack-blue: "#034287"
  rack-blue-deep: "#022f61"
  beam-blue: "#2f7fd6"
  aisle-navy: "#021d3d"
  aisle-navy-deep: "#03152b"
  signal-orange: "#ff7300"
  signal-orange-print: "#d96200"
  ink: "#0b1f33"
  annotation-grey: "#566a7d"
  rule-blue: "rgba(3, 66, 135, .2)"
  rule-blue-soft: "rgba(3, 66, 135, .1)"
  on-navy: "rgba(214, 228, 243, .78)"
typography:
  display:
    fontFamily: "Archivo, 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 6.2vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.04em"
    fontVariation: "'wdth' 104"
  headline:
    fontFamily: "Archivo, 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(2.05rem, 3.5vw, 3.4rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 108"
  title:
    fontFamily: "Archivo, 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.2vw, 2.15rem)"
    fontWeight: 700
    lineHeight: 1.06
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 104"
  lede:
    fontFamily: "Archivo, 'Segoe UI', system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  body:
    fontFamily: "Archivo, 'Segoe UI', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "'Azeret Mono', ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.06em"
    fontFeature: "tabular-nums"
rounded:
  all: "0"
spacing:
  xs: "8px"
  sm: "14px"
  md: "20px"
  lg: "34px"
  xl: "44px"
  section: "clamp(88px, 11vh, 148px)"
  section-stacked: "clamp(64px, 7vh, 104px)"
components:
  button-primary:
    backgroundColor: "{colors.signal-orange}"
    textColor: "{colors.aisle-navy}"
    rounded: "{rounded.all}"
    padding: "14px 20px"
  button-primary-hover:
    backgroundColor: "#ffa14d"
    textColor: "{colors.aisle-navy}"
  button-rule:
    backgroundColor: "transparent"
    textColor: "{colors.rack-blue}"
    rounded: "{rounded.all}"
    padding: "13px 0"
  button-rule-hover:
    textColor: "{colors.signal-orange-print}"
  bay:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.all}"
    padding: "30px"
  field:
    backgroundColor: "{colors.plan-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.all}"
    padding: "0 14px"
    height: "52px"
  field-focus:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  cota:
    backgroundColor: "{colors.aisle-navy}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.all}"
    padding: "9px 16px 9px 14px"
---

# Design System: Prime Express

## Overview

**Creative North Star: "El plano de elevación de racks"**

El sistema toma prestado el lenguaje del dibujo técnico con el que un almacén se proyecta y se direcciona: elevaciones de rack, líneas de cota con topes, hatching de piso, coordenadas de bahía. No es una decoración "técnica" encima de una web corporativa: la página entera está montada sobre ese sistema de coordenadas y se recorre como un pasillo, con las ocho secciones numeradas A-01 a A-08 en un rail fijo. Lo que en un plano es una anotación, aquí es navegación; lo que en un plano es una cota, aquí es la etiqueta de una fotografía.

La página alterna dos estados físicos, no dos temas: la **hoja de plano** (blanco frío #eef2f6, líneas azules, todo medido) y el **pasillo filmado** (navy #021d3d, material propio a sangre completa). El azul dibuja; el naranja solo marca la posición activa y la acción. El material fotográfico y fílmico es del cliente y se muestra sin estilizar: el sistema lo enmarca, no lo interpreta.

La densidad es alta en las hojas de plano y baja en los tramos filmados, y esa alternancia es el ritmo del scroll: un tramo cargado se paga con uno oscuro y silencioso. El rechazo explícito del mundo es el hero de dashboard sobre degradado navy y el tríptico de tarjetas con ícono que envía toda la categoría logística.

**Key Characteristics:**
- Ninguna esquina redondeada en todo el sistema: un plano no tiene radios.
- Naranja reservado: posición activa y acción, nunca decoración.
- Toda anotación monoespaciada es una medida, una coordenada o un conteo.
- La profundidad se construye con perspectiva real (`translateZ`), no con sombras de colores.
- Cada región movida por scroll tiene una ruta equivalente sin movimiento.

## Colors

Paleta comprometida: dos fondos que se alternan a escala de página (hoja y pasillo), un azul que dibuja y un naranja que señala.

### Primary
- **Rack Blue** (#034287): el color del dibujo. Líneas de cota, reglas de nivel, hatching, códigos de bahía, enlaces con regla, bordes de campo enfocado, pulgar de la barra de scroll. Es el color con el que el sistema piensa.
- **Signal Orange** (#ff7300): posición activa (etapa en foco, bahía de campaña, coordenada actual del rail) y acción (botón sólido, marca de selección, cursor de texto, anillo de foco). Nunca como fondo decorativo ni como degradado.

### Secondary
- **Aisle Navy** (#021d3d): el pasillo. Fondo de todos los tramos filmados (hero, tecnología, nosotros) y de la barra superior. También es el color del texto sobre el naranja.
- **Beam Blue** (#2f7fd6): solo la luz del marco de bahía sobre el video del hero y las líneas del plano sobre navy. No es un color de UI.

### Tertiary
- **Signal Orange Print** (#d96200): la única variante del naranja, para texto naranja sobre fondo claro donde #ff7300 no alcanza contraste.

### Neutral
- **Plan White** (#eef2f6): fondo de todas las hojas de plano y de los campos de formulario en reposo.
- **Paper** (#ffffff): las superficies que se apoyan sobre la hoja — bahías, racks, tarjetas de etapa, la orden de evaluación.
- **Ink** (#0b1f33): texto principal sobre claro.
- **Annotation Grey** (#566a7d): párrafos secundarios, cotas y etiquetas sobre claro. Medido: 4.97:1 sobre #eef2f6 y 5.59:1 sobre blanco.
- **On Navy** (rgba(214,228,243,.78)): texto secundario sobre los tramos oscuros. Es un azul desaturado del propio navy, nunca un gris neutro.
- **Rule Blue** (rgba(3,66,135,.2)) y **Rule Blue Soft** (rgba(3,66,135,.1)): todas las líneas del dibujo — bordes, cotas, retículas, marcos punteados.

### Named Rules
**The Signal Rule.** El naranja marca dónde está el visitante y qué puede hacer. Si un elemento naranja no es la posición activa ni una acción, está mal pintado.

**The Two Grounds Rule.** La página solo tiene dos fondos: hoja (#eef2f6) y pasillo (#021d3d). Una sección nueva elige uno de los dos; no se inventa un tercer fondo ni un degradado entre ambos.

**The Drawn Line Rule.** Toda línea es azul a 1px, y las que miden llevan topes (`::before` / `::after` de 1px por 9–13px). Una línea sin tope es un borde; una con topes es una cota y afirma una medida.

## Typography

**Display Font:** Archivo variable (wght 400–800, wdth 75–125), self-hosted en `fonts/archivo-latin.woff2` y `fonts/archivo-latin-ext.woff2`
**Body Font:** Archivo, la misma familia en su corte normal
**Label/Mono Font:** Azeret Mono variable (wght 400–600), self-hosted en `fonts/azeret-mono-latin.woff2`

**Character:** Archivo es una grotesca industrial de ancho variable: el eje `wdth` se usa como recurso de composición, no como decoración — 100 para los enunciados que deben caber en una línea, 104–108 para titulares de sección. Azeret Mono aporta el registro de anotación de plano: cifras tabulares, mayúsculas, tracking abierto.

### Hierarchy
- **Display** (800, `clamp(2.4rem, 6.2vw, 5.5rem)`, lh 0.98, ls −0.04em, `wdth` 104): solo el titular del hero. El enunciado va en blanco y la respuesta en naranja a `.78em`, un escalón deliberado entre afirmación y respuesta.
- **Headline** (700, `clamp(2.05rem, 3.5vw, 3.4rem)`, lh 1.02, ls −0.035em, `wdth` 108): el titular de cada sección. Su segunda línea va en azul sobre claro y en naranja sobre oscuro.
- **Title** (700, `clamp(1.5rem, 2.2vw, 2.15rem)`, lh 1.06, `wdth` 104): títulos de bahía, rack y etapa.
- **Lede** (400, 1.125rem, lh 1.7, máx. 56ch): el párrafo que sigue al titular de sección.
- **Body** (400, 16px, lh 1.6): párrafos de tarjeta y listas.
- **Label** (Azeret Mono 400, 0.875rem, ls 0.06em, mayúsculas, cifras tabulares): coordenadas (A-03-01), niveles, cotas, conteos, cabecera de la orden de evaluación.

### Named Rules
**The Measurement Rule.** El monoespaciado es para coordenadas, cotas, niveles y conteos. Una instrucción, una frase o una etiqueta de navegación en mono es un disfraz técnico y no pertenece al sistema.

**The No Eyebrow Rule.** Ninguna sección lleva un rótulo pequeño encima del titular. El titular carga solo; las anotaciones de coordenada viven en el margen del dibujo o en el rail, nunca sobre el encabezado.

**The Statement and Answer Rule.** Los titulares se escriben en dos registros: enunciado y respuesta, la segunda diferenciada por color y —en el hero— por un escalón de tamaño.

## Layout

Contenedor único: `--shell: min(1240px, 100% - 200px)`. La calle de 100px a cada lado no es aire: aloja el rail de coordenadas fijo, que vive fuera del contenedor y nunca se superpone al contenido.

Las hojas de plano llevan `padding: clamp(88px, 11vh, 148px) 0`, y una hoja que sigue a otra reduce su borde superior a `clamp(64px, 7vh, 104px)`. Cada `[id]` lleva `scroll-margin-top: 92px` para que ninguna ancla quede bajo la barra fija de 76px.

Los dibujos de elevación (A-02 y A-03) llevan `padding-left: 96px` para la regla de niveles o bahías, con la línea de piso alineada a esa misma sangría. Las retículas del plano se dibujan con `repeating-linear-gradient` a 44px, 54px o 58px según la escala de la sección.

Dos cortes: **1180px** retira el rail y colapsa los pares de columnas a una; **860px** cambia el hero de pantalla completa a banda de video con el texto debajo, oculta la regla de niveles, convierte la navegación en cajón lateral y baja el hero al set de imágenes de 800px. La ruta de `prefers-reduced-motion` es un tercer estado de layout completo, no una desactivación: alturas automáticas, escenas apiladas, pasillo horizontal convertido en lista vertical.

## Elevation & Depth

Sistema híbrido y deliberado: **la profundidad real la da la perspectiva, no la sombra.** Los contenedores con `perspective` (1200–1600px) y los hijos con `translateZ` construyen el pasillo, el marco de bahía que se abre, las placas inclinadas del WMS y las tarjetas de etapa que pasan en profundidad. Las sombras solo apoyan esa lectura.

### Shadow Vocabulary
- **Plate** (`--shadow-plate: 0 26px 48px -28px rgba(2,29,61,.55), 0 4px 12px -6px rgba(2,29,61,.3)`): placas fotográficas y superficies levantadas sobre la hoja de plano.
- **Dark** (`--shadow-dark: 0 24px 40px -24px rgba(0,0,0,.78), 0 6px 12px -8px rgba(0,0,0,.5)`): las mismas placas cuando se apoyan sobre el pasillo navy. Sombra negra, nunca teñida.
- **Rest** (`0 12px 30px -26px rgba(2,29,61,.5)`): tarjeta de etapa en reposo, al fondo del pasillo.
- **Active** (`0 26px 44px -28px rgba(2,29,61,.8)`): tarjeta de etapa encuadrada.

### Named Rules
**The Offset Rule.** Toda sombra tiene desplazamiento vertical y desenfoque. Un halo de color sin desplazamiento no es profundidad, es decoración.

**The Dark Ground Rule.** Sobre navy, las sombras son negras. Una sombra navy sobre fondo navy no separa nada.

## Shapes

**Radio cero en todo el sistema.** No hay una sola esquina redondeada: ni botones, ni tarjetas, ni campos, ni la barra de scroll (que se declara explícitamente en `0`). Un plano no tiene radios, y esa es la firma silenciosa del mundo.

El vocabulario de forma es de líneas y marcos: borde continuo de 1px azul translúcido para las superficies; marco punteado interior a 8–10px dentro de las bahías y de la orden de evaluación, como el doble filete de una hoja de dibujo; líneas de cota con topes; hatching diagonal a 115° para el piso; retículas ortogonales para el fondo. Las fotografías son placas rectangulares con su cota anclada abajo a la izquierda: un tope naranja de 24px, la coordenada y el nombre del servicio, sobre un plato navy que se desvanece hacia la derecha.

## Components

### Buttons
- **Shape:** rectángulo puro (radio 0), borde de 1px transparente para que el hover no desplace.
- **Primary:** fondo Signal Orange con texto Aisle Navy (5.2:1 medido — el texto blanco sobre naranja no alcanzaría), `padding: 14px 20px`, ícono SVG a la derecha. Hover: fondo #ffa14d y el ícono se desplaza 3px en diagonal. Active: `translateY(1px)`.
- **Rule (secundario):** sin fondo, texto Rack Blue sobre una regla inferior de 1px; el hover cambia la regla a naranja. Sobre navy el texto es blanco y la regla `rgba(255,255,255,.25)`.
- **Focus:** anillo naranja de 2px con `outline-offset: 3px`, igual en toda la página.

### Cards / Containers
- **Bahía** (A-02): fondo Paper, borde 1px Rule Blue, marco punteado interior a 8px, coordenada en la esquina superior derecha, y una cota de ancho completo al pie. La bahía alta se carga con una fotografía a sangre de sus costados.
- **Rack** (A-03): la misma anatomía con la placa fotográfica arriba y el cuerpo debajo; hover y focus-within levantan la pieza `26px` en Z con la sombra creciendo en consecuencia.
- **Etapa** (A-06): en reposo, fondo `rgba(255,255,255,.74)` y `translateZ(-120px)`; encuadrada, fondo blanco, `translateZ(30px)` y borde azul al 42%. **El texto nunca se atenúa: se atenúa el marco.**

### Inputs / Fields
- **Style:** alto 52px, fondo Plan White, borde 1px Rule Blue, radio 0. La etiqueta va arriba en Azeret Mono.
- **Focus:** el fondo pasa a blanco, el borde a Rack Blue y aparece un subrayado interior naranja de 2px (`inset 0 -2px 0`).
- **Error:** borde y subrayado en #c0341a, más un mensaje que nombra qué falta y cómo resolverlo.
- **Select:** flecha dibujada con dos degradados a 45°/135°, sin ícono de sistema.

### Navigation
- **Barra superior:** fija, 76px, degradado navy a transparente; al pasar 90px de scroll se ancla en `rgba(2,29,61,.93)` con desenfoque; se retira al bajar y vuelve al subir.
- **Rail de coordenadas:** fijo al borde izquierdo, ocho coordenadas A-01…A-08 con una línea de progreso; la activa pasa a naranja y se desplaza 3px. Es decorativo para lectores de pantalla (`aria-hidden` y anclas fuera del orden de tabulación) porque duplica destinos que la navegación ya ofrece; se retira durante el pasillo horizontal para no chocar con las tarjetas.
- **Cajón móvil:** panel navy desde la derecha con las coordenadas a la izquierda de cada destino.

### Signature Component — el pasillo
Dos piezas comparten la misma idea y la misma gramática:
- **A-01, el pasillo filmado:** secuencia de 200 fotogramas WebP del video propio dibujada en `<canvas>` y avanzada por el scroll, dentro de un marco de bahía (dos montantes y dos travesaños iluminados) que se abre en profundidad conforme se avanza. Tres escenas de texto se relevan sobre él y un contador marca en cuál va el visitante.
- **A-06, el pasillo horizontal:** cuatro etapas que pasan en profundidad mientras la unidad recorre la línea de piso. El recorrido se mide sobre las tarjetas y descansa con una encuadrada; la etapa activa se elige por cuánta superficie de ella se ve, no por la posición del scroll.

## Do's and Don'ts

### Do:
- **Do** elegir uno de los dos fondos del sistema para cada sección nueva: hoja #eef2f6 o pasillo #021d3d.
- **Do** anclar toda anotación monoespaciada a algo medible: una coordenada, un nivel, una cota, un conteo.
- **Do** construir profundidad con `perspective` y `translateZ`, y dejar que la sombra apoye.
- **Do** dar a cada región movida por scroll una ruta equivalente bajo `prefers-reduced-motion`, con el contenido visible por defecto.
- **Do** declarar cuando un elemento es un esquema ilustrativo, como hace el mapa del WMS.
- **Do** usar texto navy sobre el naranja; el blanco sobre #ff7300 no alcanza 4.5:1.

### Don't:
- **Don't** redondear esquinas. El sistema no tiene un solo radio.
- **Don't** usar naranja para nada que no sea la posición activa o una acción.
- **Don't** poner un rótulo pequeño encima de un titular.
- **Don't** atenuar texto para expresar profundidad: se atenúa el marco.
- **Don't** usar glifos unicode como íconos; el sistema tiene símbolos SVG propios de trazo 1.6 con terminaciones cuadradas.
- **Don't** teñir de navy una sombra que cae sobre navy.
- **Don't** poner instrucciones o navegación en Azeret Mono.
