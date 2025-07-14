import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Stack,
  Link,
  Input,
  Textarea,
  useBreakpointValue,
  VStack,
  Button,
} from "@chakra-ui/react";
import { HeroCarousel } from "../components/homepage/HeroCarousel";
import { Users, Handshake, Heart, Clock, DollarSign, Award, Target, Globe } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Custom hook for counting animation
function useCountUp(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(easeOutQuart * (end - start) + start);
            
            setCount(currentCount);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, start, hasAnimated]);

  return { count, ref };
}

// Animated Stat Component
function AnimatedStat({ 
  endValue, 
  suffix = "", 
  label, 
  icon: Icon, 
  iconColor, 
  bgGradient, 
  borderColor, 
  duration = 2000,
  formatValue
}: {
  endValue: number;
  suffix?: string;
  label: string;
  icon: any;
  iconColor: string;
  bgGradient: string;
  borderColor: string;
  duration?: number;
  formatValue?: (count: number) => string;
}) {
  const { count, ref } = useCountUp(endValue, duration);

  const displayValue = formatValue ? formatValue(count) : `${count.toLocaleString()}${suffix}`;

  return (
    <Box 
      ref={ref}
      bg="white" 
      borderRadius="2xl" 
      p={8} 
      boxShadow="0 4px 20px rgba(0,0,0,0.08)"
      border="1px solid"
      borderColor="gray.100"
      textAlign="center"
      _hover={{ 
        transform: "translateY(-4px)", 
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        borderColor: `${borderColor.split('.')[0]}.200`
      }}
      transition="all 0.3s ease"
      position="relative"
      overflow="hidden"
    >
      <Box 
        bgGradient={bgGradient}
        borderRadius="full" 
        w={16} 
        h={16} 
        display="flex" 
        alignItems="center" 
        justifyContent="center" 
        mx="auto" 
        mb={4}
        border="3px solid"
        borderColor={borderColor}
        _hover={{ transform: "scale(1.1)" }}
        transition="transform 0.2s"
      >
        <Icon size={32} color={iconColor} />
      </Box>
      <Heading as="h3" fontSize="3xl" color="brand.500" mb={2} fontWeight="bold">
        {displayValue}
      </Heading>
      <Text color="gray.700" fontWeight="medium" fontSize="md">
        {label}
      </Text>
    </Box>
  );
}

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

function ButtonLink({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: any }) {
  return (
    <Link
      href={href}
      bg="brand.500"
      color="white"
      fontWeight="bold"
      px={6}
      py={3}
      borderRadius="md"
      _hover={{ bg: "brand.700" }}
      style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}
      {...props}
    >
      {children}
    </Link>
  );
}

const impactStats = [
  { label: "Members", value: "85+", icon: "https://img.icons8.com/ios-filled/50/005DAA/group-foreground-selected.png" },
  { label: "Projects Completed", value: "120+", icon: "https://img.icons8.com/ios-filled/50/005DAA/task-completed.png" },
  { label: "Funds Raised", value: "₱5M+", icon: "https://img.icons8.com/ios-filled/50/005DAA/money-bag.png" },
  { label: "Years of Service", value: "45", icon: "https://img.icons8.com/ios-filled/50/005DAA/clock--v1.png" },
];

