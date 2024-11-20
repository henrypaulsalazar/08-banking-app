import { FC } from 'react';
import './style.scss';
import { ComponentAction } from '../../../core/constants/actions';

interface SidebarProps {
  onActionChange: (action: string) => void;
  currentAction: string | null;
  componentActions: ComponentAction[];
  onLogout: () => void;
}

export const Sidebar: FC<SidebarProps> = ({ onActionChange, currentAction, componentActions, onLogout }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src="/vite.svg" alt="Logo" className="sidebar__logo-img" />
      </div>

      <ul className="sidebar__list">
        {componentActions.map((action) => (
          <li
            key={action.action}
            className={`sidebar__item ${currentAction === action.action ? 'active' : ''}`}
            onClick={() => onActionChange(action.action)}
          >
            {action.label}
          </li>
        ))}
      </ul>
      <div className="sidebar__spacer"></div>
      <button className="sidebar__logout-btn" onClick={onLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};
