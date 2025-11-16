# Usage Analytics Setup (Placeholder)

> **Status**: 🚧 Design documentation - Not implemented
>
> This shows how usage analytics would be integrated when ready.

## Overview

Track SOP usage to identify:
- Most/least viewed SOPs
- Search patterns and success rates
- User journey bottlenecks
- Training effectiveness
- Quality improvement opportunities

## Recommended Analytics Stack

### Option 1: Privacy-Focused (Recommended)
**Plausible Analytics** - No cookies, GDPR compliant, lightweight
```html
<script defer data-domain="pursuit-sop.example.com"
        src="https://plausible.io/js/script.js"></script>
```

### Option 2: Full-Featured
**Google Analytics 4** - Comprehensive but requires cookie consent
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Option 3: Self-Hosted
**Matomo** - Full control, hosted on your infrastructure
```html
<script>
  var _paq = window._paq = window._paq || [];
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//analytics.pursuitbank.com/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '1']);
    var d=document, g=d.createElement('script'),
    s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js';
    s.parentNode.insertBefore(g,s);
  })();
</script>
```

## Key Metrics to Track

### Page Views & Engagement
```javascript
// Track SOP views
analytics.track('sop_viewed', {
  sop_id: 'sop-mf-003',
  sop_title: 'FHA Underwriting Standards',
  department: 'Mortgage Finance',
  user_role: 'Underwriter',
  time_spent: 180  // seconds
});

// Track section scrolls
analytics.track('sop_section_viewed', {
  sop_id: 'sop-mf-003',
  section: 'Credit Score Methodology',
  scroll_depth: 75  // percentage
});
```

### Search Analytics
```javascript
// Track searches
analytics.track('search_performed', {
  query: 'FHA credit requirements',
  results_count: 5,
  result_clicked: 'sop-mf-003',
  position: 1,  // Which result was clicked
  time_to_click: 3.2  // seconds
});

// Track search success
analytics.track('search_success', {
  query: 'wire transfer approval',
  found_answer: true,
  time_to_find: 45  // seconds
});
```

### User Journey
```javascript
// Track navigation patterns
analytics.track('navigation_path', {
  from_page: 'dashboard',
  to_page: 'sop-mf-003',
  navigation_type: 'search',  // search | link | bookmark | direct
  session_id: 'sess_12345'
});

// Track task completion
analytics.track('task_completed', {
  task: 'find_wire_transfer_limits',
  steps: 3,
  time_taken: 120,  // seconds
  successful: true
});
```

### Training & Certification
```javascript
// Track quiz performance
analytics.track('quiz_completed', {
  sop_id: 'sop-mf-003',
  quiz_id: 'quiz_fha_underwriting',
  score: 85,
  questions_total: 20,
  questions_correct: 17,
  time_taken: 420,  // seconds
  passed: true
});

// Track certification
analytics.track('certification_earned', {
  certification: 'FHA Underwriter',
  sops_completed: ['sop-mf-001', 'sop-mf-003', 'sop-mf-004'],
  total_time: 7200  // seconds
});
```

### AI Assistant Usage
```javascript
// Track RAG queries
analytics.track('ai_query', {
  query: 'What are FHA credit score requirements?',
  sources_retrieved: 3,
  response_time: 1.2,  // seconds
  helpful: true,  // User feedback
  follow_up_queries: 2
});

// Track generated content usage
analytics.track('ai_content_used', {
  content_type: 'procedure',
  action: 'copied',  // copied | saved | shared
  user_role: 'SOP_OWNER'
});
```

### Document Quality
```javascript
// Track feedback
analytics.track('sop_feedback', {
  sop_id: 'sop-mf-003',
  rating: 5,
  feedback_type: 'helpful',  // helpful | outdated | unclear | error
  comment: 'Clear credit score examples'
});

// Track reported issues
analytics.track('issue_reported', {
  sop_id: 'sop-mf-003',
  issue_type: 'broken_link',
  section: 'References',
  severity: 'low'
});
```

## Dashboard Metrics Example

