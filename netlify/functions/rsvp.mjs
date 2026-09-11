const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const allowedArrivalDates = new Set(["2026-11-10", "2026-11-11"]);

function json(body, status = 200) {
  return { statusCode: status, headers: { ...corsHeaders, "Content-Type": "application/json" }, body: JSON.stringify(body) };
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: corsHeaders, body: "" };
  if (event.httpMethod !== "POST") return json({ error: "Method not allowed" }, 405);

  const webhookUrl = process.env.RSVP_POWER_AUTOMATE_WEBHOOK_URL;
  if (!webhookUrl) return json({ error: "RSVP collection has not been configured." }, 503);

  try {
    const { guests } = JSON.parse(event.body || "{}");
    if (!Array.isArray(guests) || guests.length < 1 || guests.length > 10) return json({ error: "Invalid guest list." }, 400);

    const cleanedGuests = guests.map((guest) => ({
      name: typeof guest.name === "string" ? guest.name.trim().replace(/[\r\n\t]/g, " ") : "",
      gender: typeof guest.gender === "string" ? guest.gender.trim() : "",
      arrivalDate: typeof guest.arrivalDate === "string" ? guest.arrivalDate : "",
    }));
    if (cleanedGuests.some((guest) =>
      !guest.name ||
      guest.name.length > 100 ||
      !["Male", "Female", "Other"].includes(guest.gender) ||
      !allowedArrivalDates.has(guest.arrivalDate)
    )) {
      return json({ error: "Each guest needs a valid name, gender, and arrival date." }, 400);
    }

    const partyId = `JP-${Date.now().toString(36).toUpperCase()}`;
    const payload = { partyId, partySize: cleanedGuests.length, submittedAt: new Date().toISOString(), guests: cleanedGuests };
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`Flow returned ${response.status}`);
    return json({ ok: true, partyId, guests: cleanedGuests });
  } catch (error) {
    console.error("RSVP submission failed", error);
    return json({ error: "Unable to save RSVP." }, 502);
  }
}
