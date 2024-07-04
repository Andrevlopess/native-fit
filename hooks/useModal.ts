import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef } from "react";

export function useModal() {
  const ref = useRef<BottomSheetModal>(null);

  const open = () => {
    ref.current?.present();
  };
  const close = () => {
    ref.current?.dismiss();
  };
  const forceClose = () => {
    ref.current?.forceClose();
  };

  return { ref, open, close, forceClose};
}
