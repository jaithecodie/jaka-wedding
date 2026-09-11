# Jayabharathi & Prithika — Neumorphic Wedding

Next.js 16 + React 19 wrapper for the finalized neumorphic wedding invitation.

## Stack

- Next.js 16.2.12
- React 19.2.4
- TypeScript
- App Router
- The finalized wedding experience is preserved as a static HTML experience under `public/wedding/index.html`.

## Run

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Couple animation

Replace:

```text
public/assets/couple.gif
```

with the final couple GIF. The invitation already contains a graceful fallback if the file is unavailable.

## Main files

```text
app/
  layout.tsx
  page.tsx
  globals.css

public/
  assets/
    couple.gif
  wedding/
    index.html
```

## Important

The invitation HTML intentionally keeps the finalized visual/interaction implementation intact so the Next.js version renders the same neumorphic design. The invitation itself uses its existing CDN-loaded font, Lucide, and confetti resources.

For a later full React component migration, the static sections can be split into:
`IntroOverlay`, `Navigation`, `Hero`, `EventCards`, `Countdown`, `RSVPModal`, and `Footer`.

# Next Requirements
1. Add To calendar is downloading the ICS file in Android and windows but It shouldn't instead it should open the calendar reminder and fill the datails.
2. Get Directions is not opening the MAPS in Android and iOS with the exact direction(Sri Umiya mahal, 4976+VJ7, pillayar kovil st, Uthukuli Rd, Palayakadu, Tiruppur, Tamil Nadu 641601).
3. On RSVP based on selecting the number of persons the na77777777s to be multiplied to get all their names, gender and Date of Arrival(only should show 10th & 11th of November to chose).
4. On Submitting the RSVP Submission intead of showing the confirmation page let's show the "A surprise is awaiting Please check your Pass and save it to redeem it" and show the Golden Ticket Pass UI seperate of each names and gender details in it which could be downloadable.
5. https://aspiresysinc-my.sharepoint.com/:x:/g/personal/jayabharathi_muthu_aspiresys_com/IQCmCEIpJLiNRaR6F8McnVCPAaY7X4IHiICDGCCSB-7hHuE?e=z6Iiez My Excel sheet is in above link (Has column names as Name, Gender, Date Of Arrival). My wedding website will be published using netlify. I want to get the RSVP submission data in the above excel. How to achieve it, as now it is deployed for local excel sheet where after deployment it is not accepting. Help me get the RSVP data's after published and submitted.
7. Countdown timing should be calculated to 11th November 2026 8:00 AM.
8. In iOS Mobile browser the screen is scrollable to the right and left where it is not fitting perfect. Also every time on click to open is clicked I want to show from the start of the page.
9. Nobody should be able to view the source code using inspect, or right click, or left click, or any other ways should be able to view using the browser/mobile/iOS/iOS web.
10. Scratch card reveal UI to be different design no need of like a strip lines. Also Once after Date revealing the counting time till "NOVEMBER 11 2026 9:30 AM" to be shown below the scratch card.