const serviceAreas = [
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

const projectHighlights: Project[] = [
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
];

const popularProjects: Project[] = [
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
  {
    title: "Feeding Program",
    shortDescription: "Weekly meals for undernourished children in local barangays.",
    description: `# Weekly Feeding Program

Our ongoing feeding program provides nutritious meals to undernourished children in local barangays, addressing food insecurity and promoting healthy development among vulnerable youth.

## Program Overview

The Weekly Feeding Program operates year-round, serving hot, nutritious meals to children who may not have access to regular, healthy food. Our program focuses on both immediate hunger relief and long-term nutritional education.

## Weekly Schedule

### Monday - Friday
- **Breakfast Program**: 7:00 AM - 8:00 AM
- **Lunch Program**: 12:00 PM - 1:00 PM
- **Afternoon Snack**: 3:00 PM - 4:00 PM

### Weekend Program
- **Saturday Brunch**: 10:00 AM - 11:00 AM
- **Sunday Family Meal**: 12:00 PM - 1:00 PM

## Nutritional Focus

### Balanced Meals
Each meal includes:
- **Protein**: Fish, chicken, eggs, or beans
- **Carbohydrates**: Rice, bread, or root vegetables
- **Vegetables**: Fresh local vegetables
- **Fruits**: Seasonal fruits for vitamins
- **Dairy**: Milk or yogurt when available

### Special Dietary Needs
- **Allergy-friendly options** for children with food sensitivities
- **Cultural considerations** for diverse communities
- **Age-appropriate portions** for different age groups

## Program Locations

### Primary Sites
- **Barangay Sta. Maria Community Center**
- **Barangay San Roque Elementary School**
- **Barangay Sta. Barbara Health Center**
- **Barangay Talon-Talon Community Hall**

### Mobile Units
- **Mobile kitchen** for remote areas
- **Home delivery** for children unable to travel
- **Emergency response** for disaster-affected areas

## Impact Statistics

### Weekly Reach
- **500+ children** served weekly
- **1,500+ meals** provided per week
- **5 barangays** covered
- **25+ volunteers** involved

### Long-term Impact
- **Improved nutrition** among participants
- **Better school attendance** and performance
- **Reduced malnutrition** cases
- **Enhanced community health**

## Volunteer Program

### Kitchen Volunteers
- **Food preparation** and cooking
- **Meal planning** and nutrition guidance
- **Kitchen management** and safety
- **Food safety** and hygiene practices

### Distribution Volunteers
- **Meal serving** and portion control
- **Community outreach** and registration
- **Health monitoring** and follow-up
- **Educational activities** with children

## Community Partnerships

### Local Partners
- **Barangay Councils**: Venue and community coordination
- **Local Farmers**: Fresh produce supply
- **Fish Vendors**: Fresh fish donations
- **Bakery Owners**: Bread and pastry donations

### Government Support
- **Department of Social Welfare**: Program coordination
- **Department of Health**: Nutritional guidelines
- **Local Health Centers**: Health monitoring

## Success Stories

### Maria, Age 8
"Before the feeding program, I often went to school hungry. Now I have breakfast every morning and I can concentrate better in class."

### Juan, Age 6
"I love the fruits they give us! My mom says I'm growing stronger and healthier."

## Educational Component

### Nutrition Education
- **Healthy eating habits** workshops
- **Food preparation** demonstrations
- **Garden planting** activities
- **Hygiene practices** training

### Life Skills
- **Basic cooking** skills for older children
- **Food safety** and storage education
- **Budget planning** for families
- **Community gardening** projects

## Monitoring and Evaluation

### Health Monitoring
- **Regular weight** and height measurements
- **Nutritional status** assessments
- **Health check-ups** for participants
- **Family health** education sessions

### Program Evaluation
- **Attendance tracking** and analysis
- **Feedback collection** from families
- **Impact assessment** on school performance
- **Community satisfaction** surveys

## Future Expansion

### Planned Improvements
- **Additional locations** in underserved areas
- **Weekend family** meal programs
- **Nutrition education** for parents
- **Sustainable food** sourcing partnerships

### Long-term Goals
- **Reduce malnutrition** rates by 50%
- **Improve school attendance** by 30%
- **Establish community** gardens
- **Create sustainable** food security programs`,
    headerImage: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
    ],
    date: "2024-01-01",
    location: "Multiple Barangays, Zamboanga City",
    partners: ["Department of Social Welfare", "Local Farmers", "Community Volunteers"],
    facebookLink: "https://www.facebook.com/RCZCwest/posts/789123456",
  },
  {
    title: "Tree Planting",
    shortDescription: "Planted 2,000+ trees for a greener Zamboanga.",
    description: `# Tree Planting Initiative 2024

Our comprehensive tree planting initiative aims to create a greener, more sustainable Zamboanga City by planting 2,000+ trees across strategic locations, contributing to environmental conservation and climate change mitigation.

## Project Overview

The Tree Planting Initiative is a multi-year program designed to increase urban forest cover, improve air quality, and create more livable communities in Zamboanga City. Our approach combines environmental science with community engagement.

## Tree Species Selection

### Native Species
- **Narra (Pterocarpus indicus)**: National tree, excellent shade provider
- **Mahogany (Swietenia macrophylla)**: Fast-growing, valuable timber
- **Acacia (Acacia mangium)**: Nitrogen-fixing, soil improvement
- **Mango (Mangifera indica)**: Fruit-bearing, community benefit

### Ornamental Trees
- **Fire Tree (Delonix regia)**: Beautiful flowering tree
- **Golden Shower (Cassia fistula)**: Yellow flowers, drought-resistant
- **Rain Tree (Samanea saman)**: Large canopy, excellent shade

## Planting Locations

### Urban Areas
- **City Parks**: Paseo del Mar, Plaza Pershing
- **School Grounds**: 20+ public schools
- **Government Buildings**: City Hall, Barangay Halls
- **Roadside Areas**: Major thoroughfares and highways

### Rural Areas
- **Watershed Areas**: Pasonanca Natural Park
- **Agricultural Lands**: Community farms
- **Coastal Areas**: Mangrove restoration sites
- **Hillside Areas**: Erosion control sites

## Planting Process

### Site Preparation
- **Soil Analysis**: Testing for pH, nutrients, and drainage
- **Site Clearing**: Removing debris and preparing planting holes
- **Irrigation Setup**: Ensuring water access for new trees
- **Protection Measures**: Installing tree guards and supports

### Planting Techniques
- **Proper Hole Size**: 2-3 times root ball diameter
- **Root Care**: Untangling and spreading roots properly
- **Soil Amendment**: Adding organic matter and nutrients
- **Mulching**: Applying mulch to retain moisture

### Post-Planting Care
- **Regular Watering**: First 2 years of establishment
- **Pruning**: Shaping and removing damaged branches
- **Fertilization**: Annual nutrient application
- **Pest Management**: Monitoring and treatment as needed

## Community Involvement

### Volunteer Participation
- **2,000+ volunteers** participated in planting events
- **50+ organizations** partnered in the initiative
- **15 barangays** actively involved
- **Schools and universities** participated in educational programs

### Educational Programs
- **Tree Care Workshops**: Teaching proper maintenance
- **Environmental Education**: Climate change and biodiversity
- **Youth Programs**: Engaging young people in conservation
- **Community Training**: Sustainable forestry practices

## Environmental Impact

### Carbon Sequestration
- **Estimated 100+ tons** of CO2 absorbed annually
- **Long-term carbon storage** in tree biomass
- **Climate change mitigation** contribution
- **Carbon footprint reduction** for the city

### Biodiversity Enhancement
- **Habitat creation** for local wildlife
- **Bird nesting sites** and food sources
- **Insect diversity** increase
- **Ecosystem services** improvement

### Air Quality Improvement
- **Particulate matter** filtration
- **Oxygen production** increase
- **Temperature regulation** through shade
- **Wind protection** and erosion control

## Monitoring and Maintenance

### Growth Monitoring
- **Quarterly measurements** of tree height and diameter
- **Survival rate** tracking and analysis
- **Health assessments** and treatment plans
- **Growth rate** comparison with projections

### Maintenance Schedule
- **Monthly inspections** for new plantings
- **Quarterly maintenance** for established trees
- **Annual pruning** and shaping
- **Emergency response** for storm damage

## Success Metrics

### Quantitative Results
- **2,000+ trees** successfully planted
- **95% survival rate** after first year
- **15+ locations** covered across the city
- **50+ species** of trees planted

### Qualitative Impact
- **Improved community** aesthetics
- **Enhanced recreational** spaces
- **Increased property** values
- **Better mental health** through green spaces

## Future Plans

### Expansion Goals
- **5,000 trees** by 2025
- **Additional species** introduction
- **More locations** in underserved areas
- **International partnerships** for best practices

### Sustainability Measures
- **Community ownership** of planted trees
- **Local nursery** development
- **Seed collection** and propagation
- **Educational curriculum** integration

## Recognition and Awards

- **Environmental Excellence Award** from DENR
- **Community Service Recognition** from City Government
- **Best Practice Award** from Rotary International
- **Media Coverage** in local and national outlets`,
    headerImage: "https://images.unsplash.com/photo-1465101178521-c1a9136a3fd8?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1465101178521-c1a9136a3fd8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80"
    ],
    date: "2024-04-22",
    location: "Multiple locations across Zamboanga City",
    partners: ["Department of Environment and Natural Resources", "City Government", "Local Schools"],
    facebookLink: "https://www.facebook.com/RCZCwest/posts/321654987",
  },
];