```javascript
// Example analytics dashboard data structure
const analyticsSnapshot = {
  period: "last_30_days",

  overview: {
    total_views: 8432,
    unique_users: 247,
    avg_session_duration: 420,  // seconds
    bounce_rate: 12.3  // percentage
  },

  top_sops: [
    {
      id: "sop-mf-003",
      title: "FHA Underwriting Standards",
      views: 1247,
      avg_time: 540,
      satisfaction: 4.7
    },
    {
      id: "sop-mf-005",
      title: "Wire Transfer Security",
      views: 982,
      avg_time: 380,
      satisfaction: 4.9
    }
  ],

  search_insights: {
    total_searches: 1823,
    success_rate: 78.5,  // percentage
    avg_time_to_answer: 45,  // seconds
    top_queries: [
      { query: "FHA credit requirements", count: 89 },
      { query: "wire transfer limits", count: 67 },
      { query: "underwriting decision matrix", count: 54 }
    ],
    failed_searches: [
      { query: "cryptocurrency policy", count: 12 },  // No results
      { query: "remote work procedures", count: 8 }
    ]
  },

  user_engagement: {
    returning_users: 183,
    new_users: 64,
    avg_sops_per_session: 2.3,
    certification_completion_rate: 67.8  // percentage
  },

  quality_metrics: {
    avg_satisfaction: 4.6,
    issues_reported: 23,
    avg_resolution_time: 2.3,  // days
    outdated_sops: 5
  },

  ai_assistant: {
    total_queries: 456,
    avg_response_time: 1.4,  // seconds
    helpfulness_rate: 84.2,  // percentage
    top_topics: [
      { topic: "Credit requirements", count: 78 },
      { topic: "Approval workflows", count: 56 }
    ]
  }
};
```

## Privacy & Compliance Considerations

### Data Collection Policy
```javascript
// Only collect what's necessary
const allowedData = {
  page_views: true,
  search_queries: true,  // Anonymized
  user_role: true,       // Role only, no PII
  department: true,
  timing_metrics: true,
  satisfaction_scores: true,

  // Never collect:
  user_names: false,
  email_addresses: false,
  ip_addresses: false,
  specific_loan_details: false,
  customer_information: false
};
```

### GDPR Compliance
- No cookies for basic analytics (use Plausible)
- Anonymize user identifiers
- Data retention: 13 months
- User opt-out mechanism
- Data export on request

### Implementation
```html
<!-- Add to all public HTML pages before </head> -->
<script>
  // Privacy-first analytics placeholder
  window.analytics = {
    track: function(event, properties) {
      // When implemented, this will send to analytics service
      console.log('[Analytics]', event, properties);

      // For now, just log to console in dev
      if (window.location.hostname === 'localhost') {
        return;
      }

      // Production implementation would go here
      // fetch('/api/analytics/track', {
      //   method: 'POST',
      //   body: JSON.stringify({ event, properties })
      // });
    }
  };

  // Track page view on load
  window.addEventListener('load', function() {
    analytics.track('page_view', {
      path: window.location.pathname,
      title: document.title,
      referrer: document.referrer
    });
  });
</script>
```

## Quick Start (When Ready to Implement)

1. **Choose analytics provider** (Plausible recommended)
2. **Sign up and get tracking code**
3. **Add tracking code to `public/components/global-nav.html`**
4. **Configure custom events** in key pages (search, AI assistant, training)
5. **Set up dashboard** with key metrics
6. **Review after 30 days** and optimize

## Cost Estimate

| Provider | Cost | Features |
|----------|------|----------|
| **Plausible** | $9-19/month | Privacy-focused, no cookies, simple |
| **Google Analytics** | Free | Comprehensive, requires cookie consent |
| **Matomo Cloud** | $23-59/month | Self-hosted option, full control |

**Recommendation**: Start with Plausible ($9/month) for simplicity and privacy compliance.

## Example Reports

### Weekly SOP Performance Report
```
📊 SOP System - Weekly Report (Nov 10-16, 2025)

📈 Highlights:
  • Total views: 1,847 (+12% vs last week)
  • Unique users: 89 (+5%)
  • Avg. session: 7.2 minutes
  • Search success: 82% (+3%)

🏆 Top SOPs:
  1. FHA Underwriting (327 views)
  2. Wire Transfer Security (289 views)
  3. Clear to Close (234 views)

🔍 Search Trends:
  • "credit requirements" trending up
  • "wire limits" most searched
  • "AUS processing" new popular query

⚠️ Action Items:
  • Update SOP-MF-002 (high bounce rate)
  • Add FAQ for "credit requirements"
  • Review 5 "outdated" flagged SOPs
```

## Implementation Checklist

- [ ] Choose analytics provider
- [ ] Add tracking code to global navigation
- [ ] Configure custom events for:
  - [ ] SOP views
  - [ ] Search queries
  - [ ] AI assistant usage
  - [ ] Training completion
  - [ ] Feedback submissions
- [ ] Set up automated reports
- [ ] Create analytics dashboard
- [ ] Train team on insights
- [ ] Review monthly and optimize

**Estimated effort**: 1-2 days initial setup, 2 hours/month ongoing
