import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Dashboard from '../Dashboard';

describe('Dashboard', () => {
  it('başarıyla render edilir ve başlık içerir', () => {
    render(<Dashboard />);
    expect(screen.getByText(/LED Ekran Kiralamaları/i)).toBeInTheDocument();
  });
}); 