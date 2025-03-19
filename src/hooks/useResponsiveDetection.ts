import { useMediaQuery } from "react-responsive";

export default function useResponsiveDetection() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isDesktop = useMediaQuery({ minWidth: 992 });

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
}
