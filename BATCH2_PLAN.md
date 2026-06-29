# Batch 2: Próximos 4 Componentes

Continuando con los siguientes 4 componentes del lote:

## Prioridad

| # | Componente | Tipo | Effort | Impacto | Reason |
|---|---|---|---|---|---|
| 1 | **Dialog** | Modal | 1.5h | Alto | Core modal component |
| 2 | **Drawer** | Lateral | 1.5h | Alto | Side sheet variant |
| 3 | **Tabs** | Navigation | 1h | Medio | Tab-based navigation |
| 4 | **Select** | Form | 1.5h | Alto | Dropdown select (core form) |

---

## Dialog
**Current**: Minimal (1 story)
**Add**: 
- Basic dialog
- With forms
- Large content
- Scrollable content

**Variants**: None (no size variants needed)
**Matt's Requirements**: Real product examples

---

## Drawer
**Current**: Pre-existing
**Add**:
- Side drawer (left/right)
- Slide-over with content
- With header/footer
- Dismissible drawer

**Variants**: Position (left, right, top, bottom)
**Matt's Requirements**: Clarify when to use vs Dialog

---

## Tabs
**Current**: Minimal (1 story)
**Add**:
- Default horizontal tabs
- Vertical tabs
- Icon tabs
- Disabled tabs
- Underline variant

**Variants**: orientation (horizontal, vertical), variant (default, underline)
**Matt's Requirements**: Real usage patterns

---

## Select
**Current**: Pre-existing
**Add**:
- Basic select
- With groups
- Search enabled
- Disabled states
- Form composition

**Variants**: size? (check component)
**Matt's Requirements**: Distinguish from Combobox/Command

---

## Estimated Time
- Dialog: 1.5h
- Drawer: 1.5h
- Tabs: 1h
- Select: 1.5h
- **Total**: ~5.5 hours

---

## Order
1. Dialog (dependency for Drawer understanding)
2. Drawer (uses Dialog pattern)
3. Tabs (independent, smaller)
4. Select (complex, last)

---

## Ready to start?
Let's go Dialog first → review → Drawer → Tabs → Select
