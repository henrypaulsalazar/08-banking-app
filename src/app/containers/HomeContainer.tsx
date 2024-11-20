import { LayoutMain } from '@ui/layouts/LayoutMain';
import { useAuth } from '../core/hooks/useAuth';
import { useState } from 'react';
import { Sidebar } from '@ui/components/Sidebar';
import { userComponentActions } from '../core/constants/actions';
import { useUser } from '../core/hooks/useUser';
import { DashBoard } from '@ui/components/DashBoard';

export default function HomeContainer() {
  const { username, logoutFunction } = useAuth();
  const { balance, accountNumber } = useUser();
  const [currentAction, setCurrentAction] = useState<string | null>(null);

  const handleActionChange = (action: string) => {
    setCurrentAction(action);
  };

  return (
    <LayoutMain>
      <DashBoard Sidebar={<Sidebar onActionChange={handleActionChange} currentAction={currentAction} componentActions={userComponentActions} onLogout={logoutFunction} />}>
          <h2>Hola {username}</h2>
        <div className="account__info">
          <p>Número de Cuenta: {accountNumber}</p>
          <p>{balance > 0 ? `Saldo: $${balance}` : '-'}</p>
        </div>
        {
          userComponentActions.map((item) => (
            <div key={item.action}>
              {currentAction === item.action && item.component}
            </div>
          ))
        }
      </DashBoard>
    </LayoutMain>
  );
}