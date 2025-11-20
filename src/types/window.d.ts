declare global {
  interface Window {
    openPolicyModal?: (type: 'privacy' | 'terms') => void;
    closePolicyModal?: (el?: Element | null) => void;
  }
}
export {};
