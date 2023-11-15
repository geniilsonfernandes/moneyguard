import { useState } from 'react';

type useVisibility = {
  visible: boolean;
  toggleVisibility: () => void;
  onHidden: () => void;
  onShow: () => void;
};

type useVisibilityProps = {
  defaultVisibility?: boolean;
};

const useVisibility = ({ defaultVisibility = false }: useVisibilityProps = {}): useVisibility => {
  const [visible, setVisible] = useState(defaultVisibility);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const onHidden = () => {
    setVisible(false);
  };

  const onShow = () => {
    setVisible(true);
  };

  return {
    visible,
    toggleVisibility,
    onHidden,
    onShow
  };
};

export default useVisibility;
