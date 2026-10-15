import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Meridian encountered a render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink px-6 text-center text-cloud">
          <AlertTriangle className="h-10 w-10 text-brass" aria-hidden />
          <h1 className="font-display text-2xl">Something went off course</h1>
          <p className="max-w-sm text-sm text-cloud/70">
            The interface hit an unexpected error. Reloading usually clears it up.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-full bg-brass/90 px-5 py-2 text-sm font-medium text-ink transition hover:bg-brass"
          >
            Reload Meridian
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
