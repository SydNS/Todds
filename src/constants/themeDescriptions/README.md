# Shekhinah Toddler's Learning App Theme Guidelines

This directory contains theme descriptions and guidelines for creating visual assets for the Shekhinah Toddler's Learning App. These descriptions serve as creative direction for UI/UX designers, illustrators, and developers.

## Scene Descriptions

The `sceneDescriptions.js` file contains detailed descriptions of each scene/screen in the app. Each description includes:

- Title: The name of the scene
- Description: A detailed description of the visual elements and mood
- Primary Colors: A palette of colors that should be used for this scene
- Mood: Keywords describing the emotional tone of the scene

## Implementation Guidelines

### For Designers

1. **Consistency**: Maintain consistency with the overall app theme while respecting the unique characteristics of each scene.

2. **Cultural Relevance**: Ensure representations are authentic and culturally relevant to African children and contexts.

3. **Accessibility**:
   - Use high contrast for text and interactive elements
   - Ensure the dyslexia-friendly theme has options for specialized fonts and spacing
   - Make touch targets large enough for small children's hands

4. **Child-Friendly**:
   - Round corners, soft colors
   - Avoid small details that could be choking hazards in illustrations
   - Use friendly, approachable characters

### For Developers

1. **Theming Implementation**:
   - Use the theme constants defined in `src/constants/theme.js`
   - Scene-specific themes can be accessed via `THEMES.[sceneName]`
   - Use the dyslexia-friendly theme for accessibility options

2. **Responsive Design**:
   - Ensure all screens work well on different device sizes
   - Use the spacing system defined in `SIZES.spacing`

3. **Animation Guidelines**:
   - Keep animations smooth and not too rapid
   - Provide options to reduce motion for children with sensory sensitivities

## Scene List

1. **Splash Screen / Logo Scene** - The app's entry point
2. **Onboarding Background** - Introduction to the app's features
3. **Phonics Playground Theme** - Section for learning letter sounds
4. **StoryWorld Theme** - Section for interactive stories
5. **GameZone Theme** - Educational games section
6. **Rhyme & Rhythm Theme** - Musical learning activities
7. **Dashboard / Progress Screen** - Progress tracking for parents and children
8. **Dyslexia-friendly Theme Option** - Accessible alternative theme
9. **Multilingual Story Pack** - Language selection interface

## Color Palette Reference

The app uses a carefully selected palette of colors that are:

- Bright and engaging for children
- Accessible and high-contrast
- Culturally relevant
- Thematically appropriate for each section

Refer to `src/constants/theme.js` for the complete color system.

## Next Steps

1. Create mood boards for each scene
2. Develop character style guides
3. Design UI component variations for each theme
4. Implement theme switching functionality
5. Test with target user groups for feedback
