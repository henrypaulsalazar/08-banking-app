import { render, screen } from '@testing-library/react';
import { DashBoard } from '../../../../src/app/ui/components/DashBoard/index';
import React from 'react';

describe('DashBoard Component', () => {
  it('should render the Sidebar component', () => {
    const SidebarMock = <div data-testid="sidebar">Sidebar</div>;

    render(
      <DashBoard Sidebar={SidebarMock}>
        <div>Content</div>
      </DashBoard>
    );

    // @ts-ignore
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('should render the children passed to it', () => {
    const SidebarMock = <div data-testid="sidebar">Sidebar</div>;

    render(
      <DashBoard Sidebar={SidebarMock}>
        <div data-testid="children">Main content</div>
      </DashBoard>
    );

    // @ts-ignore
    expect(screen.getByTestId('children')).toHaveTextContent('Main content');
  });
});
