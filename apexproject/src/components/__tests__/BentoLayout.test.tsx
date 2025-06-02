import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BentoLayout from '../BentoLayout';

describe('BentoLayout', () => {
  it('başarıyla render edilir ve başlık içerir', () => {
    render(<BentoLayout />);
    expect(screen.getByText(/Analiz Özeti/i)).toBeInTheDocument();
  });
}); 