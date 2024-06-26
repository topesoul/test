# Homevise - Home Improvement Made Easy

![Homevise Logo](assets/images/homevise-logo.webp)

## Overview

Homevise is a comprehensive web platform designed to connect homeowners with top-tier home improvement professionals. The platform provides a range of tools and resources to help plan and execute home renovation projects efficiently. This document outlines the project's structure, features, and development guidelines.

## Motivation

### Project Choice

The idea for Homevise emerged from my personal experience of finding it challenging to connect with reliable home improvement professionals. I recognized a gap in the market for a platform that not only facilitates these connections but also provides homeowners with the tools and resources to manage their home improvement projects effectively.

### Educational Context

This project is part of my milestone Project 2 in my coursework for the L5 Diploma in Web Application Development at Code Institute. The goal is to apply the knowledge and skills acquired during the course to a real-world project, demonstrating proficiency in web application development and user experience design.

## Strategy Plane

### Goals

- **For Homeowners**: Offer a platform for accessible, personalized home improvement advice and project planning.
- **For Professionals**: Provide a space to expand clientele, showcase work, and share expertise.

### Target Audience

- Homeowners seeking professional advice on home improvement.
- Home improvement professionals (interior designers, contractors, architects).

## Scope Plane

### Functional Requirements

- **User Registration and Profiles**: Separate registration for homeowners and professionals, with profile management features.
- **Professional Profiles and Consultation Booking**: Interactive UI for profile display and booking system.
- **DIY Guides**: Resource library for guides and tutorials.
- **Map Integration**: Helps users find professionals in their vicinity.
- **Image Slider and Testimonial Slideshow**: Enhances user engagement with visual elements.
- **Active Navigation Link and Hamburger Menu**: Improves navigation experience on the site.

### Content Requirements

- Detailed professional profiles including qualifications and specialties.
- DIY guides and tutorials.
- Real-time consultation scheduling.
- User testimonials and reviews.

## Structure Plane

### Site Map

1. **Home Page**: Introduction to Homevise, navigation to other sections, quick access to sign up or log in.
2. **Registration and Login**: Separate registration processes for homeowners and professionals, login page for returning users.
3. **Professional Profiles**: Display of professional qualifications, services, and portfolio.
4. **Consultation Booking**: Calendar-based booking system for consultations.
5. **DIY Guides**: Collection of DIY guides and tutorials.
6. **About Us**: Information about Homevise, its mission, and the team behind it.

## Skeleton Plane

The skeleton of the site is clean and user-focused. Attention is centered on content and interactions, with a layout that is both aesthetically pleasing and highly functional. The site uses a grid-based layout that adapts to different screen sizes and devices. The navigation bar is fixed at the top and collapses into a hamburger menu on smaller screens. The footer contains the social media links and the logo. Visual cues such as icons, buttons, and headings guide the user through the site.

### Wireframes

Below is a link to the initial draft of the wireframes created for the project, providing an initial conceptual idea of the structure and responsiveness across different devices.

[Homevise Project Wireframes](documentation/Homevise_wireframes.pdf)

## Surface Plane

Homevise uses a modern and clean aesthetic that conveys trust and professionalism. The visual design incorporates colors, typography, and imagery that resonate with the home improvement theme. Interactive elements and animations enhance the user experience without overwhelming it.

### Visual Design

- **Colors**: A consistent color scheme that aligns with the home improvement theme.
- **Typography**: Use of Google Fonts for a professional look.
- **Imagery**: High-quality images and icons relevant to home improvement.
- **Interactive Elements**: Buttons, forms, and navigation menus that respond to user interactions.

## User Stories

1. **As a User**, I want to understand the purpose of the web application immediately upon landing on the homepage, so that I know what services are offered.
2. **As a User**, I want to easily navigate to different sections of the web application from the homepage, so that I can find the information I need.
3. **As a User**, I want to search for home improvement professionals, so that I can find experts for my home projects.
4. **As a User**, I want to see detailed profiles of professionals, so that I can choose the right person for my project.
5. **As a User**, I want to register and log in, so that I can save my favorite professionals and access additional features.
6. **As a User**, I want to book consultations with professionals, so that I can discuss my home improvement needs in detail.
7. **As a User**, I want to read DIY guides, so that I can try home improvement projects on my own.
8. **As a User**, I want to view reviews from other users, so that I can make informed decisions about which professionals to hire.
9. **As a User**, I want to use the web application on any device, including smartphones and tablets, so that I can access the site from anywhere.

