import { render, waitFor, screen } from '@testing-library/react';
import React from 'react';
import NoteList from '../components/NoteList';

it('fetches and display notes', async () => {
  render(<NoteList />);
  expect(screen.getByText('Note List')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText('my note')).toBeInTheDocument();
    expect(screen.getByText('my note 2')).toBeInTheDocument();
  });
});
