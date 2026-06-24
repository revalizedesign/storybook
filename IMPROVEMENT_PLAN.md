# Plan de Mejoras Pequeñas - Para subir a Repo de Matt

## Objetivo
Hacer pequeños cambios incrementales que agreguen valor sin refactorizar todo.

---

## Fase 1: Documentación (Sin cambiar código)

### 1.1 Agregar Docs Pages
Crear MDX pages para documentar componentes clave:

**Archivo**: `src/stories/Foundations-Button.mdx`
- Uso correcto de Button
- Sizes: xs, sm, md, lg, xl
- Variantes: primary, secondary, outline, destructive, ghost
- Accessibility: aria-label para icon-only

**Archivo**: `src/stories/Foundations-Input.mdx`
- Input types soportados
- Validation states (error, success, info)
- Con Label component siempre
- Size variants

**Archivo**: `src/stories/Primitives-Overview.mdx`
- Qué son los primitivos
- Cómo combinarlos en formas
- Color scheme

### 1.2 Mejorar Existing Documentation
**File**: `src/stories/Introduction.mdx`
- Agregar sección "Quick Start"
- Explicar estructura (components/ui vs custom)

---

## Fase 2: Component Stories (Pequeños cambios)

### 2.1 Button Stories - Agregar Documentación

**Current**: `src/stories/button.stories.jsx`
- ✅ Tiene Default, variants, sizes
- ❌ Sin documentación de cuándo usar cada una

**Change**: Agregar `createDocsPage` con comentarios:
```javascript
export default {
  title: 'shadcn/Button',
  parameters: {
    docs: {
      page: createDocsPage({
        comments: {
          Usage: 'Use Button for primary interactions. Icon-only buttons must have aria-label.',
          Sizes: 'xs=compact, sm=secondary, md=default, lg=primary, xl=landing pages',
          Variants: 'primary=main action, secondary=alternative, outline=tertiary, destructive=delete (red)',
        },
      }),
    },
  },
}
```

### 2.2 Input Stories - Agregar Sizes & Validation

**Current**: `src/stories/input.stories.jsx`
- ✅ Default, types (email, password, etc)
- ❌ Sin stories de sizes
- ❌ Sin validation states (error, success)

**Changes**:
1. Agregar story `InputSizes` mostrando xs, sm, md, lg
2. Agregar story `InputValidation` mostrando error/success/info states
3. Agregar story `InputWithLabel` mostrando composición correcta
4. Agregar documentación

### 2.3 AlertDialog - Corregir Pattern

**Current**: `src/stories/alert-dialog.stories.jsx`
- ✅ Tiene algunos ejemplos
- ❌ Usa "Are you sure?" (vago)
- ❌ No es claro el impacto de la acción

**Changes**:
1. Cambiar todas las historias a patrón: `[Action] [Entity]`
   - "Delete Configuration" (no "Are you sure?")
   - "Remove User" (no "Delete user?")
   - "Archive Project"
   
2. Body debe tener:
   - Qué pasará específicamente
   - "This action cannot be undone"
   
3. Button layout:
   - Left: "Cancel" (outline)
   - Right: "Delete [Entity]" (red/destructive)

---

## Fase 3: Testing (Pequeños cambios)

### 3.1 Agregar Play Functions
Para las stories más importantes, agregar play functions simples:

**button.stories.jsx**:
```javascript
export const Default = {
  render: () => <Button>Click me</Button>,
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button')
    await expect(button).toBeVisible()
  }
}
```

**input.stories.jsx**:
```javascript
export const Default = {
  render: () => <Input placeholder="Type here" />,
  play: async ({ canvas }) => {
    const input = canvas.getByPlaceholderText('Type here')
    await expect(input).toBeVisible()
  }
}
```

### 3.2 Agregar CssCheck Story
Una story única que verifica que CSS cargó correctamente:

```javascript
export const CssCheck = {
  render: () => <Button className="bg-blue-600">CSS Loaded</Button>,
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button')
    await expect(button).toBeVisible()
  }
}
```

