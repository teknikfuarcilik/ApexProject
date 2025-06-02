import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EntryForm from '../EntryForm';

describe('EntryForm Component', () => {
  const mockAddEvent = vi.fn();

  beforeEach(() => {
    render(<EntryForm addEvent={mockAddEvent} defaultType="kiralik" />);
  });

  it('renders form fields correctly', () => {
    expect(screen.getByLabelText(/Müşteri Adı/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Etkinlik Türü/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tarih/i)).toBeInTheDocument();
  });

  it('submits form with correct data', async () => {
    const customerNameInput = screen.getByLabelText(/Müşteri Adı/i);
    const eventTypeSelect = screen.getByLabelText(/Etkinlik Türü/i);
    const dateInput = screen.getByLabelText(/Tarih/i);

    fireEvent.change(customerNameInput, { target: { value: 'Test Customer' } });
    fireEvent.change(eventTypeSelect, { target: { value: 'conference' } });
    fireEvent.change(dateInput, { target: { value: '2025-03-20' } });

    const submitButton = screen.getByText('Kaydet');
    fireEvent.click(submitButton);

    expect(mockAddEvent).toHaveBeenCalledWith(expect.objectContaining({
      customerName: 'Test Customer',
      eventType: 'conference',
      date: '2025-03-20'
    }));
  });

  it('shows validation errors for required fields', () => {
    const submitButton = screen.getByText('Kaydet');
    fireEvent.click(submitButton);

    expect(screen.getByText(/Bu alan zorunludur/i)).toBeInTheDocument();
  });
});