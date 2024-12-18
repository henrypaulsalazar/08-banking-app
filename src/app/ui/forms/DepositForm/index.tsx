import { FC } from "react";
import './style.scss';
import { Button, ButtonType } from "@ui/components/Button";

interface Props {
  originAccount: string;
  destinationAccount: string;
  amount: number;
  handleSubmit: (e: React.FormEvent) => void;
  setFormField: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  isLoading: boolean;
  isDisabled: boolean;
}

export const DepositForm: FC<Props> = ({ originAccount, destinationAccount, amount, handleSubmit, setFormField, error, isLoading, isDisabled }) => {
  return (
    <form className='actionContainer__form' onSubmit={handleSubmit}>
      <input
        className={`actionContainer__input ${error && 'actionContainer__input--error'}`}
        name="originAccount"
        type="text"
        placeholder="Cuenta Origen"
        value={originAccount}
        onChange={setFormField}
        disabled
      />
      <input
        className={`actionContainer__input ${error && 'actionContainer__input--error'}`}
        name="destinationAccount"
        type="text"
        placeholder="Cuenta Destino"
        value={destinationAccount}
        onChange={setFormField}
      />
      <input
        className={`actionContainer__input ${error && 'actionContainer__input--error'}`}
        name="amount"
        type="number"
        placeholder="Monto"
        value={amount}
        onChange={setFormField}
      />
      <Button onClick={handleSubmit} isLoading={isLoading} text="Login" isDisabled={isDisabled} type={ButtonType.SUBMIT} />
    </form>
  );
};