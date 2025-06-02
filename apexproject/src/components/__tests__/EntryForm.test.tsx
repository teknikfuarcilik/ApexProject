import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EntryForm from '../EntryForm';

describe('EntryForm', () => {
  it('başarıyla render edilir ve başlık içerir', () => {
    render(<EntryForm />);
    expect(screen.getByText(/Kiralama Kaydı Oluştur/i)).toBeInTheDocument();
  });
}); 