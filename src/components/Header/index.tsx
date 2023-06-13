import { HeaderContainer, HeaderContent, NewTransactionsButton } from "./styles";
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../../assets/logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

    <Dialog.Root>
      <Dialog.Trigger asChild>
    <NewTransactionsButton>Nova transação</NewTransactionsButton>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Title>Nova transação</Dialog.Title>

        <Dialog.Close />
        <Dialog.Content>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}