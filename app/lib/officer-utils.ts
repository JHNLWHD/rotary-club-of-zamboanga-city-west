import type { Officer } from "./contentful-types";

/**
 * Get the priority order for a given officer role
 * @param role - The officer role string
 * @returns Priority number (lower = higher priority)
 */
export function getOfficerRoleOrderPriority(role: string): number {
  const roleOrderMap: Record<string, number> = {
    'PRESIDENT': 1,
    'VICE PRESIDENT': 2, 
    'SECRETARY': 3,
    'EXECUTIVE SECRETARY': 4,
    'TREASURER': 5,
    'AUDITOR': 6,
  };
  
  const normalizedRole = role.toUpperCase().trim();
  if (roleOrderMap[normalizedRole]) {
    return roleOrderMap[normalizedRole];
  }
  
  return 999;
}

/**
 * Sort officers by their role hierarchy (PRESIDENT first, then VICE PRESIDENT, etc.)
 * @param officers - Array of officers to sort
 * @returns Sorted array of officers
 */
export function sortOfficersByRoleHierarchy(officers: Officer[]): Officer[] {
  return [...officers].sort((officerA, officerB) => {
    const priorityA = getOfficerRoleOrderPriority(officerA.role);
    const priorityB = getOfficerRoleOrderPriority(officerB.role);
    
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    
    const sortByNameIfSamePriority = (officerA: Officer, officerB: Officer) => {
      return officerA.name.localeCompare(officerB.name);
    };
    
    return sortByNameIfSamePriority(officerA, officerB);
  });
}
