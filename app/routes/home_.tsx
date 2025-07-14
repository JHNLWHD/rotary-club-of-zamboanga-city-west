import { Box } from "@chakra-ui/react";
import { Users, Target, DollarSign, Clock } from "lucide-react";
import { HeroSection } from "../components/homepage/HeroSection";
import { StatsSection } from "../components/homepage/StatsSection";
import { ServiceAreasSection } from "../components/homepage/ServiceAreasSection";
import { ProjectHighlightsSection } from "../components/homepage/ProjectHighlightsSection";
import { EventsSection } from "../components/homepage/EventsSection";
import { TeamSection } from "../components/homepage/TeamSection";
import { ContactSection } from "../components/homepage/ContactSection";
import { FAQSection } from "../components/homepage/FAQSection";

export function meta() {
  return [
    { title: "Rotary Club of Zamboanga City West | Service Above Self" },
    { name: "description", content: "Join Rotary Club of Zamboanga City West in serving our community through meaningful projects. We focus on peacebuilding, education, healthcare, clean water, and community development. Service Above Self since 1979." },
    { name: "keywords", content: "Rotary Club, Zamboanga City, community service, volunteer, charity, Philippines, peacebuilding, education, healthcare, clean water, community development, service above self" },
    { name: "robots", content: "index, follow" },
    { name: "author", content: "Rotary Club of Zamboanga City West" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    
    // Open Graph tags
    { property: "og:title", content: "Rotary Club of Zamboanga City West | Service Above Self" },
    { property: "og:description", content: "Join Rotary Club of Zamboanga City West in serving our community through meaningful projects. We focus on peacebuilding, education, healthcare, clean water, and community development." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotaryzcwest.org" },
    { property: "og:image", content: "https://rotaryzcwest.org/og-image.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "Rotary Club of Zamboanga City West community service projects" },
    { property: "og:site_name", content: "Rotary Club of Zamboanga City West" },
    { property: "og:locale", content: "en_US" },
    
    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Rotary Club of Zamboanga City West | Service Above Self" },
    { name: "twitter:description", content: "Join Rotary Club of Zamboanga City West in serving our community through meaningful projects. Service Above Self since 1979." },
    { name: "twitter:image", content: "https://rotaryzcwest.org/og-image.jpg" },
    { name: "twitter:image:alt", content: "Rotary Club of Zamboanga City West community service projects" },
    
    // Additional SEO tags
    { name: "theme-color", content: "#005DAA" },
    { name: "msapplication-TileColor", content: "#005DAA" },
    { name: "geo.region", content: "PH-ZAM" },
    { name: "geo.placename", content: "Zamboanga City" },
    { name: "geo.position", content: "6.9214;122.0790" },
    { name: "ICBM", content: "6.9214, 122.0790" },
    
    // Canonical URL
    { rel: "canonical", href: "https://rotaryzcwest.org" },
  ];
}

// Data for the components
const statsData = [
  { 
    endValue: 85, 
    suffix: "+", 
    label: "Active Members", 
    icon: Users, 
    iconColor: "#3182CE", 
    bgGradient: "linear(to-br, blue.100, blue.200)", 
    borderColor: "blue.300", 
    duration: 2000
  },
  { 
    endValue: 120, 
    suffix: "+", 
    label: "Projects Completed", 
    icon: Target, 
    iconColor: "#38A169", 
    bgGradient: "linear(to-br, green.100, green.200)", 
    borderColor: "green.300", 
    duration: 2000
  },
  { 
    endValue: 5000000, 
    suffix: "+", 
    label: "Funds Raised", 
    icon: DollarSign, 
    iconColor: "#805AD5", 
    bgGradient: "linear(to-br, purple.100, purple.200)", 
    borderColor: "purple.300", 
    duration: 2000,
    formatValue: (count: number) => {
      if (count >= 1000000) {
        return `₱${(count / 1000000).toFixed(0)}M+`;
      }
      return `₱${count.toLocaleString()}+`;
    }
  },
  { 
    endValue: 45, 
    suffix: "+", 
    label: "Years of Service", 
    icon: Clock, 
    iconColor: "#DD6B20", 
    bgGradient: "linear(to-br, orange.100, orange.200)", 
    borderColor: "orange.300", 
    duration: 2000
  },
];

const serviceAreasData = [
  { 
    title: "Peacebuilding and Conflict Prevention", 
    desc: "Promoting peace and understanding in our community.", 
    icon: "/areas-of-focus/AOF_peace_color_no_title.png",
    color: "blue.500"
  },
  { 
    title: "Disease Prevention and Treatment", 
    desc: "Health outreach and medical assistance programs.", 
    icon: "/areas-of-focus/AOF_disease_color_no_title.png",
    color: "red.500"
  },
  { 
    title: "Water, Sanitation, and Hygiene", 
    desc: "Clean water and sanitation for all communities.", 
    icon: "/areas-of-focus/AOF_water_color_no_title.png",
    color: "cyan.500"
  },
  { 
    title: "Maternal and Child Health", 
    desc: "Supporting mothers and children's wellbeing.", 
    icon: "/areas-of-focus/AOF_maternal_color_no_title.png",
    color: "purple.500"
  },
  { 
    title: "Basic Education and Literacy", 
    desc: "Education programs and literacy initiatives.", 
    icon: "/areas-of-focus/AOF_education_color_no_title.png",
    color: "orange.500"
  },
  { 
    title: "Community Economic Development", 
    desc: "Empowering local livelihoods and economic growth.", 
    icon: "/areas-of-focus/AOF_economic_color_no_title.png",
    color: "teal.500"
  },
  { 
    title: "Supporting the Environment", 
    desc: "Environmental conservation and sustainability initiatives.", 
    icon: "/areas-of-focus/AOF_environment_color_no_title.png",
    color: "green.500"
  },
];

const projectHighlightsData = [
  {
    title: "Clean Water for Barangay Sta. Maria",
    shortDescription: "Installed a new water filtration system benefiting 500+ families.",
    description: `# Clean Water for Barangay Sta. Maria

Our club successfully implemented a comprehensive water filtration system in Barangay Sta. Maria, addressing the critical need for clean drinking water in this underserved community.

## Project Overview

This initiative was born from our community needs assessment, where we discovered that over 500 families in Barangay Sta. Maria were relying on unsafe water sources. Many residents were experiencing waterborne illnesses, particularly affecting children and the elderly.

## What We Accomplished

- **Water Filtration System Installation**: Installed a state-of-the-art filtration system capable of processing 10,000 liters of clean water daily
- **Community Training**: Conducted workshops for 50 community leaders on water system maintenance and hygiene practices
- **Health Impact**: Reduced waterborne illness cases by 80% within the first 6 months
- **Sustainability**: Established a community water committee to maintain the system

## Technical Specifications

The filtration system includes:
- Multi-stage filtration process
- UV sterilization technology
- Automatic backwash system
- Real-time water quality monitoring

## Community Impact

- **500+ families** now have access to clean drinking water
- **2,500+ individuals** directly benefited
- **80% reduction** in waterborne illnesses
- **Improved school attendance** among children

## Project Partners

- **Rotary Club of Zamboanga City West** - Project lead and funding
- **Barangay Sta. Maria Council** - Community coordination
- **Zamboanga City Water District** - Technical consultation
- **Local Health Department** - Health impact monitoring

## Project Timeline

- **Planning Phase**: January - March 2024
- **Implementation**: April - June 2024
- **Community Training**: July 2024
- **Monitoring & Evaluation**: Ongoing

## Sustainability

The project includes a comprehensive maintenance plan and community training to ensure long-term success. Local residents have been trained in system operation and basic maintenance, creating local ownership and sustainability.`,
    headerImage: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
    ],
    date: "2024-06-15",
    location: "Barangay Sta. Maria, Zamboanga City",
    partners: ["Barangay Sta. Maria Council", "Zamboanga City Water District", "Local Health Department"],
    facebookLink: "https://www.facebook.com/RCZCwest/posts/123456789",
  },
  {
    title: "Medical Mission 2024",
    shortDescription: "Free checkups and medicines for 1,200+ residents.",
    description: `# Medical Mission 2024

Our annual medical mission brought essential healthcare services to over 1,200 residents across multiple barangays in Zamboanga City, providing free consultations, medicines, and health education.

## Mission Overview

The 2024 Medical Mission was our largest healthcare initiative to date, serving communities that have limited access to medical care. Our team of volunteer doctors, nurses, and healthcare professionals provided comprehensive medical services over three days.

## Services Provided

### Primary Care Services
- **General Consultations**: 1,200+ patients received medical checkups
- **Pediatric Care**: Specialized care for 300+ children
- **Geriatric Care**: Dedicated services for elderly patients
- **Women's Health**: Gynecological consultations and screenings

### Specialized Services
- **Dental Care**: 500+ dental checkups and treatments
- **Eye Care**: Vision screenings and prescription glasses
- **Laboratory Tests**: Blood sugar, blood pressure, and basic lab work
- **Vaccinations**: Immunization programs for children and adults

### Health Education
- **Nutrition Workshops**: Healthy eating guidelines
- **Hygiene Education**: Personal and community hygiene practices
- **Disease Prevention**: Information on common illnesses
- **Family Planning**: Reproductive health education

## Impact Statistics

- **1,200+ patients** served
- **15 volunteer doctors** participated
- **25 volunteer nurses** and healthcare workers
- **₱500,000+** worth of medicines distributed
- **5 barangays** covered

## Medical Team

Our volunteer medical team included:
- **Dr. Maria Santos** - General Medicine
- **Dr. Juan Dela Cruz** - Pediatrics
- **Dr. Ana Rodriguez** - Internal Medicine
- **Dr. Carlos Lim** - Dentistry
- **Dr. Elena Tan** - Ophthalmology

## Community Partners

- **Zamboanga City Health Office** - Coordination and support
- **Local Barangay Councils** - Community mobilization
- **Philippine Medical Association** - Professional support
- **Local Pharmacies** - Medicine donations

## Patient Stories

### Maria, 45, Barangay San Roque
"Thank you, Rotary, for the free checkup and medicines. I couldn't afford to see a doctor, but now I know what's wrong and how to take care of myself."

### Juan, 8, Barangay Sta. Barbara
"The doctors were so kind to me. They gave me vitamins and taught me how to brush my teeth properly."

## Future Plans

Based on the success of this mission, we plan to:
- Establish regular mobile clinics
- Create a health monitoring system
- Develop partnerships with local hospitals
- Expand services to more remote areas

## Sustainability

The mission's impact extends beyond the three-day event through:
- Follow-up care coordination
- Health education materials distributed
- Community health worker training
- Ongoing health monitoring programs`,
    headerImage: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80"
    ],
    date: "2024-03-20",
    location: "Multiple Barangays, Zamboanga City",
    partners: ["Zamboanga City Health Office", "Philippine Medical Association", "Local Pharmacies"],
    facebookLink: "https://www.facebook.com/RCZCwest/posts/987654321",
  },
  {
    title: "School Supplies Drive",
    shortDescription: "Provided 1,000+ students with essential school kits.",
    description: `# School Supplies Drive 2024

Our annual School Supplies Drive ensures that underprivileged students have the essential tools they need to succeed in their education. This year, we provided complete school kits to over 1,000 students across 15 schools in Zamboanga City.

## Project Goals

- Provide essential school supplies to students in need
- Reduce barriers to education access
- Support academic success and attendance
- Promote educational equality

## What's Included in Each Kit

### Basic Supplies
- **Notebooks**: 5 notebooks of different sizes
- **Pens and Pencils**: 10 pens, 5 pencils, 2 erasers
- **Rulers and Compasses**: Geometry tools for math classes
- **Art Supplies**: Crayons, colored pencils, scissors, glue

### Organization Tools
- **School Bags**: Durable backpacks for carrying supplies
- **Pencil Cases**: To keep supplies organized
- **Folders**: For organizing papers and assignments

### Personal Care Items
- **Hygiene Kits**: Toothbrush, toothpaste, soap
- **Water Bottles**: Reusable bottles for staying hydrated

## Distribution Process

### School Selection
We partnered with the Department of Education to identify schools with the highest need:
- Schools in economically disadvantaged areas
- Schools with high dropout rates
- Schools serving indigenous communities

### Distribution Events
- **School Visits**: Our team visited each school personally
- **Student Registration**: Teachers helped identify students in need
- **Kit Assembly**: Volunteers assembled kits on-site
- **Distribution Day**: Students received their kits with smiles

## Impact by Numbers

- **1,000+ students** received complete school kits
- **15 schools** across Zamboanga City
- **25 barangays** served
- **₱300,000+** worth of supplies distributed
- **100%** of identified students served

## Student Stories

### Ana, Grade 3 Student
"I was so happy when I got my new school bag and supplies. Now I can do my homework properly and my teacher won't scold me for not having paper."

### Miguel, Grade 6 Student
"The art supplies are my favorite! I love drawing and now I have my own crayons and colored pencils."

## Community Support

### Volunteer Participation
- **50+ Rotary members** participated in kit assembly
- **30+ community volunteers** helped with distribution
- **15 teachers** assisted with student identification

### Donor Recognition
- **Local Businesses**: Office supply stores, bookstores
- **Individual Donors**: Club members and community supporters
- **Corporate Partners**: Companies providing bulk supplies

## Educational Impact

### Academic Performance
- **Improved attendance** among recipient students
- **Better homework completion** rates
- **Increased participation** in class activities
- **Enhanced creativity** through art supplies

### Long-term Benefits
- **Reduced financial burden** on families
- **Increased student confidence**
- **Better academic preparedness**
- **Promoted educational equality**

## Future Plans

Based on this year's success, we plan to:
- **Expand reach** to more schools
- **Include additional supplies** like calculators for older students
- **Establish ongoing support** programs
- **Partner with more donors** for sustainability

## Sustainability

The project's impact extends beyond the initial distribution:
- **Follow-up visits** to assess long-term impact
- **Teacher feedback** on student performance
- **Family engagement** in educational support
- **Ongoing needs assessment** for future drives`,
    headerImage: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
    ],
    date: "2024-05-15",
    location: "15 Schools across Zamboanga City",
    partners: ["Department of Education", "Local Office Supply Stores", "Community Volunteers"],
    facebookLink: "https://www.facebook.com/RCZCwest/posts/456789123",
  },
];

