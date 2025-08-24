import React from 'react';
import { Users, Target, DollarSign, Clock, Heart, BookOpen, Globe, Leaf, Shield, Award, Calendar, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

// Icon mapping for Contentful content
export const iconMap: { [key: string]: any } = {
  // Stats icons
  'Users': Users,
  'Target': Target,
  'DollarSign': DollarSign,
  'Clock': Clock,
  
  // Service area icons
  'Heart': Heart,
  'BookOpen': BookOpen,
  'Globe': Globe,
  'Leaf': Leaf,
  'Shield': Shield,
  'Award': Award,
  
  // Contact icons
  'Calendar': Calendar,
  'MapPin': MapPin,
  'Phone': Phone,
  'Mail': Mail,
  
  // Social media icons
  'Facebook': Facebook,
  'Instagram': Instagram,
  'Twitter': Twitter,
  'Linkedin': Linkedin,
  'Youtube': Youtube,
};

/**
 * Get icon component by name
 * @param iconName - The name of the icon from Contentful
 * @param fallback - Fallback icon component (defaults to Users)
 * @returns React component or fallback
 */
export function getIconByName(iconName: string, fallback: any = Users) {
  return iconMap[iconName] || fallback;
}

/**
 * Get icon component with size props
 * @param iconName - The name of the icon from Contentful
 * @param size - Icon size (defaults to 24)
 * @param className - Additional CSS classes
 * @returns JSX element
 */
export function getIconComponent(iconName: string, size: number = 24, className: string = ''): React.ReactElement {
  const IconComponent = getIconByName(iconName);
  return React.createElement(IconComponent, { size, className });
}

/**
 * Get icon component with color
 * @param iconName - The name of the icon from Contentful
 * @param color - Icon color (hex or CSS color)
 * @param size - Icon size (defaults to 24)
 * @returns JSX element
 */
export function getIconComponentWithColor(iconName: string, color: string, size: number = 24): React.ReactElement {
  const IconComponent = getIconByName(iconName);
  return React.createElement(IconComponent, { size, color });
}

/**
 * Get icon component with custom props
 * @param iconName - The name of the icon from Contentful
 * @param props - Custom props to pass to the icon component
 * @returns JSX element
 */
export function getIconComponentWithProps(iconName: string, props: any = {}): React.ReactElement {
  const IconComponent = getIconByName(iconName);
  return React.createElement(IconComponent, props);
} 