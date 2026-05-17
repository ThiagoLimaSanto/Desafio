import { Bounce, ToastContainer } from 'react-toastify';

export function MessagesContainer({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        draggable
        theme='light'
        transition={Bounce}
      />
    </>
  );
}