const eventsData = [
  {
    title: "Weekly Club Meeting",
    date: "Every Tuesday, 6:00 PM",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    desc: "Join us for fellowship and planning our next service project!",
  },
  {
    title: "District Conference",
    date: "July 15, 2024",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    desc: "Rotary District 3850 annual gathering for all clubs.",
  },
];

const teamData = [
  { name: "Reynald \"Rey\" Ariño", role: "PRESIDENT", designation: "MPHF" },
  { name: "PE Eliseo \"Totoh\" Hablo", role: "VICE PRESIDENT", designation: "MPHF" },
  { name: "PP Fernando \"Nanding\" Yu", role: "SECRETARY", designation: "RFMD" },
  { name: "PN Charliemagne \"Charles\" Tilos", role: "EXECUTIVE SECRETARY", designation: "PHF" },
  { name: "Rtn. Ramon \"Mon\" Azuelo", role: "TREASURER", designation: "PHF" },
  { name: "Rtn. Jonathan \"Nathan\" Lim", role: "AUDITOR", designation: "PHF" },
];

const faqsData = [
  { q: "How do I become a member?", a: "Visit our Membership page and fill out the application form." },
  { q: "When and where do you meet?", a: "Every Tuesday, 6:00 PM at Grand Astoria Hotel, Zamboanga City." },
  { q: "Can I volunteer without joining?", a: "Yes! Contact us to join our next service project as a volunteer." },
];

