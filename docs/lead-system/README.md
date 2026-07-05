# Lead Fulfillment System

How every lead captured on the website gets stored, answered, and followed up, automatically.

> **No n8n? Use the Google Apps Script instead.** `google-apps-script.gs` in this
> folder does the whole job inside Google for free: leads land in your Sheet,
> the visitor gets the lead magnet from your Gmail, and you get an alert email.
> Setup steps are in the comments at the top of that file. You just point
> `N8N_LEAD_WEBHOOK_URL` at the deployed script URL; the website code does not
> change. Everything below still applies (same storage, same routing), n8n is
> only one of the two ways to run it.

## The short answer to "one SMTP or separate storage?"

**One sending address, one storage place, and they are not the same thing.**

- **Storage (single source of truth):** every lead from every form lands as one row in a single Google Sheet, tagged with a `source` column. You never dig through an inbox to find leads. You filter one sheet.
- **Sending (one SMTP/Gmail account):** one email account (e.g. `hello@remotelyavailable.com`) sends all outgoing emails: the lead magnet the visitor was promised, and a notification to you. The inbox is only a notification channel, never the database.

## How the flow works end to end

```
Website form (any of them)
        |
        v
POST /api/leads  (already built, validates + rate limits)
  payload: { name, email, source, painPoint?, timestamp }
        |
        v
n8n Webhook  (N8N_LEAD_WEBHOOK_URL)
        |
        v
Code node: pick the right email template
  - source starts with "slide-in"          -> "5 automations" email
  - source is "website-lead-popup"         -> pain-point fix email (6 variants)
  - source starts with "location-page"     -> local audit email
  - source starts with "location-hub"      -> local audit email
  - anything else                          -> "5 automations" email (safe default)
        |
        +--> Google Sheets: append row (timestamp, name, email, source, painPoint)
        +--> Email Send: lead magnet to the visitor (from hello@)
        +--> Email Send: "New lead" notification to you
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

## Setup (one time, ~20 minutes)

1. **Google Sheet**: create a sheet named `Leads` with headers: `timestamp | name | email | source | painPoint | template`.
2. **n8n**: import `n8n-lead-fulfillment.json` from this folder. Attach credentials:
   - SMTP (or Gmail) credential on both Email Send nodes
   - Google Sheets credential on the append node, and select your sheet
   - Set your notification address in the "Notify Ali" node
3. **Templates**: the Code node contains short default emails. Replace the bodies with the full copy from `emails.md` (paste as HTML, keep the placeholders).
4. **Production env**: set `N8N_LEAD_WEBHOOK_URL=https://YOUR-N8N-DOMAIN/webhook/lead-capture` wherever the site is deployed. Until this is set, leads only appear in the server console.
5. **Test**: submit each form once (popup, toast, one location form) and confirm three things: sheet row, visitor email, notification email.

## Why not just SMTP notifications to your inbox?

Because an inbox is where leads go to die. You cannot sort, count, or follow up reliably from an inbox. With one sheet you can see conversion by source (which of the 525 pages produce leads), by pain point (what to make YouTube videos about), and it plugs into any CRM later by exporting one CSV.

## Later upgrades (when volume justifies it)

- Swap Google Sheets for a real CRM (HubSpot free tier works with the same n8n flow).
- Add a 3-email nurture sequence: day 0 lead magnet, day 2 case study, day 5 "book a call".
- Push a WhatsApp notification to +923437242300 via the WhatsApp Business API node instead of (or alongside) the notify email.
