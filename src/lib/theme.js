// Revalize brand blue as a scoped CSS custom-property override — layers onto shadcn's
// --primary/--ring tokens so any primitive underneath (Button, text-primary, ring) picks it
// up automatically. Never modifies the primitives themselves. See Foundations/Themes.
export const revalizeContent = '[--primary:#0856cf] [--primary-foreground:#ffffff] [--ring:#0856cf]'
