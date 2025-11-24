import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1c1c1c] via-[#0c1324] to-[#0c1324] p-6">
          <div className="max-w-md w-full bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-red-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-3">
              Oops! Something went wrong
            </h1>
            
            <p className="text-gray-400 mb-6 text-sm">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            
            {this.state.error && (
              <details className="mb-6 text-left">
                <summary className="text-gray-500 text-xs cursor-pointer hover:text-gray-400 transition-colors">
                  Technical details
                </summary>
                <pre className="mt-2 p-3 bg-black/30 rounded text-xs text-gray-400 overflow-auto max-h-32">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            
            <button
              onClick={this.handleReload}
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] text-white font-medium hover:opacity-90 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(122,95,255,0.5)]"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