![Homevise Responsive Design](tests/responsiveness/homevise-responsiveness-image-multiple-devices.jpeg)

## Features

The project includes several key features aimed at providing a seamless user experience:

- **Responsive Design**: Ensures optimal browsing experience across all devices.
- **Responsive Navigation Bar**: Offers a frictionless navigation experience for a variety of devices.
- **Dynamic Footer**: Establishes a strong social media presence.
- **Professional Services**: Detailed overview of professional expertise.
- **Contact & Engagement**: Streamlined contact section designed to foster connections between users and professionals.
- **Captivating Hero Images**: Visual anchors that reflect the essence of home improvement services.
- **Map Integration**: Facilitates finding professionals in the user's vicinity.
- **Image Slider and Testimonial Slideshow**: Enhances user engagement with visual elements.
- **User Registration and Login**: Simulated experience using JavaScript for a seamless interaction.
- **Interactive Modals**: Used for promoting user interactions and providing feedback.
- **Form Validations**: Implemented with JavaScript to ensure data integrity.

## Technologies Used

- **HTML**: Used for the basic structure of the project.
- **CSS**: Used for styling the web pages.
- **JavaScript**: Used for interactive elements and form validations.
- **jQuery**: Simplifies DOM manipulation and event handling.
- **Font Awesome**: Provides icons for the navigation and social media links.
- **Swiper.js**: Implements the image slider functionality.
- **Leaflet.js**: Used for the map functionality in the search page.
- **Google Fonts**: Used for typography.
- **Flatpickr**: Provides enhanced date and time picker for booking consultations.
- **JSHint**: Used for validating JavaScript code.
- **W3C Markup Validator**: Used for validating HTML.
- **W3C CSS Validator**: Used for validating CSS.

### JSHint Validation

During the validation of `script.js` using JSHint, it identified five unused functions. However, this is not the case. These functions are self-invoking and encapsulate the scope within the script, ensuring modularity and preventing global namespace pollution. The warning can be safely ignored as the code operates correctly and adheres to best practices.

## Refactoring Details

### `consultation.js`

- **Improved Code Structure**: Enhanced readability and maintainability by using consistent formatting practices and template literals for dynamic HTML insertion.
- **Commenting**: Key sections are now clearly commented for future reference.
- **Flatpickr Initialization**: Settings are logically sequenced for better comprehension.

### `login.js`

- **Improved Readability**: Consistent use of whitespace and breakdown of complex conditionals into simpler blocks.

### `search.js`

- **Code Overhaul**: Improved readability and maintainability, detailed comments to clarify function purposes.
- **Data Fetching**: Structured path for professionals data ("assets/json/professionals.json").
- **Event Listeners**: Streamlined for input and search actions, enhancing user interaction.

### General Improvements

- **Modern JavaScript Syntax**: Transition to arrow functions and ES6+ features.
- **Optimized Event Handling**: Consolidation of event listeners for efficiency.

## Testing

Comprehensive testing was conducted to ensure all features perform as expected across different browsers and devices.

### Testing Summary

| Feature              | Expected Outcome                                 | Testing Performed           | Pass/Fail |
|----------------------|--------------------------------------------------|-----------------------------|-----------|
| Responsive Design    | Display correctly on mobile and desktop          | Resize browser              | Pass      |
| Professional Search  | Display results correctly and interact with map  | Search test                 | Pass      |
| Consultation Booking | Book consultations and validate form inputs      | Form submission test        | Pass      |
| DIY Guides           | Display guides and tutorials correctly           | Content review              | Pass      |
| User Authentication  | Secure login and registration                    | Login/Register test         | Pass      |
| Cross-Browser Testing| Functionality on Chrome, Safari, and Edge        | Open site on browsers       | Pass      |
| Map Integration      | Professionals displayed correctly on the map     | Location search test        | Pass      |
| Testimonial Slideshow| Display testimonials and slide correctly         | Interaction test            | Pass      |
| Image Slider         | Display images and slide correctly               | Interaction test            | Pass      |
| Active Navigation Link| Highlight correct active link                   | Navigation test             | Pass      |
| Hamburger Menu       | Expand/collapse correctly when triggered on mobile devices                       | Interaction test            | Pass      |

### Further Testing

