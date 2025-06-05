export type CapsuleContentProps = {
  text?: string;
  children?: React.ReactNode;
  onClick?: (e?: any) => void;
  className: string | undefined;
  imageUrl: string | undefined;
  transparent?: boolean;
  opacity?: number;
};
export type CapsuleLinkProps = {
  text?: string;
  className?: string;
  to: string;
  onClick?: () => void;
  children?: React.ReactNode;
  imageUrl?: string;
  transparent?: boolean;
  opacity?: number;
};
