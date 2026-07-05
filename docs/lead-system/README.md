# Lead Fulfillment System

How every lead captured on the website gets stored, answered, and followed up, automatically. **No n8n required** — the default setup below runs entirely inside Google, for free.

## The short answer to "one SMTP or separate storage?"

**One sending address, one storage place, and they are not the same thing.**

- **Storage (single source of truth):** every lead from every form lands as one row in a single Google Sheet, tagged with a `source` column. You never dig through an inbox to find leads. You filter one sheet.
- **Sending (one Gmail account):** one email account sends all outgoing emails: the lead magnet the visitor was promised, and a notification to you. The inbox is only a notification channel, never the database.

## How the flow works end to end

```
Website form (any of them)
        |
        v
POST /api/leads  (already built, validates + rate limits)
  payload: { name, email, source, painPoint?, timestamp }
        |
        v
LEADS_WEBHOOK_URL  (your deployed Google Apps Script)
        |
        v
pickTemplate(): choose the right email
  - source starts with "slide-in"          -> "5 automations" email
  - source is "website-lead-popup"         -> pain-point fix email (6 variants)
  - source starts with "location-page"     -> local audit email
  - source starts with "location-hub"      -> local audit email
  - anything else                          -> "5 automations" email (safe default)
        |
        +--> Google Sheets: append row (timestamp, name, email, source, painPoint)
        +--> Gmail: lead magnet sent to the visitor
        +--> Gmail: "New lead" notification sent to you
        |
        v
Respond 200 to the website
```

Every form on the site already sends a distinct `source`:

| Source value                          | Where it comes from                        | Email they get       |
| ------------------------------------- | ----------------------------------------- | -------------------- |
| `website-lead-popup` + `painPoint`    | Two-step quiz popup                        | Pain-point fix email |
| `slide-in:/services/...`              | Corner toast                               | 5 automations email  |
| `location-page:{city}-{service}`      | Inline form on 450 service-in-city pages   | Local audit email    |
| `location-hub:{city}`                 | Inline form on 75 city pages               | Local audit email    |

## Setup (no n8n, ~10 minutes)

1. **Google Sheet**: create a sheet, rename the first tab to `Leads`, headers in row 1: `timestamp | name | email | source | painPoint | template`.
2. **Apps Script**: in that Sheet, go to Extensions → Apps Script, paste in `google-apps-script.gs` from this folder. Set `NOTIFY_EMAIL` at the top to your inbox.
3. **Deploy**: Deploy → New deployment → type "Web app" → Execute as **Me**, Who has access **Anyone** → Deploy. Authorize when prompted, then copy the Web app URL.
4. **Templates**: the script's default email bodies are short. Replace them with the full copy from `emails.md` in this folder when ready.
5. **Production env**: set `LEADS_WEBHOOK_URL=<that Web app URL>` wherever the site is deployed. Until this is set, leads only appear in the server console.
6. **Test**: submit each form once (popup, toast, one location form) and confirm three things: sheet row, visitor email, notification email.

Full step-by-step is also in the comment block at the top of `google-apps-script.gs`.

## Why not just email notifications to your inbox?

Because an inbox is where leads go to die. You cannot sort, count, or follow up reliably from an inbox. With one sheet you can see conversion by source (which of the 525 pages produce leads), by pain point (what to make YouTube videos about), and it plugs into any CRM later by exporting one CSV.

## Alternative: n8n

`LEADS_WEBHOOK_URL` just needs to accept a POST — it doesn't care what's behind it. If you'd rather run this in n8n instead of Apps Script (e.g. you already self-host n8n for other workflows), `n8n-lead-fulfillment.json` in this folder is an importable workflow that does the same job: Webhook → template router → Google Sheets append → two Email Send nodes. Attach SMTP/Gmail + Google Sheets credentials, then point `LEADS_WEBHOOK_URL` at the n8n webhook URL instead. This is optional — most people should just use the Apps Script above.

## Later upgrades (when volume justifies it)

- Swap Google Sheets for a real CRM (HubSpot free tier works with a webhook the same way).
- Add a 3-email nurture sequence: day 0 lead magnet, day 2 case study, day 5 "book a call".
- Push a WhatsApp notification to +923437242300 via the WhatsApp Business API instead of (or alongside) the notify email.