---

## Fase 4: Color Scheme (1 pequeño cambio)

### 4.1 Definir Revalize Blue en CSS

**File**: `src/index.css`
```css
:root {
  --primary: #2563EB; /* Revalize Blue */
  --primary-hover: #1D4ED8;
  --primary-active: #1E40AF;
  --destructive: #EF4444;
}
```

Luego usar estas variables en componentes via Tailwind.

---

## Fase 5: Misc Improvements

### 5.1 Fix Breadcrumb Edge Cases
**File**: `src/stories/breadcrumb.stories.jsx`
- Agregar story con breadcrumb muy largo
- Agregar story con breadcrumb anidado

### 5.2 Badge Color Variants
**File**: `src/stories/badge.stories.jsx`
- Agregar story mostrando Revalize Blue como color primary
- Agregar story con todos los estados (success, error, warning, info)

### 5.3 Expandir Experiments
**File**: `src/stories/experiments-tree-view.stories.jsx`
- Agregar búsqueda en árbol
- Agregar filtro por tipo de nodo

---

## Prioridad de Cambios

### Alto (Hacer primero)
1. ✅ Button docs + sizes - 30 min
2. ✅ Input docs + validation + sizes - 45 min
3. ✅ AlertDialog pattern fix - 30 min
4. ✅ Revalize Blue CSS vars - 15 min

### Medio (Después)
5. 🔄 Play functions para tests - 30 min
6. 🔄 CssCheck story - 15 min
7. 🔄 Docs pages (MDX) - 45 min

### Bajo (Nice-to-have)
8. ❌ Breadcrumb edge cases - 20 min
9. ❌ Badge variants - 15 min
10. ❌ Experiments expansion - 30 min

---

## Commits Sugeridos

### Commit 1: Documentation & Docs Pages
```
feat: Add component documentation pages

- Add Foundations-Button.mdx with usage guidelines
- Add Foundations-Input.mdx with validation states
- Add Primitives-Overview.mdx with component structure
- Update Introduction.mdx with Quick Start section
```

### Commit 2: Button & Input Improvements
```
feat: Enhance Button and Input stories with docs

- Add documentation to button.stories.jsx
- Add InputSizes story (xs, sm, md, lg)
- Add InputValidation story (error, success, info)
- Add InputWithLabel story showing correct composition
```

### Commit 3: AlertDialog Pattern Fix
```
fix: Correct AlertDialog pattern

- Change from vague "Are you sure?" to action-specific patterns
- Use action verb + entity (Delete Configuration, Remove User)
- Add specific impact statement + "cannot be undone"
- Fix button layout (Cancel left outline, Destructive right red)
```

### Commit 4: Color Scheme
```
feat: Define Revalize Blue color scheme

- Add CSS variables for primary colors (#2563EB)
- Add hover (#1D4ED8) and active (#1E40AF) states
- Add destructive color (#EF4444)
- Update Button component to use primary color
```

### Commit 5: Testing Infrastructure (Optional)
```
feat: Add play functions and CssCheck story

- Add basic play functions to button, input, dialog stories
- Add CssCheck story to verify CSS loading
- Set up for Storybook vitest integration
```

---

## Cómo Ejecutar

1. Crear rama: `git checkout -b feature/small-improvements`
2. Hacer cambios pequeños (1 commit por tema)
3. Test localmente: `npm run storybook`
4. Push a tu fork: `git push origin feature/small-improvements`
5. Crear PR a Matt's repo

---

## Estimado Total
- **Fase 1 (Docs)**: ~1-2 horas
- **Fase 2 (Stories)**: ~1.5-2 horas
- **Fase 3 (Testing)**: ~1 hora
- **Fase 4 (Color)**: ~15 min
- **Total**: ~4-5 horas para todo

**Pero puedes hacer solo las fases 1-4 (~2 horas) y dejar testing para después.**