const events = [
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

const team = [
  { name: "Reynald \"Rey\" Ariño", role: "PRESIDENT", designation: "MPHF" },
  { name: "PE Eliseo \"Totoh\" Hablo", role: "VICE PRESIDENT", designation: "MPHF" },
  { name: "PP Fernando \"Nanding\" Yu", role: "SECRETARY", designation: "RFMD" },
  { name: "PN Charliemagne \"Charles\" Tilos", role: "EXECUTIVE SECRETARY", designation: "PHF" },
  { name: "Rtn. Ramon \"Mon\" Azuelo", role: "TREASURER", designation: "PHF" },
  { name: "Rtn. Jonathan \"Nathan\" Lim", role: "AUDITOR", designation: "PHF" },
];

const faqs = [
  { q: "How do I become a member?", a: "Visit our Membership page and fill out the application form." },
  { q: "When and where do you meet?", a: "Every Tuesday, 6:00 PM at Grand Astoria Hotel, Zamboanga City." },
  { q: "Can I volunteer without joining?", a: "Yes! Contact us to join our next service project as a volunteer." },
];

const testimonials = [
  { quote: "Rotary changed my life and my community.", name: "Carlos, Member" },
  { quote: "The projects really help our barangay!", name: "Liza, Beneficiary" },
];

const news = [
  {
    title: "Rotary Club Donates Books to Local Schools",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80",
    desc: "Over 500 books distributed to promote literacy.",
  },
  {
    title: "Medical Mission Reaches 1,200 Residents",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    desc: "Free checkups and medicines provided by club volunteers.",
  },
  {
    title: "Tree Planting for a Greener City",
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3fd8?auto=format&fit=crop&w=800&q=80",
    desc: "2,000+ trees planted in partnership with local youth.",
  },
];

const gallery = [
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3fd8?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80",
];

// Project data structure
interface Project {
  title: string;
  shortDescription: string;
  description: string;
  headerImage: string;
  gallery: string[];
  date: string;
  location: string;
  partners: string[];
  facebookLink: string;
}

export default function Home() {
  const heroImgSize = useBreakpointValue({ base: "100%", md: "80%" });
  
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
      <Box 
        as="section" 
        position="relative" 
        overflow="hidden" 
        pt={{ base: "140px", md: "160px" }}
        pb={{ base: 8, md: 12 }}
        minH={{ base: "600px", md: "700px" }}
        backgroundImage="url('/rotary-zc-west.jpg')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        w="100vw"
        maxW="100vw"
        px={0}
        m={0}
      >
        {/* Enhanced Overlay with Gradient */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="linear-gradient(135deg, rgba(0,93,170,0.8) 0%, rgba(0,0,0,0.6) 100%)"
          zIndex={1}
        />
        
        <Box px={{ base: 4, md: 16 }} position="relative" zIndex={2} w="100%">
          <Flex direction={{ base: "column", lg: "row" }} align="center" gap={{ base: 6, lg: 8 }} minH={{ base: "400px", md: "500px" }} w="100%">
            <Box flex={1} maxW={{ base: "100%", lg: "52%" }} pr={{ base: 0, lg: 4 }} w="100%">
              <Text 
                fontSize="sm" 
                fontWeight="bold" 
                color="white" 
                letterSpacing="wider" 
                textTransform="uppercase"
                mb={3}
                textShadow="0 2px 4px rgba(0,0,0,0.5)"
                opacity={0.9}
              >
                Rotary Club of Zamboanga City West
              </Text>
              <Heading 
                as="h1" 
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} 
                fontWeight="bold" 
                lineHeight="shorter"
                color="white"
                mb={6}
                textShadow="0 2px 4px rgba(0,0,0,0.7)"
                letterSpacing="tight"
              >
                Service Above Self in Zamboanga City
              </Heading>
              <Text 
                fontSize={{ base: "md", md: "lg" }} 
                color="gray.100" 
                mb={8} 
                lineHeight="relaxed"
                maxW={{ base: "100%", md: "480px" }}
                textShadow="0 1px 3px rgba(0,0,0,0.7)"
                opacity={0.95}
              >
                Dedicated to serving our community through meaningful projects that create lasting positive change in Zamboanga City and beyond.
              </Text>
              
              <Flex direction={{ base: "column", sm: "row" }} gap={4} mb={8} justify="flex-start" w="100%">
                <Link
                  href="/service-projects"
                  bg="brand.500"
                  color="white"
                  fontWeight="bold"
                  px={8}
                  py={4}
                  borderRadius="md"
                  _hover={{ 
                    bg: "brand.600", 
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 25px rgba(0,93,170,0.3)"
                  }}
                  style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}
                  transition="all 0.3s ease"
                  boxShadow="0 4px 15px rgba(0,93,170,0.2)"
                  fontSize="md"
                  w={{ base: "100%", sm: "auto" }}
                >
                  Learn About Our Projects
                </Link>
              </Flex>
              
              {/* Enhanced Stats or Icons */}
              <Flex gap={6} align="center" mt={2} w="100%">
                <Box color="gold.400" _hover={{ transform: "scale(1.1)" }} transition="transform 0.2s">
                  <Users size={28} />
                </Box>
                <Box color="gold.400" _hover={{ transform: "scale(1.1)" }} transition="transform 0.2s">
                  <Handshake size={28} />
                </Box>
                <Box color="gold.400" _hover={{ transform: "scale(1.1)" }} transition="transform 0.2s">
                  <Heart size={28} />
                </Box>
                <Text fontSize="sm" color="gray.200" ml={2} fontWeight="medium" textShadow="0 1px 2px rgba(0,0,0,0.7)">
                  Service Above Self
                </Text>
              </Flex>
            </Box>
            
            <Box 
              flex={1} 
              display="flex" 
              justifyContent="center" 
              alignItems="center" 
              position="relative"
              maxW={{ base: "100%", lg: "48%" }}
              w="100%"
            >
              <HeroCarousel />
            </Box>
          </Flex>
        </Box>
      </Box>

      {/* Stats Section */}
      <Box as="section" py={20} bgGradient="linear(to-b, gray.50, white)" id="stats">
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={8}>
            <AnimatedStat 
              endValue={85} 
              suffix="+" 
              label="Active Members" 
              icon={Users} 
              iconColor="#3182CE" 
              bgGradient="linear(to-br, blue.100, blue.200)" 
              borderColor="blue.300" 
              duration={2000}
            />
            <AnimatedStat 
              endValue={120} 
              suffix="+" 
              label="Projects Completed" 
              icon={Target} 
              iconColor="#38A169" 
              bgGradient="linear(to-br, green.100, green.200)" 
              borderColor="green.300" 
              duration={2000}
            />
            <AnimatedStat 
              endValue={5000000} 
              suffix="+" 
              label="Funds Raised" 
              icon={DollarSign} 
              iconColor="#805AD5" 
              bgGradient="linear(to-br, purple.100, purple.200)" 
              borderColor="purple.300" 
              duration={2000}
              formatValue={(count) => {
                if (count >= 1000000) {
                  return `₱${(count / 1000000).toFixed(0)}M+`;
                }
                return `₱${count.toLocaleString()}+`;
              }}
            />
            <AnimatedStat 
              endValue={45} 
              suffix="+" 
              label="Years of Service" 
              icon={Clock} 
              iconColor="#DD6B20" 
              bgGradient="linear(to-br, orange.100, orange.200)" 
              borderColor="orange.300" 
              duration={2000}
            />
          </SimpleGrid>
        </Box>
      </Box>

      {/* Service Areas Overview */}
      <Box as="section" py={20} maxW="1200px" mx="auto" px={{ base: 4, md: 8 }} id="focus-areas">
        {/* Section Header */}
        <Box textAlign="center" mb={16}>
          <Text 
            fontSize="sm" 
            fontWeight="bold" 
            color="brand.500" 
            letterSpacing="wider" 
            textTransform="uppercase"
            mb={2}
          >
            Rotary's Areas of Focus
          </Text>
          <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} color="gray.900" fontWeight="bold" mb={4}>
            ROTARY'S AREAS OF FOCUS
          </Heading>
          <Text 
            fontSize={{ base: "md", md: "lg" }} 
            color="gray.600" 
            maxW="600px" 
            mx="auto" 
            lineHeight="relaxed"
          >
            Our seven areas of focus guide our service projects and help us create lasting positive change in communities around the world.
          </Text>
        </Box>

        <Box>
          <SimpleGrid columns={{ base: 2, sm: 2, md: 3 }} gap={8}>
            {serviceAreas.slice(0, 6).map((area) => (
              <Box 
                key={area.title} 
                textAlign="center" 
                _hover={{ transform: "translateY(-8px)" }} 
                transition="all 0.3s ease"
              >
                {/* Enhanced Circular Icon Container */}
                <Box 
                  borderRadius="full" 
                  w={{ base: "120px", md: "140px", lg: "160px" }}
                  h={{ base: "120px", md: "140px", lg: "160px" }}
                  display="flex" 
                  alignItems="center" 
                  justifyContent="center" 
                  mx="auto" 
                  mb={4}
                  bg="white"
                  border="4px solid"
                  borderColor={area.color}
                  boxShadow="0 8px 25px rgba(0,0,0,0.1)"
                  _hover={{ 
                    transform: "scale(1.05)", 
                    boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
                    borderColor: `${area.color.split('.')[0]}.600`
                  }}
                  transition="all 0.3s ease"
                  position="relative"
                  overflow="hidden"
                >
                  <Image 
                    src={area.icon} 
                    alt={`${area.title} - Rotary service area in Zamboanga City`} 
                    boxSize={{ base: "60px", md: "70px", lg: "80px" }}
                    objectFit="contain"
                    onError={(e) => { 
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/80"; 
                    }} 
                  />
                </Box>
                
                {/* Title and Description */}
                <Box maxW="200px" mx="auto">
                  <Heading as="h3" size={{ base: "sm", md: "md" }} color="gray.900" mb={2} fontWeight="bold" lineHeight="shorter">
                    {area.title}
                  </Heading>
                  <Text color="gray.600" fontSize={{ base: "xs", md: "sm" }} lineHeight="relaxed" mb={3}>
                    {area.desc}
                  </Text>
                  <Link 
                    href="/service-projects" 
                    color={area.color} 
                    fontWeight="bold" 
                    _hover={{ textDecoration: "underline", color: `${area.color.split('.')[0]}.600` }}
                    fontSize="xs"
                  >
                    Learn More →
                  </Link>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
          
          {/* Centered 7th item */}
          {serviceAreas.length > 6 && (
            <Flex justify="center" mt={8}>
              <Box 
                textAlign="center" 
                _hover={{ transform: "translateY(-8px)" }} 
                transition="all 0.3s ease"
              >
                {/* Enhanced Circular Icon Container */}
                <Box 
                  borderRadius="full" 
                  w={{ base: "120px", md: "140px", lg: "160px" }}
                  h={{ base: "120px", md: "140px", lg: "160px" }}
                  display="flex" 
                  alignItems="center" 
                  justifyContent="center" 
                  mx="auto" 
                  mb={4}
                  bg="white"
                  border="4px solid"
                  borderColor={serviceAreas[6].color}
                  boxShadow="0 8px 25px rgba(0,0,0,0.1)"
                  _hover={{ 
                    transform: "scale(1.05)", 
                    boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
                    borderColor: `${serviceAreas[6].color.split('.')[0]}.600`
                  }}
                  transition="all 0.3s ease"
                  position="relative"
                  overflow="hidden"
                >
                  <Image 
                    src={serviceAreas[6].icon} 
                    alt={`${serviceAreas[6].title} - Rotary service area in Zamboanga City`} 
                    boxSize={{ base: "60px", md: "70px", lg: "80px" }}
                    objectFit="contain"
                    onError={(e) => { 
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/80"; 
                    }} 
                  />
                </Box>
                
                {/* Title and Description */}
                <Box maxW="200px" mx="auto">
                  <Heading as="h3" size={{ base: "sm", md: "md" }} color="gray.900" mb={2} fontWeight="bold" lineHeight="shorter">
                    {serviceAreas[6].title}
                  </Heading>
                  <Text color="gray.600" fontSize={{ base: "xs", md: "sm" }} lineHeight="relaxed" mb={3}>
                    {serviceAreas[6].desc}
                  </Text>
                  <Link 
                    href="/service-projects" 
                    color={serviceAreas[6].color} 
                    fontWeight="bold" 
                    _hover={{ textDecoration: "underline", color: `${serviceAreas[6].color.split('.')[0]}.600` }}
                    fontSize="xs"
                  >
                    Learn More →
                  </Link>
                </Box>
              </Box>
            </Flex>
          )}
        </Box>
      </Box>

      {/* Project Highlights / Success Stories */}
      <Box as="section" py={20} bgGradient="linear(to-b, gray.50, white)" id="projects">
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          {/* Section Header */}
          <Box textAlign="center" mb={16}>
            <Text 
              fontSize="sm" 
              fontWeight="bold" 
              color="brand.500" 
              letterSpacing="wider" 
              textTransform="uppercase"
              mb={2}
            >
              Success Stories
            </Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} color="gray.900" fontWeight="bold" mb={4}>
              Project Highlights
            </Heading>
            <Text 
              fontSize={{ base: "md", md: "lg" }} 
              color="gray.600" 
              maxW="600px" 
              mx="auto" 
              lineHeight="relaxed"
            >
              Discover the transformative impact of our community projects and the lives we've touched together.
            </Text>
          </Box>

          {/* 3-Column Project Cards */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
            {projectHighlights.slice(0, 3).map((proj, idx) => (
              <Box 
                as="article"
                key={proj.title}
                bg="white" 
                borderRadius="2xl" 
                boxShadow="0 8px 25px rgba(0,0,0,0.08)"
                overflow="hidden"
                _hover={{ 
                  boxShadow: "0 12px 35px rgba(0,0,0,0.12)", 
                  transform: "translateY(-8px)" 
                }}
                transition="all 0.3s ease"
                border="1px solid"
                borderColor="gray.100"
                height="100%"
                display="flex"
                flexDirection="column"
              >
                {/* Image Section */}
                <Box position="relative" flexShrink={0}>
                  <Image
                    src={proj.headerImage}
                    alt={`${proj.title} - Community service project in Zamboanga City`}
                    width="100%"
                    height="200px"
                    objectFit="cover"
                    onError={(e) => { 
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x200?text=Project+Image"; 
                    }}
                  />
                  <Box 
                    position="absolute" 
                    top={4} 
                    left={4} 
                    bgGradient="linear(to-r, brand.500, brand.600)"
                    color="white" 
                    px={3} 
                    py={1} 
                    borderRadius="full" 
                    fontSize="xs" 
                    fontWeight="bold"
                    boxShadow="0 4px 15px rgba(0,93,170,0.3)"
                  >
                    Featured
                  </Box>
                </Box>
                
                {/* Content Section */}
                <Box p={6} flex="1" display="flex" flexDirection="column">
                  <Heading as="h3" fontSize="lg" color="gray.900" mb={3} fontWeight="bold" lineHeight="shorter">
                    {proj.title}
                  </Heading>
                  <Text color="gray.600" mb={4} fontSize="sm" lineHeight="relaxed" flex="1">
                    {proj.shortDescription}
                  </Text>
                  
                  {/* Project Details */}
                  <VStack align="start" gap={2} mb={4}>
                    <Flex align="center" gap={2} fontSize="xs" color="gray.500">
                      <Box as="span">📅</Box>
                      <Text>{new Date(proj.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</Text>
                    </Flex>
                    <Flex align="center" gap={2} fontSize="xs" color="gray.500">
                      <Box as="span">📍</Box>
                      <Text>{proj.location}</Text>
                    </Flex>
                    {proj.partners && proj.partners.length > 0 && (
                      <Flex align="center" gap={2} fontSize="xs" color="gray.500">
                        <Box as="span">🤝</Box>
                        <Text>{proj.partners.length} partner{proj.partners.length > 1 ? 's' : ''}</Text>
                      </Flex>
                    )}
                  </VStack>

                  <ButtonLink 
                    href="/service-projects"
                    bgGradient="linear(to-r, brand.500, brand.600)"
                    color="white"
                    _hover={{ 
                      bgGradient: "linear(to-r, brand.600, brand.700)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(0,93,170,0.3)"
                    }}
                    borderRadius="lg"
                    px={6}
                    py={3}
                    fontSize="sm"
                    fontWeight="bold"
                    alignSelf="flex-start"
                    aria-label={`Learn more about ${proj.title} project`}
                    transition="all 0.3s ease"
                    boxShadow="0 4px 15px rgba(0,93,170,0.2)"
                    mt="auto"
                  >
                    Learn More
                  </ButtonLink>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
          
          {/* View All Projects Button */}
          <Box textAlign="center" mt={12}>
            <ButtonLink 
              href="/service-projects"
              bgGradient="linear(to-r, brand.500, brand.600)"
              color="white"
              _hover={{ 
                bgGradient: "linear(to-r, brand.600, brand.700)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(0,93,170,0.3)"
              }}
              borderRadius="lg"
              px={8}
              py={4}
              fontSize="md"
              fontWeight="bold"
              aria-label="View all our service projects"
              transition="all 0.3s ease"
              boxShadow="0 4px 15px rgba(0,93,170,0.2)"
            >
              View All Projects
            </ButtonLink>
          </Box>
        </Box>
      </Box>

      {/* Events / News */}
      <Box as="section" py={20} bgGradient="linear(to-b, gray.50, white)" id="events">
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          {/* Section Header */}
          <Box textAlign="center" mb={16}>
            <Text 
              fontSize="sm" 
              fontWeight="bold" 
              color="brand.500" 
              letterSpacing="wider" 
              textTransform="uppercase"
              mb={2}
            >
              Events & Meetings
            </Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} color="gray.900" fontWeight="bold" mb={4}>
              Ready to Join Our Latest Upcoming Events
            </Heading>
            <Text 
              fontSize={{ base: "md", md: "lg" }} 
              color="gray.600" 
              maxW="600px" 
              mx="auto" 
              lineHeight="relaxed"
            >
              Stay connected with our community through regular meetings and special events that bring Rotarians together.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
            {events.map((event, idx) => (
              <Box 
                as="article"
                key={event.title} 
                bg="white" 
                borderRadius="2xl" 
                boxShadow="0 8px 25px rgba(0,0,0,0.08)"
                overflow="hidden"
                border="1px solid"
                borderColor="gray.100"
                _hover={{ 
                  boxShadow: "0 12px 35px rgba(0,0,0,0.12)", 
                  transform: "translateY(-4px)" 
                }}
                transition="all 0.3s ease"
              >
                <Box position="relative">
                  <Image 
                    src={event.image} 
                    alt={`${event.title} - Rotary event in Zamboanga City`}
                    width="100%" 
                    height="240px" 
                    objectFit="cover" 
                    onError={(e) => { 
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/500x240?text=Event+Image"; 
                    }} 
                  />
                  <Box 
                    position="absolute" 
                    bottom={4} 
                    left={4} 
                    bgGradient="linear(to-r, brand.500, brand.600)"
                    color="white" 
                    px={4} 
                    py={2} 
                    borderRadius="full" 
                    fontSize="sm" 
                    fontWeight="bold"
                    boxShadow="0 4px 15px rgba(0,93,170,0.3)"
                  >
                    <time dateTime={event.date}>{event.date}</time>
                  </Box>
                </Box>
                
                <Box p={6}>
                  <Heading as="h3" fontSize="xl" color="gray.900" mb={3} fontWeight="bold" lineHeight="shorter">
                    {event.title}
                  </Heading>
                  <Text color="gray.600" mb={6} lineHeight="relaxed">
                    {event.desc}
                  </Text>
                  
                  <Flex justify="space-between" align="center">
                    <ButtonLink 
                      href="/about/calendar"
                      bgGradient="linear(to-r, brand.500, brand.600)"
                      color="white"
                      _hover={{ 
                        bgGradient: "linear(to-r, brand.600, brand.700)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(0,93,170,0.3)"
                      }}
                      borderRadius="lg"
                      px={6}
                      py={3}
                      fontSize="sm"
                      fontWeight="bold"
                      aria-label={`Learn more about ${event.title}`}
                      transition="all 0.3s ease"
                      boxShadow="0 4px 15px rgba(0,93,170,0.2)"
                    >
                      Learn More
                    </ButtonLink>
                    <Text fontSize="sm" color="gray.500" fontWeight="medium">
                      📅 <time dateTime={event.date}>{event.date}</time>
                    </Text>
                  </Flex>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      {/* Team Section */}
      <Box as="section" py={20} bg="white" id="team">
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          {/* Section Header */}
          <Box textAlign="center" mb={16}>
            <Text 
              fontSize="sm" 
              fontWeight="bold" 
              color="brand.500" 
              letterSpacing="wider" 
              textTransform="uppercase"
              mb={2}
            >
              Leadership Team
            </Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} color="gray.900" fontWeight="bold" mb={4}>
              Meet The Team Behind Their Success Story
            </Heading>
            <Text 
              fontSize={{ base: "md", md: "lg" }} 
              color="gray.600" 
              maxW="600px" 
              mx="auto" 
              lineHeight="relaxed"
            >
              Our dedicated leaders work tirelessly to make our community initiatives successful and impactful.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 2, md: 3 }} gap={8}>
            {team.map((member) => (
              <Box 
                as="article"
                key={member.name} 
                textAlign="center" 
                bg="white" 
                borderRadius="2xl" 
                p={6}
                _hover={{ 
                  bg: "gray.50", 
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)", 
                  transform: "translateY(-4px)" 
                }}
                transition="all 0.3s ease"
                border="1px solid"
                borderColor="gray.100"
                boxShadow="0 4px 15px rgba(0,0,0,0.05)"
              >
                <Box position="relative" mb={4}>
                  <Box 
                    borderRadius="full" 
                    boxSize="100px" 
                    mx="auto" 
                    border="4px solid"
                    borderColor="brand.500"
                    bgGradient="linear(to-br, gray.100, gray.200)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    _hover={{ transform: "scale(1.05)" }}
                    transition="transform 0.2s"
                  >
                    <Users size={40} color="#005DAA" />
                  </Box>
                </Box>
                <Heading as="h3" fontSize="lg" color="gray.900" fontWeight="bold" mb={1} lineHeight="shorter">
                  {member.name}
                </Heading>
                <Text color="brand.500" fontWeight="bold" fontSize="sm" mb={1}>
                  {member.role}
                </Text>
                {member.designation && (
                  <Text color="gray.600" fontWeight="medium" fontSize="xs">
                    {member.designation}
                  </Text>
                )}
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      {/* Contact & Meeting Info */}
      <Box as="section" py={20} bgGradient="linear(to-b, gray.50, white)" id="contact">
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          {/* Section Header */}
          <Box textAlign="center" mb={16}>
            <Text 
              fontSize="sm" 
              fontWeight="bold" 
              color="brand.500" 
              letterSpacing="wider" 
              textTransform="uppercase"
              mb={2}
            >
              Contact Us
            </Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} color="gray.900" fontWeight="bold" mb={4}>
              Get in Touch with Us
            </Heading>
            <Text 
              fontSize={{ base: "md", md: "lg" }} 
              color="gray.600" 
              maxW="600px" 
              mx="auto" 
              lineHeight="relaxed"
            >
              Have questions about our projects or want to join our mission? We'd love to hear from you and explore how we can work together.
            </Text>
          </Box>

          <Flex direction={{ base: "column", lg: "row" }} gap={12}>
            {/* Contact Form */}
            <Box 
              flex={1} 
              bg="white" 
              borderRadius="2xl" 
              p={8} 
              boxShadow="0 8px 25px rgba(0,0,0,0.08)"
              border="1px solid"
              borderColor="gray.100"
            >
              <Heading as="h3" fontSize="xl" color="gray.900" mb={6} fontWeight="bold">
                Send us a Message
              </Heading>
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                action="/thank-you"
              >
                {/* Hidden field for Netlify Forms */}
                <input type="hidden" name="form-name" value="contact" />
                
                {/* Honeypot field for spam protection */}
                <Box display="none">
                  <label>
                    Don't fill this out if you're human: <input name="bot-field" />
                  </label>
                </Box>

                <VStack gap={4} align="stretch">
                  <Input 
                    name="name"
                    placeholder="Your Name" 
                    bg="gray.50" 
                    color="gray.900"
                    border="2px solid"
                    borderColor="gray.200"
                    borderRadius="lg"
                    px={4}
                    py={4}
                    height="auto"
                    required
                    _focus={{ 
                      borderColor: "brand.500", 
                      bg: "white",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)"
                    }}
                    _hover={{ borderColor: "gray.300" }}
                    _placeholder={{ color: "gray.500" }}
                  />
                  <Input 
                    name="email"
                    placeholder="Your Email Address" 
                    type="email"
                    bg="gray.50" 
                    color="gray.900"
                    border="2px solid"
                    borderColor="gray.200"
                    borderRadius="lg"
                    px={4}
                    py={4}
                    height="auto"
                    required
                    _focus={{ 
                      borderColor: "brand.500", 
                      bg: "white",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)"
                    }}
                    _hover={{ borderColor: "gray.300" }}
                    _placeholder={{ color: "gray.500" }}
                  />
                  <Textarea 
                    name="message"
                    placeholder="Tell us about your inquiry or how you'd like to get involved..." 
                    bg="gray.50" 
                    color="gray.900"
                    border="2px solid"
                    borderColor="gray.200"
                    borderRadius="lg"
                    px={4}
                    py={4}
                    rows={5}
                    resize="vertical"
                    required
                    _focus={{ 
                      borderColor: "brand.500", 
                      bg: "white",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)"
                    }}
                    _hover={{ borderColor: "gray.300" }}
                    _placeholder={{ color: "gray.500" }}
                  />
                  <Button
                    type="submit"
                    bg="brand.500"
                    color="white"
                    _hover={{ 
                      bg: "brand.600", 
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(0,93,170,0.3)"
                    }}
                    borderRadius="lg"
                    px={8}
                    py={4}
                    fontSize="md"
                    fontWeight="bold"
                    w="full"
                    transition="all 0.3s ease"
                    boxShadow="0 4px 15px rgba(0,93,170,0.2)"
                    _active={{
                      bg: "brand.700",
                      transform: "translateY(0px)"
                    }}
                    _focus={{
                      bg: "brand.500",
                      boxShadow: "0 0 0 3px rgba(0,93,170,0.3)"
                    }}
                  >
                    Send Message
                  </Button>
                </VStack>
              </form>
            </Box>

            {/* Meeting & Contact Details */}
            <Box flex={1} display="flex" flexDirection="column" gap={6}>
              {/* Meeting Information Card */}
              <Box 
                bg="white" 
                borderRadius="2xl" 
                p={8} 
                boxShadow="0 8px 25px rgba(0,0,0,0.08)"
                border="1px solid"
                borderColor="gray.100"
              >
                <Heading as="h3" fontSize="xl" color="gray.900" mb={6} fontWeight="bold">
                  Join Our Weekly Meetings
                </Heading>
                <VStack align="start" gap={4}>
                  <Flex align="center" gap={3}>
                    <Box 
                      bgGradient="linear(to-br, blue.100, blue.200)"
                      borderRadius="lg" 
                      p={2}
                      border="2px solid"
                      borderColor="blue.300"
                    >
                      <Image src="https://img.icons8.com/ios-filled/20/3182CE/calendar.png" alt="Calendar" />
                    </Box>
                    <Box>
                      <Text fontWeight="bold" color="gray.900" fontSize="md">
                        Every Tuesday
                      </Text>
                      <Text color="gray.600" fontSize="sm">
                        6:00 PM - 8:00 PM
                      </Text>
                    </Box>
                  </Flex>
                  <Flex align="start" gap={3}>
                    <Box 
                      bgGradient="linear(to-br, green.100, green.200)"
                      borderRadius="lg" 
                      p={2}
                      border="2px solid"
                      borderColor="green.300"
                      mt={1}
                    >
                      <Image src="https://img.icons8.com/ios-filled/20/38A169/marker.png" alt="Location" />
                    </Box>
                    <Box>
                      <Text fontWeight="bold" color="gray.900" fontSize="md">
                        Grand Astoria Hotel
                      </Text>
                      <Text color="gray.600" fontSize="sm" lineHeight="relaxed">
                        914 Mayor Jaldon Street<br />
                        Zamboanga City, Philippines
                      </Text>
                    </Box>
                  </Flex>
                </VStack>
              </Box>

              {/* Contact Information Card */}
              <Box 
                bg="white" 
                borderRadius="2xl" 
                p={8} 
                boxShadow="0 8px 25px rgba(0,0,0,0.08)"
                border="1px solid"
                borderColor="gray.100"
              >
                <Heading as="h3" fontSize="xl" color="gray.900" mb={6} fontWeight="bold">
                  Contact Information
                </Heading>
                <VStack align="start" gap={4}>
                  <Flex align="center" gap={3}>
                    <Box 
                      bgGradient="linear(to-br, red.100, red.200)"
                      borderRadius="lg" 
                      p={2}
                      border="2px solid"
                      borderColor="red.300"
                    >
                      <Image src="https://img.icons8.com/ios-filled/20/E53E3E/email.png" alt="Email" />
                    </Box>
                    <Box>
                      <Text fontWeight="bold" color="gray.900" fontSize="md">
                        rotaryzcwest@gmail.com
                      </Text>
                      <Text color="gray.600" fontSize="sm">
                        We'll respond within 24 hours
                      </Text>
                    </Box>
                  </Flex>
                  <Flex align="center" gap={3}>
                    <Box 
                      bgGradient="linear(to-br, blue.100, blue.200)"
                      borderRadius="lg" 
                      p={2}
                      border="2px solid"
                      borderColor="blue.300"
                    >
                      <Image src="https://img.icons8.com/ios-filled/20/1877F2/facebook.png" alt="Facebook" />
                    </Box>
                    <Box>
                      <Link 
                        href="https://www.facebook.com/RCZCwest" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        fontWeight="bold" 
                        color="blue.600" 
                        fontSize="md"
                        _hover={{ color: "blue.700", textDecoration: "underline" }}
                      >
                        @RCZCwest
                      </Link>
                      <Text color="gray.600" fontSize="sm">
                        Follow us for updates
                      </Text>
                    </Box>
                  </Flex>
                </VStack>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>

      {/* FAQ Section */}
      <Box as="section" py={20} bg="white" id="faq">
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          {/* Section Header */}
          <Box textAlign="center" mb={16}>
            <Text 
              fontSize="sm" 
              fontWeight="bold" 
              color="brand.500" 
              letterSpacing="wider" 
              textTransform="uppercase"
              mb={2}
            >
              Common Questions
            </Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} color="gray.900" fontWeight="bold" mb={4}>
              Frequently Asked Questions
            </Heading>
            <Text 
              fontSize={{ base: "md", md: "lg" }} 
              color="gray.600" 
              maxW="600px" 
              mx="auto" 
              lineHeight="relaxed"
            >
              Find answers to common questions about joining our club and getting involved in our community projects.
            </Text>
          </Box>

          <Box display="flex" flexDirection="column" gap={4} maxW="800px" mx="auto">
            {faqs.map((faq, idx) => (
              <Box 
                as="article" 
                key={idx} 
                bg="white" 
                p={6} 
                borderRadius="xl" 
                boxShadow="0 4px 15px rgba(0,0,0,0.05)"
                border="1px solid"
                borderColor="gray.100"
                _hover={{ 
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                  transform: "translateY(-2px)"
                }}
                transition="all 0.3s ease"
              >
                <Heading as="h3" fontWeight="bold" color="gray.900" mb={3} fontSize="lg">
                  {faq.q}
                </Heading>
                <Text color="gray.600" lineHeight="relaxed">
                  {faq.a}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
