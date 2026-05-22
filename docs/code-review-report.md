# Code Review Report

Date: 2026-05-13
Scope: Current workspace version of the Next.js app

## Summary

I found 2 high-confidence user-facing issues in the current version. Both are related to internal navigation using native anchor tags instead of Next.js client-side links, which causes avoidable full page reloads and breaks the expected SPA-style experience.

## Findings

### High: Internal navigation in the hero section bypasses Next.js routing

File: [components/sections/HeroSection.tsx](../components/sections/HeroSection.tsx#L42)

The module quick-links at the bottom of the hero use `<a href=...>` for internal routes such as `/adhesive-bonding` and `/welding`. In a Next.js app this forces a full document reload instead of client-side navigation.

Impact:
- Slower navigation between modules
- Loss of client state during route changes
- Inconsistent behavior compared with other cards on the home page, which already use `Link`

Recommended fix:
- Replace the internal anchors with `next/link`

### High: Home page quick-links use native anchors for internal app routes

File: [app/page.tsx](../app/page.tsx#L87)

The category footer quick-links also render internal navigation with `<a href=...>` for routes like `/adhesive-bonding/apps/...` and `/joining-forming/clinching`. These links will also trigger full reloads instead of Next.js client-side transitions.

Impact:
- Same SPA regression as above
- Users will see slower transitions and lose in-memory UI state when moving between content areas

Recommended fix:
- Use `Link` for internal routes and reserve `<a>` for external destinations only

## Validation

- No TypeScript or ESLint blockers were identified in the reviewed scope.
- The current version appears otherwise structurally consistent based on the targeted review of the routing and rendering entry points.

## Notes

- I did not find any broken route definitions for the verified quick-links; the issue is the navigation mechanism, not the destination paths.
- If you want, I can turn this report into a tracked remediation plan and patch the two navigation sites next.
