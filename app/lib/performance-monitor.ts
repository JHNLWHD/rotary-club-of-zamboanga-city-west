// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();
  private enabled: boolean;

  constructor() {
    this.enabled = typeof window !== 'undefined' && 
                   'performance' in window && 
                   process.env.NODE_ENV === 'development';
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startMeasure(name: string): void {
    if (!this.enabled) return;
    
    try {
      performance.mark(`${name}-start`);
    } catch (error) {
      console.warn(`Failed to start performance measure for ${name}:`, error);
    }
  }

  endMeasure(name: string): number | null {
    if (!this.enabled) return null;
    
    try {
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      
      const measure = performance.getEntriesByName(name)[0];
      const duration = measure?.duration || 0;
      
      this.metrics.set(name, duration);
      
      // Clean up marks and measures
      performance.clearMarks(`${name}-start`);
      performance.clearMarks(`${name}-end`);
      performance.clearMeasures(name);
      
      return duration;
    } catch (error) {
      console.warn(`Failed to end performance measure for ${name}:`, error);
      return null;
    }
  }

  measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    if (!this.enabled) return fn();
    
    this.startMeasure(name);
    return fn().finally(() => {
      const duration = this.endMeasure(name);
      if (duration !== null && duration > 100) {
        console.log(`🐌 Slow operation detected: ${name} took ${duration.toFixed(2)}ms`);
      }
    });
  }

  measureSync<T>(name: string, fn: () => T): T {
    if (!this.enabled) return fn();
    
    this.startMeasure(name);
    try {
      return fn();
    } finally {
      const duration = this.endMeasure(name);
      if (duration !== null && duration > 16) { // More than 1 frame at 60fps
        console.log(`🐌 Slow sync operation: ${name} took ${duration.toFixed(2)}ms`);
      }
    }
  }

  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  clearMetrics(): void {
    this.metrics.clear();
  }

  logWebVitals(): void {
    if (!this.enabled) return;

    // Log Core Web Vitals when available
    if ('web-vitals' in window) {
      // This would require installing web-vitals library
      console.log('Web Vitals monitoring is available');
    }

    // Log basic performance metrics
    if (performance.navigation) {
      const navigation = performance.navigation;
      console.log('Navigation timing:', {
        type: navigation.type,
        redirectCount: navigation.redirectCount,
      });
    }

    if (performance.timing) {
      const timing = performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
      
      console.log('Page timing:', {
        loadTime: `${loadTime}ms`,
        domReady: `${domReady}ms`,
      });
    }
  }
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();

// Helper function to measure component render time
export function withPerformanceMonitoring<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
): React.ComponentType<P> {
  return function PerformanceMonitoredComponent(props: P) {
    performanceMonitor.startMeasure(`render-${componentName}`);
    
    const result = Component(props);
    
    // Use useEffect to measure after render
    React.useEffect(() => {
      performanceMonitor.endMeasure(`render-${componentName}`);
    });

    return result;
  };
}

// React import for the withPerformanceMonitoring function
import React from 'react';