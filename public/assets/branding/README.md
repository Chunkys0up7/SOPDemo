# Pursuit Bank - Brand Assets

This directory contains the official Pursuit Bank brand assets including logos, typography, and brand guidelines.

## Available Assets

### Logo Files

- **pursuit-logo-primary.svg** - Primary logo with blue background (#0052CC) and white mark
  - Use for: App icons, favicons, primary branding

- **pursuit-logo-white.svg** - White logo mark on transparent background
  - Use for: Dark backgrounds, dark mode interfaces

- **pursuit-logo-blue.svg** - Blue logo mark (#0052CC) on transparent background
  - Use for: Light backgrounds, documents, presentations

### Documentation

- **BRAND_GUIDELINES.md** - Complete brand guidelines including:
  - Logo usage rules
  - Color palette
  - Typography system
  - Application examples
  - Accessibility standards

## Quick Reference

### Primary Color

```css
--pursuit-blue: #0052CC;
```

### Typography

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

Import from Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Logo Dimensions

- Mark dimensions: 200×200px (1:1 ratio)
- Vertical stem: 18px width
- Arrow rectangle: 32px × 45px
- Base: 58px width

### Minimum Sizes

- Web: 40px
- Print: 0.5 inches

### Clear Space

Maintain clear space equal to stem width (18px) on all sides.

## Usage Examples

### HTML

```html
<!-- Primary logo -->
<img src="/assets/branding/pursuit-logo-primary.svg" alt="Pursuit Bank" width="60" height="60">

<!-- For dark backgrounds -->
<img src="/assets/branding/pursuit-logo-white.svg" alt="Pursuit Bank" width="60" height="60">

<!-- For light backgrounds -->
<img src="/assets/branding/pursuit-logo-blue.svg" alt="Pursuit Bank" width="60" height="60">
```

### CSS Background

```css
.logo {
  background-image: url('/assets/branding/pursuit-logo-primary.svg');
  background-size: contain;
  background-repeat: no-repeat;
  width: 60px;
  height: 60px;
}
```

### React Component

```jsx
import PursuitLogo from './assets/branding/pursuit-logo-primary.svg';

function Header() {
  return (
    <header>
      <img src={PursuitLogo} alt="Pursuit Bank" width={60} height={60} />
      <span className="wordmark">Pursuit</span>
    </header>
  );
}
```

## Design Principles

1. **Clean & Modern** - Minimalist geometric forms
2. **Forward-Focused** - Arrow symbolism represents growth
3. **Professional & Trustworthy** - Consistent, high-quality presentation
4. **Digital-First** - Optimized for screen display

## Need Help?

- Read full guidelines: `BRAND_GUIDELINES.md`
- Contact design team: design@pursuit.bank
- Slack channel: #brand-guidelines

---

**Last Updated:** 2025-11-16
**Version:** 1.0.0
