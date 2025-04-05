import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

import LogForm from '../src/components/LogForm';

describe('LogForm', () => {
    it('submits form with entered values', async () => {
      const onSave = vi.fn();
      const initial = {
        userName: '',
        description: '',
        date: '',
        location: '',
      };
  
      const { getByPlaceholderText, getByText, getByDisplayValue } = render(
        <LogForm initial={initial} onSave={onSave} isEditing={false} />
      );
  
      await userEvent.type(getByPlaceholderText('Your name'), 'RohiniMaskar');
      await userEvent.type(getByPlaceholderText('Event description'), 'Test event');
      await userEvent.type(getByPlaceholderText('Location'), 'Seattle');
  
      const dateInput = document.querySelector('input[name="date"]') as HTMLInputElement;
      await userEvent.type(dateInput, '2024-04-02');
  
      await userEvent.click(getByText(/add log/i));
  
      expect(onSave).toHaveBeenCalledWith(
        expect.objectContaining({
          userName: 'RohiniMaskar',
          description: 'Test event',
          location: 'Seattle',
          date: '2024-04-02',
        })
      );
    });
  });
