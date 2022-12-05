import React, { createContext, PropsWithChildren, useContext } from 'react';
import { Client } from '../../api/api';

export const ClientContext = createContext<Client | undefined>(undefined);

export function useClient(value?: Client): Client {
  const context = useContext(ClientContext);
  if (value !== undefined) {
    return value;
  }
  if (context === undefined) {
    throw new Error('useClient must be used inside the <ClientContextProvider/>');
  }
  return context;
}

interface OwnProps {
  value: Client;
}

type Props = PropsWithChildren<OwnProps>;

export function ClientContextProvider(props: Props) {
  return <ClientContext.Provider value={props.value}>{props.children}</ClientContext.Provider>;
}