- **Google Chrome Developer Tools**: Used to test responsiveness across devices.
- **W3C Markup Validator**: Ensured there were no syntax errors in the project.
- **W3C CSS Validator**: Ensured CSS code was error-free.
- **JSHint**: Validated JavaScript code for potential errors and ensured adherence to best practices.

### Known Issues and Fixes

- **Issue**: Hamburger menu was being covered by the map and search containers.
  - **Fix**: Adjusted the z-index of the navigation elements to ensure the menu stays above other content.
  - **Screenshot**: 
    ![Obstructed Hamburger Menu](tests/responsiveness/obstructed_hamburger_navigation_menu.png)
- **Issue**: Styling inconsistencies across different elements.
  - **Fix**: Unified button styles and adjusted padding/margin for consistent spacing.
  - **Screenshot**: 
    ![Footer Overlapping](tests/responsiveness/footer_overlapping_content.png)
- **Issue**: Search input suggestions were overflowing in mobile view.
  - **Fix**: Adjusted CSS to contain the suggestions within the viewport.
  - **Screenshot**: 
    ![Search Input Overflow](tests/responsiveness/search_input_suggestions_overflowing.png)
- **Issue**: The map popup details were crowded and not readable on smaller screens.
  - **Fix**: Adjusted CSS styles for the map popup to enhance readability.
  - **Screenshot**: 
    ![Crowded Map Popup Details](tests/responsiveness/crowded_map_popup_details.png.png)
- **Issue**: Testimonials section overflowed its container on small screens.
  - **Fix**: Adjusted the layout and CSS for the testimonials section to ensure it fits within its container.
  - **Screenshot**: 
    ![Testimonials Section Overflow](tests/responsiveness/testimonials_section_overflow.png.png)

## Deployment

### Deploying on GitHub Pages

1. Navigate to the repository on GitHub.
2. Click on the "Settings" tab.
3. Scroll down to the "GitHub Pages" section.
4. Select the "main" branch as the source and click "Save".
5. The website will be published at the URL displayed in the GitHub Pages section.

### Forking the Repository

1. Navigate to the repository on GitHub.
2. Click the "Fork" button at the top right.
3. The repository will be forked to your GitHub account.

### Cloning the Repository Locally

1. Navigate to the repository on GitHub.
2. Click the "Code" button and copy the URL.
3. Open a terminal and run `git clone <URL>`.

## Credits

### Code

- **Stack Overflow**: For troubleshooting various issues.
- **Font Awesome**: For providing icons used in the project.
- **Swiper.js**: For the image slider functionality.
- **Leaflet.js**: For the map functionality.
- **JSHint**: For validating JavaScript code.

### Content

- Content for the guides and professional listings was curated to provide valuable resources for homeowners.

### Media

- Images and avatars for the testimonial section were obtained from [Limitless Designs](https://limitlessdesigns.io/avatar-illustrations/?ref=engigogo).
- Other images used across the project are from [Pexels](https://pexels.com/).

## Acknowledgements

Special thanks to my mentor and Code Institute for the helpful and intense tutorship. Also, I would like to acknowledge online developer communities, my friends, and peers for their advice and encouragement throughout the development of the Homevise project.

[https://stackoverflow.com/](https://stackoverflow.com/)
[https://fontawesome.com/](https://fontawesome.com/)
[https://swiperjs.com/](https://swiperjs.com/)
[https://leafletjs.com/](https://leafletjs.com/)

## Additional Notes

### Erroneous Forking

While beginning the project, I mistakenly forked the example template from Code Institute instead of cloning it from [https://github.com/Code-Institute-Org/ci-full-template](https://github.com/Code-Institute-Org/ci-full-template). This is reflected in my project history as it contains initial commits based on the development of the template/environment many months before I began my project. Sadly, I only noticed this after seeing that my project appears to have contributors. By the time I realized this, I had already made significant progress in the milestone project and it was too late to start afresh with a new and clean repository free of contributor references.

## Future Development

There are several features planned for future development to enhance the functionality and user experience of Homevise:

- **Instant Quote Generation**: Allowing users to get quick estimates for their projects.
- **Community Forum**: Enabling users to share advice, ask questions, and discuss home improvement topics.
- **Enhanced User Profiles**: Including additional details and customization options for both homeowners and professionals.
- **Real-Time Video Consultation**: Secure video conferencing tool for consultations.