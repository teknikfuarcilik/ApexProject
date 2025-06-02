import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '../Header';

describe('Header', () => {
  it('başarıyla render edilir ve başlık içerir', () => {
    render(<Header scrolled={false} />);
    expect(screen.getByAltText(/APEXLS LED TURKEY/i)).toBeInTheDocument();
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });
}); 