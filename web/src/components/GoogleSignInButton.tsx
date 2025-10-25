import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";
import { initializeGoogleAuth, signInWithGoogle, GoogleUser } from "@/lib/googleAuth";

interface GoogleSignInButtonProps {
  onSuccess: (user: GoogleUser) => void;
  onError: (error: string) => void;
  disabled?: boolean;
  className?: string;
}

const GoogleSignInButton = ({ onSuccess, onError, disabled, className }: GoogleSignInButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await initializeGoogleAuth();
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize Google Auth:', error);
        onError('Failed to initialize Google authentication');
      }
    };

    initAuth();
  }, [onError]);

  const handleGoogleSignIn = async () => {
    if (!isInitialized) {
      onError('Google authentication not ready');
      return;
    }

    setIsLoading(true);
    try {
      const user = await signInWithGoogle();
      onSuccess(user);
    } catch (error) {
      console.error('Google sign-in failed:', error);
      onError(error instanceof Error ? error.message : 'Google sign-in failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleGoogleSignIn}
      disabled={disabled || isLoading || !isInitialized}
      className={`w-full ${className || ''}`}
    >
      <Chrome className="mr-2 h-4 w-4" />
      {isLoading ? "Signing in..." : "Continue with Google"}
    </Button>
  );
};

export default GoogleSignInButton;
