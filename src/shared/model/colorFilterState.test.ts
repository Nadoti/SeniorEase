import { describe, it, expect, vi } from 'vitest';
import { applyColorFilterToDOM } from './colorFilterState';
describe('colorFilterState DOM side effects', () => {
  it('should remove existing filter and apply deuteranopia filter', () => {
    document.documentElement.style.filter = '';
    applyColorFilterToDOM('deuteranopia');
    expect(document.documentElement.style.filter).toContain('url(');
    expect(document.documentElement.style.filter).toContain('#seniorease-deuteranopia');
  });
  it('should remove existing filter and apply protanopia filter', () => {
    document.documentElement.style.filter = 'url(#seniorease-deuteranopia)';
    applyColorFilterToDOM('protanopia');
    expect(document.documentElement.style.filter).toContain('url(');
    expect(document.documentElement.style.filter).toContain('#seniorease-protanopia');
  });
  it('should completely remove filters when none is selected', () => {
    document.documentElement.style.filter = 'url(#seniorease-achromatopsia)';
    applyColorFilterToDOM('none');
    expect(document.documentElement.style.filter).toBe('');
  });
});
