export interface HamburgerMenuToggleProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentSection?: string;
}
