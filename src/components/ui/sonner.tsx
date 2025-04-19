import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      duration={5000}
      style={
        {
          "--normal-bg": "#7a7c80",
          "--normal-text": "#ffffff",
          "--normal-border": "#515254",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
