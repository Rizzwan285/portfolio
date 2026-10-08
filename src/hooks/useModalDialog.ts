import { useEffect, useRef } from 'react';

/**
 * Drives a native <dialog> from React state: opens it as a modal (focus is
 * trapped by the browser), closes on Escape or a backdrop click, and locks
 * page scrolling while open.
 */
export function useModalDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.body.classList.add('is-locked');
    } else if (!open && dialog.open) {
      dialog.close();
    }
    if (!open) document.body.classList.remove('is-locked');
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const onCancel = (event: Event) => {
      event.preventDefault();
      onCloseRef.current();
    };
    const onClick = (event: MouseEvent) => {
      if (event.target === dialog) onCloseRef.current();
    };
    dialog.addEventListener('cancel', onCancel);
    dialog.addEventListener('click', onClick);
    return () => {
      dialog.removeEventListener('cancel', onCancel);
      dialog.removeEventListener('click', onClick);
      document.body.classList.remove('is-locked');
    };
  }, []);

  return ref;
}
