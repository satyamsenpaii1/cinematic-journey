# Shanaya's Celestial Gift

I want to build a cinematic, interactive birthday experience for a very close friend named Sohini, who also goes by Shanaya.

This is NOT a generic birthday website and should NOT look like a birthday template.

The overall experience should feel:

- cinematic

- elegant

- minimal

- atmospheric

- intimate but not overly romantic

- playful in small moments

- soothing

- immersive

- timeless

IMPORTANT CREATIVE RULES:

- Do not use photographs.

- Do not use balloons, confetti, cartoon hearts, birthday stickers, or generic birthday graphics.

- Do not use excessive gradients.

- Do not make everything constantly animate.

- Do not make the design look like a wedding/romantic proposal website.

- Avoid cheesy motivational or romantic language.

- Avoid excessive UI elements.

- The experience should work beautifully on mobile first.

- Animations should feel slow, intentional and cinematic.

- Use whitespace and silence as part of the experience.

- The site should feel like one continuous journey rather than a collection of cards/pages.

TECHNICAL DIRECTION:

- React + TypeScript

- Tailwind CSS

- Motion for animations

- Component-based architecture

- Mobile-first responsive design

- Keep the code clean and easy to iterate on

- Prefer CSS/JS-generated visual effects over external image assets

- Optimize animations for mobile performance

- Respect prefers-reduced-motion

- Do not add unnecessary libraries unless they are genuinely needed

OVERALL STORY ARC (do not build all of this yet):

1. Mysterious opening

2. Realization that this was made specifically for Shanaya

3. How we met through Clash of Clans and later reconnected through Instagram

4. Our friendship through closeness, arguments, breaks and periods of silence

5. Things I know about Shanaya

6. What our connection is like without giving it a relationship label

7. A quiet imagined place where we could simply spend time together

8. Rajasthan → Kolkata and the distance between us

9. The scene gradually transforms into a cosmic environment

10. Earth → Moon → Sun

11. Final birthday message

FOR NOW, BUILD ONLY THE OPENING EXPERIENCE.

OPENING EXPERIENCE:

The initial screen should be almost completely dark.

It should feel like entering a quiet night sky rather than opening a birthday webpage.

Use a very subtle animated star field:

- sparse stars

- different sizes/opacities

- extremely slow movement

- subtle depth/parallax if possible

- no "sparkle explosion"

- no excessive particles

Initially there should be almost no text.

After a short atmospheric pause, reveal:

"For Shanaya."

Keep the typography elegant and restrained.

Then after another pause, reveal:

"There's something I wanted you to see."

The user should have to interact to continue.

Create a very subtle glowing point / minimal interaction affordance with something like:

"enter"

The interaction should feel like opening a door into another world, not clicking a normal website button.

When the user taps/clicks it:

- the stars should subtly respond

- the camera/visual field should feel like it is moving forward

- the darkness should gradually open

- transition smoothly into the next scene

The next scene should begin with:

"Wait..."

Then, after a short pause:

"Did Satyam actually make this?"

Do NOT make the "Satyam" line self-deprecating or imply that making the website was some kind of favor or sacrifice.

The tone should be playful and surprised.

After that, transition naturally toward the next section, which will eventually begin the story with:

"How did we get here?"

Do not build that next section yet. Leave a clean transition point for it.

VERY IMPORTANT:

The opening should NOT feel like a normal landing page.

There should be no navbar.

No menu.

No footer.

No hero-image.

No standard CTA button.

No card layout.

It should feel like a cinematic opening sequence.

Focus heavily on:

- typography

- timing

- subtle movement

- atmosphere

- transitions

- mobile touch interaction

Before adding additional sections, make this opening feel polished and visually impressive.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7f8d6838-34bc-4de2-8feb-2e7f21f639a7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
