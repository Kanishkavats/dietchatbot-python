'use client';

interface PanelButtonProps {
  text: string;
  bgColor?: string;
  textColor?: string;
  onClick?: () => void;
  className?: string;
}

const PanelButton = ({
  text,
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
  onClick,
  className = '',
}: PanelButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} ${textColor} px-6 py-2 rounded ${className} cursor-pointer`}
    >
      {text}
    </button>
  );
};

export default PanelButton;
