import { mainFont } from "@/lib/fonts";
import { WrapperProps } from "@/types";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import LoadingOverlay from "@/components/common/LoadingOverlay";
import Navbar from "@/components/layout/Navbar";
import ThemeProvider from "@/components/layout/ThemeProvider";
import SigninDialog from "@/components/dialogs/SigninDialog";

export { metadata } from "./metadata";

const RootLayout = ({ children }: WrapperProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${mainFont.className} antialiased `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster position="top-right" closeButton richColors />
          <LoadingOverlay />
          <SigninDialog />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
