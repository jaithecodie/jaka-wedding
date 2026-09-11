# RSVP to SharePoint Excel setup

The invitation sends RSVP data to /.netlify/functions/rsvp. That Netlify
function forwards it to a Power Automate HTTP flow. The flow then adds one row
per guest to the SharePoint workbook. The Power Automate URL stays in a Netlify
environment variable, never in the browser source code.

## 1. Prepare the SharePoint workbook

1. Open the RSVP workbook from the SharePoint link in Excel for the web.
2. Save it as **.xlsx**. A deployed website cannot write to the local
   RSVP_Tracker.xls file on your computer.
3. Select the three columns and choose **Format as Table**. Give the table the
   name RSVP.
4. The table must contain exactly these column names:

   Name | Gender | Date Of Arrival

## 2. Create the Power Automate flow

1. In Power Automate, create an **Instant cloud flow** using **When an HTTP
   request is received** as the trigger.
2. In the trigger, paste this request-body schema:

~~~json
{
  "type": "object",
  "required": ["partyId", "partySize", "submittedAt", "guests"],
  "properties": {
    "partyId": { "type": "string" },
    "partySize": { "type": "integer" },
    "submittedAt": { "type": "string" },
    "guests": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["name", "gender", "arrivalDate"],
        "properties": {
          "name": { "type": "string" },
          "gender": { "type": "string" },
          "arrivalDate": { "type": "string" }
        }
      }
    }
  }
}
~~~

3. Add **Apply to each**, using guests from the trigger.
4. Inside the loop, add **Excel Online (Business) → Add a row into a table**.
   Select the SharePoint site, the workbook, and the RSVP table. Map:

   - Name → current item name
   - Gender → current item gender
   - Date Of Arrival → current item arrivalDate

5. After the loop, add a **Response** action with HTTP status 200 and save
   the flow. Copy its generated HTTP POST URL.

## 3. Connect the published Netlify site

1. In Netlify, open **Site configuration → Environment variables**.
2. Add this server-side variable:

   RSVP_POWER_AUTOMATE_WEBHOOK_URL = the HTTP POST URL copied from Power Automate.

3. Redeploy the site after saving the variable.

Do not put the Power Automate URL in index.html, README.md, or a
NEXT_PUBLIC_* variable. Anyone who has that URL could submit rows to the
workbook.

## 4. Verify before sharing the invitation

1. Submit a test RSVP with one guest for 2026-11-10.
2. Confirm that the RSVP page shows the Golden Pass.
3. In Power Automate, open the flow run history and confirm the run succeeded.
4. Open the SharePoint workbook and check that the RSVP table has the name,
   gender, and date.

If the site says RSVP is not configured, the Netlify environment variable is
missing or the site has not been redeployed. If it says it could not save the
RSVP, check the Power Automate run history and the selected Excel table.
