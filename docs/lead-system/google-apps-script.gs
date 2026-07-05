/**
 * RemotelyAvailable lead fulfillment WITHOUT n8n.
 * Runs entirely inside Google: the Sheet is the database, Gmail is the
 * sender. Free, no server, nothing to maintain.
 *
 * SETUP (10 minutes, one time):
 * 1. Create a Google Sheet. Rename the first tab to "Leads" and put these
 *    headers in row 1:  timestamp | name | email | source | painPoint | template
 * 2. In that Sheet: Extensions > Apps Script. Delete the sample code and
 *    paste this whole file.
 * 3. Set NOTIFY_EMAIL below to the inbox where you want lead alerts.
 * 4. Deploy > New deployment > type "Web app":
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    Authorize when prompted, then copy the Web app URL.
 * 5. Wherever the website is hosted, set the environment variable
 *      LEADS_WEBHOOK_URL = <that Web app URL>
 *    The site already POSTs every lead there. No code changes needed.
 * 6. Test: submit a form on the site. You should get a sheet row, the
 *    visitor gets the lead magnet email, and you get an alert email.
 *
 * The default email bodies below are short. Replace them with the full
 * copy from emails.md in this folder when you are ready.
 *
 * Gmail sending limits: ~100 recipients/day on a free Gmail account,
 * ~1500/day on Google Workspace. Each lead uses 2 (visitor + you).
 */

var NOTIFY_EMAIL = "hello@remotelyavailable.com";
var FROM_NAME = "Ali from RemotelyAvailable";
var SHEET_NAME = "Leads";

function doPost(e) {
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    var name = String(data.name || "there").slice(0, 80);
    var email = String(data.email || "").slice(0, 120);
    var source = String(data.source || "unknown").slice(0, 120);
    var painPoint = String(data.painPoint || "").slice(0, 60);

    if (!email || email.indexOf("@") === -1) {
      return respond({ ok: false, error: "invalid email" });
    }

    var t = pickTemplate(source, painPoint);

    // 1) Log the lead. The sheet is the single source of truth.
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    sheet.appendRow([new Date(), name, email, source, painPoint, t.key]);

    // 2) Send the visitor what they were promised.
    MailApp.sendEmail({
      to: email,
      subject: t.subject,
      htmlBody: t.body(firstName(name)),
      name: FROM_NAME,
    });

    // 3) Tell you, so you can follow up while the lead is warm.
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: "New lead: " + name + " (" + source + ")",
      htmlBody:
        "<p><b>" + name + "</b> &lt;" + email + "&gt;</p>" +
        "<p>Source: " + source +
        (painPoint ? "<br>Pain point: " + painPoint : "") +
        "</p><p>Template sent: " + t.key + "</p>" +
        "<p>Reply within a few hours for the best close rate.</p>",
      name: "Website Leads",
    });

    return respond({ ok: true });
  } catch (err) {
    return respond({ ok: false, error: String(err) });
  }
}

/** Same routing rules as docs/lead-system/README.md */
function pickTemplate(source, painPoint) {
  if (source.indexOf("location-page") === 0 || source.indexOf("location-hub") === 0) {
    return TEMPLATES.localAudit;
  }
  if (source === "website-lead-popup" && painPoint && TEMPLATES.pain[painPoint]) {
    return TEMPLATES.pain[painPoint];
  }
  return TEMPLATES.fiveAutomations; // safe default (slide-in toast, everything else)
}

function firstName(name) {
  return String(name).trim().split(/\s+/)[0] || "there";
}

function respond(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function wrap(inner) {
  return (
    '<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#222;max-width:560px">' +
    inner +
    "<p>Ali Ameen<br>RemotelyAvailable<br>" +
    '<a href="https://remotelyavailable.com">remotelyavailable.com</a></p></div>'
  );
}

function painTemplate(key, subject, line) {
  return {
    key: "pain-" + key,
    subject: subject,
    body: function (first) {
      return wrap(
        "<p>Hi " + first + ",</p>" +
        "<p>" + line + "</p>" +
        "<p>Here is the honest version: this is one of the easiest things to fix, and it usually pays for itself in the first month. I recorded exactly how we do it for clients.</p>" +
        "<p><b>Want it fixed for your business?</b> Reply to this email or book a free 30-minute call and I will map it out for you, no obligation.</p>"
      );
    },
  };
}

var TEMPLATES = {
  fiveAutomations: {
    key: "five-automations",
    subject: "The 5 automations that save our clients 20+ hours a week",
    body: function (first) {
      return wrap(
        "<p>Hi " + first + ",</p>" +
        "<p>As promised, here are the five automations we install most often, and what each one is worth:</p>" +
        "<ol>" +
        "<li><b>Missed-call rescue</b>: every missed call gets an instant text + email follow-up.</li>" +
        "<li><b>Enquiry auto-reply</b>: every form fill answered in under a minute, day or night.</li>" +
        "<li><b>Invoice chasing</b>: polite automatic reminders until it is paid.</li>" +
        "<li><b>Review collection</b>: happy customers asked for a Google review at the right moment.</li>" +
        "<li><b>Lead logging</b>: every lead from every channel in one place, nothing lost.</li>" +
        "</ol>" +
        "<p><b>Want any of these running in your business within 2 weeks?</b> Reply to this email or book a free 30-minute call.</p>"
      );
    },
  },
  localAudit: {
    key: "local-audit",
    subject: "Your free audit: 3 quick wins for your business",
    body: function (first) {
      return wrap(
        "<p>Hi " + first + ",</p>" +
        "<p>Thanks for requesting the audit. To make it specific to your business I need two things: your website address (if you have one) and the one task that eats most of your week.</p>" +
        "<p>Reply with those and within 48 hours you will get back three concrete fixes, ranked by impact, whether you work with us or not.</p>"
      );
    },
  },
  pain: {
    emails: painTemplate("emails", "Stop drowning in emails (your fix inside)", "You said email is eating your time. Most owners we work with lose 8 to 12 hours a week to it."),
    invoices: painTemplate("invoices", "Get invoices paid without chasing", "You said chasing invoices is the problem. Automatic polite reminders collect faster than you ever could manually, without souring the relationship."),
    "missed-calls": painTemplate("missed-calls", "Never lose a missed call again", "You said missed calls are costing you work. Around 60% of callers who hit voicemail simply call the next business."),
    content: painTemplate("content", "Consistent content without doing it yourself", "You said keeping up with content is the struggle. Consistency beats brilliance, and it can run without you."),
    leads: painTemplate("leads", "A steady lead flow, on autopilot", "You said lead flow is the problem. The fix is a system that captures, answers, and follows up with every enquiry automatically."),
    other: painTemplate("other", "Let's find your biggest time drain", "Whatever is eating your week, there is usually one bottleneck behind it, and it is almost never the one owners guess."),
  },
};