const meetingInfo = {
  day: "Every Tuesday",
  time: "6:00 PM - 8:00 PM",
  location: "Grand Astoria Hotel",
  address: "914 Mayor Jaldon Street\nZamboanga City, Philippines"
};

const contactInfo = {
  email: "rotaryzcwest@gmail.com",
  facebookUrl: "https://www.facebook.com/RCZCwest",
  facebookHandle: "@RCZCwest"
};

export default function Home() {
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Rotary Club of Zamboanga City West",
    "alternateName": "Rotary Zamboanga West",
    "url": "https://rotaryzcwest.org",
    "logo": "https://rotaryzcwest.org/logo.png",
    "description": "A service organization dedicated to community development, peacebuilding, education, healthcare, and humanitarian projects in Zamboanga City, Philippines.",
    "foundingDate": "1979",
    "memberOf": {
      "@type": "Organization",
      "name": "Rotary International",
      "url": "https://www.rotary.org"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Grand Astoria Hotel, 914 Mayor Jaldon Street",
      "addressLocality": "Zamboanga City",
      "addressRegion": "Zamboanga Peninsula",
      "addressCountry": "Philippines",
      "postalCode": "7000"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+63-926-430-4580",
      "email": "rotaryzcwest@gmail.com",
      "contactType": "General Inquiry"
    },
    "sameAs": [
      "https://www.facebook.com/RCZCwest"
    ],
    "areaServed": {
      "@type": "City",
      "name": "Zamboanga City",
      "addressCountry": "Philippines"
    },
    "knowsAbout": [
      "Community Development",
      "Peacebuilding",
      "Education",
      "Healthcare",
      "Clean Water Projects",
      "Humanitarian Aid"
    ]
  };

  return (
    <Box>
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <HeroSection 
        title="Service Above Self in Zamboanga City"
        subtitle="Rotary Club of Zamboanga City West"
        description="Dedicated to serving our community through meaningful projects that create lasting positive change in Zamboanga City and beyond."
        ctaText="Learn About Our Projects"
        ctaLink="/service-projects"
        backgroundImage="/rotary-zc-west.jpg"
      />

      {/* Stats Section */}
      <StatsSection stats={statsData} />

      {/* Service Areas Overview */}
      <ServiceAreasSection serviceAreas={serviceAreasData} />

      {/* Project Highlights / Success Stories */}
      <ProjectHighlightsSection 
        projects={projectHighlightsData} 
        viewAllLink="/service-projects"
      />

      {/* Events / News */}
      <EventsSection events={eventsData} />

      {/* Team Section */}
      <TeamSection team={teamData} />

      {/* Contact & Meeting Info */}
      <ContactSection 
        meetingInfo={meetingInfo}
        contactInfo={contactInfo}
      />

      {/* FAQ Section */}
      <FAQSection faqs={faqsData} />
    </Box>
  );
}
