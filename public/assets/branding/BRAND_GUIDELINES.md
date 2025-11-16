# Pursuit Bank - Brand Guidelines

**Version:** 1.0.0
**Last Updated:** 2025-11-16

---

## Logo Mark

### Design Concept

A clean, modern forward-pointing arrow combining a vertical stem with an ascending geometric form. Symbolizes forward momentum, financial growth, and confident progress.

### Logo Components

- **Vertical Stem**: 18px width - Represents stability and foundation
- **Arrow Head**: Ascending polygon - Forward momentum
- **Rectangle Block**: 32px × 45px - Solidity and trust
- **Base**: 58px width - Strong foundation

### Logo Variants

1. **Primary (pursuit-logo-primary.svg)**
   - Blue background (#0052CC) with white mark
   - Use for: Main branding, app icons, favicons

2. **White Mark (pursuit-logo-white.svg)**
   - Transparent background, white mark
   - Use for: Dark backgrounds, dark mode interfaces

3. **Blue Mark (pursuit-logo-blue.svg)**
   - Transparent background, blue mark (#0052CC)
   - Use for: Light backgrounds, documents, presentations

### Logo Usage Rules

**DO:**

- Maintain aspect ratio (always 1:1 square)
- Use minimum size: 40px (web), 0.5" (print)
- Maintain clear space: Equal to stem width (18px) on all sides
- Use approved color variants only

**DON'T:**

- Never rotate, skew, or distort
- Never change colors outside approved palette
- Never add drop shadows or effects
- Never place on busy backgrounds
- Never stretch or compress

---

## Color Palette

### Primary Colors

| Color | Hex | RGB | Use Case |
|-------|-----|-----|----------|
| **Pursuit Blue** | `#0052CC` | rgb(0, 82, 204) | Primary brand color, buttons, links |
| **White** | `#FFFFFF` | rgb(255, 255, 255) | Backgrounds, text on blue |
| **Dark Gray** | `#1A1A1A` | rgb(26, 26, 26) | Text, headings |

### Secondary Colors

| Color | Hex | RGB | Use Case |
|-------|-----|-----|----------|
| **Light Gray** | `#F0F0F0` | rgb(240, 240, 240) | Backgrounds, borders |
| **Medium Gray** | `#666666` | rgb(102, 102, 102) | Secondary text |
| **Success Green** | `#00A86B` | rgb(0, 168, 107) | Success states |
| **Warning Orange** | `#FF8C00` | rgb(255, 140, 0) | Warnings |
| **Error Red** | `#D32F2F` | rgb(211, 47, 47) | Errors |

### Gradients

**Primary Gradient:**

```css
background: linear-gradient(135deg, #0052CC 0%, #003D99 100%);
```

---

## Typography

### Primary Typeface: Inter

**Font Family:**

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

**Weights Available:**

- Regular (400)
- Medium (500)
- Semibold (600)
- Bold (700)

### Typography Scale

| Style | Size | Weight | Line Height | Use Case |
|-------|------|--------|-------------|----------|
| **Headline** | 48px | Bold (700) | 1.1 | Hero sections, page titles |
| **Subheading Large** | 32px | Semibold (600) | 1.2 | Section headers |
| **Subheading** | 24px | Semibold (600) | 1.3 | Subsections |
| **Body Large** | 18px | Medium (500) | 1.5 | Important body text |
| **Body** | 16px | Regular (400) | 1.6 | Standard body text |
| **Body Small** | 14px | Regular (400) | 1.6 | Secondary text, disclaimers |
| **Caption** | 12px | Semibold (600) | 1.4 | Labels, uppercase |
| **Fine Print** | 11px | Medium (500) | 1.4 | Legal text, footnotes |

### Typography Usage Examples

**Headlines:**

```css
.headline {
  font-family: 'Inter', sans-serif;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.1;
  color: #1A1A1A;
}
```

**Body Text:**

```css
.body-text {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: #1A1A1A;
}
```

**Labels (Uppercase):**

```css
.label {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #0052CC;
}
```

---

## Logo + Typography Combinations

### Header Lockup

**Horizontal:**

```
[Logo Icon] Pursuit
```

- Icon size: 60-80px
- Text size: 32-40px Semibold
- Gap: 12-20px
- Color: Blue (#0052CC)

**Vertical (stacked):**

```
[Logo Icon]
Pursuit
```

- Icon size: 100-120px
- Text size: 32-48px Semibold
- Gap: 15px
- Centered alignment

### Taglines

**Optional taglines (use sparingly):**

- "Growth Starts Here"
- "Your Financial Journey Matters"
- "Forward Together"

Typography: 16-18px Medium, 60% opacity

---

## Application Guidelines

### Website

**Header:**

- Logo: 60px × 60px (primary or blue variant)
- Wordmark: "Pursuit" 24px Semibold
- Background: White or light gray

**Footer:**

- Logo: 40px × 40px
- Text: 14px Regular

### Mobile App

**App Icon:**

- Use primary logo (blue background, white mark)
- 1024×1024px for stores
- Don't add text to icon

**Splash Screen:**

- Centered logo 120×120px
- Wordmark below, 32px Semibold
- White or blue gradient background

### Business Cards

**Standard Layout:**

- Logo: 40×40px (top left)
- Wordmark: "Pursuit" 16px Semibold
- Website: pursuit.bank 11px Regular
- Contact info: 11px Regular

### Email Signatures

**Format:**

```
[Logo 30×30px] Pursuit

Name | Title
pursuit.bank
```

### Social Media

**Profile Pictures:**

- Primary logo (blue background, white mark)
- Minimum 400×400px

**Cover Images:**

- Horizontal logo + wordmark lockup
- Blue gradient background
- Minimum 1500×500px

---

## Design Principles

1. **Clean & Modern**
   - Minimalist geometric forms
   - Ample white space
   - Clear visual hierarchy

2. **Forward-Focused**
   - Arrow symbolism throughout
   - Progressive imagery
   - Dynamic layouts

3. **Professional & Trustworthy**
   - Consistent color usage
   - Professional typography
   - High-quality photography

4. **Digital-First**
   - Optimized for screens
   - Responsive design
   - Accessibility compliant (WCAG 2.1 AA)

---

## Accessibility

### Color Contrast

All color combinations meet WCAG 2.1 AA standards:

| Foreground | Background | Contrast Ratio | Pass |
|------------|------------|----------------|------|
| White | Pursuit Blue (#0052CC) | 7.5:1 | ✓ AAA |
| Dark Gray (#1A1A1A) | White | 15.8:1 | ✓ AAA |
| Medium Gray (#666) | White | 5.7:1 | ✓ AA |
| Pursuit Blue | White | 7.5:1 | ✓ AAA |

### Typography Accessibility

- Minimum body text: 16px (1rem)
- Line height minimum: 1.5 for body text
- Paragraph width maximum: 80 characters
- Clear focus states for interactive elements

---

## File Formats & Exports

### Logo Files Available

1. **SVG** (Scalable Vector Graphics)
   - Primary format for web
   - Infinitely scalable
   - Files: pursuit-logo-primary.svg, pursuit-logo-white.svg, pursuit-logo-blue.svg

2. **PNG** (Raster)
   - Sizes: 128px, 256px, 512px, 1024px
   - Transparent background
   - 72 DPI (web), 300 DPI (print)

3. **PDF** (Print)
   - Vector format for print vendors
   - CMYK color space

### Color Profiles

**Digital (Web/Screen):**

- Color space: sRGB
- Format: HEX, RGB

**Print:**

- Color space: CMYK
- Pursuit Blue CMYK: C100 M60 Y0 K20

---

## Brand Voice & Tone

**Voice Attributes:**

- Confident but approachable
- Professional but friendly
- Clear and direct
- Modern and progressive

**Tone Guidelines:**

- Use active voice
- Be concise and clear
- Avoid jargon
- Be helpful and supportive

**Example:**

- ❌ "Pursuit Bank provides banking services to customers."
- ✓ "We help you achieve your financial goals."

---

## Contact

**Brand Questions:**

- Email: brand@pursuit.bank
- Slack: #brand-guidelines

**File Requests:**

- Email: design@pursuit.bank
- Include: format needed, size, use case

---

**Document Owner:** Design Team
**Approved By:** Marketing Leadership
**Next Review:** 2026-11-16
