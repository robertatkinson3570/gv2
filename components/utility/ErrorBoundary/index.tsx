import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Rendered instead of the children when they throw. Defaults to nothing. */
  fallback?: ReactNode;
  /** Label used in the console error so we can tell which boundary tripped. */
  label?: string;
}

interface State {
  hasError: boolean;
}

/**
 * Contains a React render error to its subtree instead of letting it white-screen
 * the whole app (Next's "Application error: a client-side exception has occurred").
 * Used around the in-game HUD so a single broken widget can't take down the game.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error(`[ErrorBoundary${this.props.label ? `:${this.props.label}` : ''}]`, error, info?.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}

export default ErrorBoundary;
