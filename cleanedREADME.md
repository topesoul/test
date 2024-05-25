# HomeVise - Home Improvement Made Easy

## Overview

HomeVise is a comprehensive web platform designed to connect homeowners with top-tier home improvement professionals. The platform provides a range of tools and resources to help plan and execute home renovation projects efficiently. This document outlines the project's structure, features, and development guidelines.

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
- **Real-Time Video Consultation**: Secure video conferencing tool for consultations.
- **Instant Quote Generation and DIY Guides**: Resource library for guides, tutorials, and cost estimation.
- **Community Forum**: Forum for user discussions and advice sharing.

### Content Requirements

- Detailed professional profiles.
- DIY guides and tutorials.
- Real-time consultation scheduling.
- User testimonials and reviews.

## Structure Plane

### Site Map

1. **Home Page**: Introduction to HomeVise, navigation to other sections, quick access to sign up or log in.
2. **Registration and Login**: Separate registration processes for homeowners and professionals, login page for returning users.
3. **Professional Profiles**: Display of professional qualifications, services, and portfolio.
4. **Consultation Booking**: Calendar-based booking system for consultations.
5. **Real-Time Video Consultation**: Integration of video conferencing tool.
6. **DIY Guides**: Collection of DIY guides and tutorials.
7. **Community Forum**: User discussions and advice sharing.
8. **About Us**: Information about HomeVise, its mission, and the team behind it.

## Skeleton Plane

The skeleton of the site is clean and user-focused. Attention is centered on content and interactions, with a layout that is both aesthetically pleasing and highly functional. The site uses a grid-based layout that adapts to different screen sizes and devices. The navigation bar is fixed at the top and collapses into a hamburger menu on smaller screens. The footer contains the social media links and the logo. Visual cues such as icons, buttons, and headings guide the user through the site.

### Wireframes

Below is a link to the initial draft of the wireframes created for the project, providing an initial conceptual idea of the structure and responsiveness across different devices.

[HomeVise Project Wireframes](documentation/homevise_wireframes.pdf)

## Surface Plane

HomeVise uses a modern and clean aesthetic that conveys trust and professionalism. The visual design incorporates colors, typography, and imagery that resonate with the home improvement theme. Interactive elements and animations enhance the user experience without overwhelming it.

### Visual Design

- **Colors**: A consistent color scheme that aligns with the home improvement theme.
- **Typography**: Use of Google Fonts for a professional look.
- **Imagery**: High-quality images and icons relevant to home improvement.
- **Interactive Elements**: Buttons, forms, and navigation menus that respond to user interactions.

## Features

The project includes several key features aimed at providing a seamless user experience:

- **Responsive Design**: Ensures optimal browsing experience across all devices.
- **Responsive Navigation Bar**: Offers a frictionless navigation experience for a variety of devices.
- **Dynamic Footer**: Establishes a strong social media presence.
- **Professional Services**: Detailed overview of professional expertise.
- **Contact & Engagement**: Streamlined contact section designed to foster connections between users and professionals.
- **Captivating Hero Images**: Visual anchors that reflect the essence of home improvement services.

![HomeVise Responsive Design](tests/responsiveness/homevise-responsiveness-image-multiple-devices.jpeg)

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

### JSHint Validation

During the validation of `script.js` using JSHint, it identified five unused functions. However, this is not the case. These functions are self-invoking and encapsulate the scope within the script, ensuring modularity and preventing global namespace pollution. The warning can be safely ignored as the code operates correctly and adheres to best practices.

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

- Images used in the project are sourced from Pexels and personal archives.

### Acknowledgements

Special thanks to my mentor and Code Institute for the helpful and intense tutorship. Also, I would like to acknowledge online developer communities, my friends, and peers for their advice and encouragement throughout the development of the HomeVise project.

[https://stackoverflow.com/](https://stackoverflow.com/)
[https://fontawesome.com/](https://fontawesome.com/)
[https://swiperjs.com/](https://swiperjs.com/)
[https://leafletjs.com/](https://leafletjs.com/)
