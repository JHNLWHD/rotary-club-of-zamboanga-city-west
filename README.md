# Rotary Club of Zamboanga City West Website

A modern, production-ready website for the Rotary Club of Zamboanga City West built with React Router 7 and integrated with Contentful CMS for dynamic content management.

## Features

- 🚀 **Pure Server-side rendering** with React Router 7 - No hydration issues
- ⚡️ Hot Module Replacement (HMR) for development
- 📦 Asset bundling and optimization
- 🔄 **Loader-based data fetching** for optimal SSR performance
- 🔒 TypeScript by default
- 🎨 **Chakra UI** for modern, accessible components
- 📖 [React Router docs](https://reactrouter.com/)
- 💻 Configured for deployment to Netlify
- 🎨 **Dynamic Content Management** with Contentful CMS
- 📝 **Rich Text Support** for project descriptions
- 🖼️ **Image Management** through Contentful
- ⚡ **Performance Optimization** with pure SSR
- 🔄 **Fallback System** for offline content
- 🛡️ **Type Safety** for all content models

## Architecture

This website uses a **pure SSR approach** for optimal performance and SEO:

- **No client-side hydration** - Eliminates hydration mismatches
- **Loader-based data fetching** - Data is fetched on the server before rendering
- **Fallback content system** - Graceful degradation when Contentful is unavailable
- **Static-first rendering** - Fast initial page loads with full content

## Contentful Integration

The website is fully integrated with Contentful CMS, allowing content editors to manage all homepage content without touching code. The integration includes:

### Content Models

The homepage uses a flexible content model system with individual content types that can be filtered for homepage display:

1. **Hero Section** (`homepageHero`) - Main headline and call-to-action
2. **Stats Section** (`homepageStats`) - Key statistics and achievements
3. **Service Areas** (`homepageServiceAreas`) - Rotary focus areas
4. **Service Projects** (`serviceProject`) - All projects with homepage section filtering
5. **Events** (`event`) - All events with homepage section filtering
6. **Officers** (`officers`) - All officers with homepage section filtering
7. **Contact** (`homepageContact`) - Meeting info and contact details
8. **FAQ** (`faq`) - All FAQ items with homepage section filtering

### Data Fetching Strategy

The website uses React Router 7's loader pattern for optimal SSR:

```typescript
// Server-side data fetching in route loaders
export async function loader() {
  const homepageData = await fetchAllHomepageSections();
  return { homepageData };
}

// Pure SSR component rendering
export default function Homepage() {
  const { homepageData } = useLoaderData();
  return <div>{/* Render with server data */}</div>;
}
```

### Rich Text Support

Project descriptions support rich text formatting including:
- Headings (H1-H6)
- Paragraphs with proper spacing
- Lists (ordered and unordered)
- Links with proper attributes
- Bold and italic text
- Blockquotes and code blocks

### Icon System

Flexible icon mapping system supporting:
- **Stats Icons**: Users, Target, DollarSign, Clock
- **Service Icons**: Heart, BookOpen, Globe, Leaf, Shield, Award
- **Contact Icons**: Calendar, MapPin, Phone, Mail
- **Social Icons**: Facebook, Instagram, Twitter, Linkedin, Youtube

## Getting Started

### Prerequisites

1. Node.js (v18 or higher)
2. npm or yarn
3. Contentful account (for content management)

### Installation

Install the dependencies:

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the root directory:

```env
# Contentful Configuration
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here
CONTENTFUL_ENVIRONMENT=master

# Optional: Contentful Preview API (for draft content)
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_access_token_here

# Site Configuration
SITE_URL=https://rotaryzcwest.org
SITE_NAME="Rotary Club of Zamboanga City West"
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## API Functions

The website includes streamlined API functions for fetching content:

### Core Functions

```typescript
// Fetch all homepage sections in parallel
fetchAllHomepageSections()

// Individual section functions
fetchHomepageHeroSection()
fetchHomepageStatisticsSection()
fetchHomepageServiceAreasSection()
fetchHomepageProjectHighlightsSection()
fetchHomepageEventsSection()
fetchHomepageTeamSection()
fetchHomepageContactSection()
fetchHomepageFAQSection()

// Featured content functions (for dedicated pages)
fetchFeaturedProjectHighlights()
fetchFeaturedEvents()
fetchFeaturedTeamMembers()
fetchFeaturedFAQs()
```

### Key Benefits

- **Simple API** - No complex caching logic
- **Predictable data flow** - Direct function calls
- **Error handling** - Graceful fallbacks for missing content
- **TypeScript support** - Full type safety

## Building for Production

Create a production build:

```bash
npm run build
```

## Previewing a Production build

To preview a production build locally, use the [Netlify CLI](https://cli.netlify.com):

```bash
npx netlify-cli serve
```

## Deployment

This template is preconfigured for deployment to Netlify.

Follow <https://docs.netlify.com/welcome/add-new-site/> to add this project as a site
in your Netlify account.

### Environment Variables for Production

Make sure to set the following environment variables in your Netlify deployment:

- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ACCESS_TOKEN`
- `CONTENTFUL_ENVIRONMENT`

## Performance Optimization

### SSR Benefits

- **Fast Time to First Byte (TTFB)** - Server renders complete HTML
- **SEO Optimized** - Full content available to crawlers
- **No Hydration Overhead** - Eliminates client-side JavaScript complexity
- **Reduced Bundle Size** - Minimal client-side JavaScript

### Image Optimization

- **Automatic resizing** through Contentful
- **WebP format** support
- **Responsive images** with multiple sizes
- **CDN delivery** for fast loading

## Error Handling

The system includes comprehensive error handling:

1. **API Errors** - Graceful fallback to static content
2. **Missing Content** - Fallback to default values
3. **Invalid Data** - Validation and sanitization
4. **Network Issues** - Automatic fallback to static data

## Content Management Workflow

### 1. Content Updates

1. Log into Contentful
2. Edit content in the appropriate section
3. Preview changes
4. Publish content
5. Changes appear on website immediately (SSR fetches fresh data)

### 2. Code Updates

1. Make changes to components
2. Test with Contentful data
3. Deploy to staging
4. Test with real content
5. Deploy to production

## Troubleshooting

### Common Issues

1. **Content not appearing**
   - Check if `isActive` is set to true
   - Verify content is published
   - Check server logs for API errors

2. **Images not loading**
   - Verify image assets are published
   - Check image URLs in browser dev tools
   - Ensure proper image format

3. **Rich text not rendering**
   - Check rich text content structure
   - Verify rich text renderer is working
   - Check for HTML encoding issues

4. **Environment variables not set**
   - Ensure all required env vars are set
   - Check `.env` file exists
   - Verify variable names are correct

### Debug Steps

1. **Check environment variables**
   ```bash
   echo $CONTENTFUL_SPACE_ID
   echo $CONTENTFUL_ACCESS_TOKEN
   ```

2. **Test API directly**
   ```javascript
   import { fetchHomepageHeroSection } from './lib/contentful-api';
   const hero = await fetchHomepageHeroSection();
   console.log(hero);
   ```

3. **Check server logs**
   - Look for Contentful API errors
   - Verify data fetching in loaders

## Security Considerations

1. **API Tokens** - Use read-only tokens for production
2. **Environment Separation** - Use different environments for staging/production
3. **Content Validation** - Validate user-generated content
4. **Access Control** - Limit Contentful access to authorized users

## Technical Stack

- **React Router 7** - Full-stack web framework
- **TypeScript** - Type safety and better developer experience
- **Chakra UI** - Modern, accessible component library
- **Contentful** - Headless CMS for content management
- **Lucide React** - Beautiful, customizable icons
- **Vite** - Fast build tool and development server

## Styling

This template uses [Chakra UI](https://chakra-ui.com/) for component styling with a custom theme that matches Rotary International's brand guidelines.

## See also

[Guide: how to deploy a React Router 7 site to Netlify](https://developers.netlify.com/guides/how-to-deploy-a-react-router-7-site-to-netlify/)

---

Built with ❤️ using React Router 7 and Contentful CMS.
