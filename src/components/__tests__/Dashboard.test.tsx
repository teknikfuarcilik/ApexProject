import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../Dashboard';

describe('Dashboard Component', () => {
  const mockEvents = [
    {
      id: '1',
      customerName: 'Test Customer',
      eventType: 'conference',
      date: '2025-03-20',
      time: '14:00',
      screenSize: '4x3',
      area: '12',
      address: 'Test Address',
      status: 'upcoming'
    }
  ];

  const mockSetEvents = vi.fn();

  const renderDashboard = () => {
    return render(
      <BrowserRouter>
        <Dashboard events={mockEvents} setEvents={mockSetEvents} />
      </BrowserRouter>
    );
  };

  it('renders dashboard with events', () => {
    renderDashboard();
    expect(screen.getByText('Test Customer')).toBeInTheDocument();
    expect(screen.getByText('Konferans')).toBeInTheDocument();
  });

  it('filters events when search is used', () => {
    renderDashboard();
    const searchInput = screen.getByPlaceholderText('Etkinlik ara...');
    fireEvent.change(searchInput, { target: { value: 'Test' } });
    expect(screen.getByText('Test Customer')).toBeInTheDocument();
  });

  it('shows empty state when no events match filter', () => {
    renderDashboard();
    const searchInput = screen.getByPlaceholderText('Etkinlik ara...');
    fireEvent.change(searchInput, { target: { value: 'NonexistentEvent' } });
    expect(screen.getByText('Kriterlerinize uygun etkinlik bulunamadı.')).toBeInTheDocument();
  });
});