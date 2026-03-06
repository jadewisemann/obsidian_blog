import React, { ReactNode } from 'react';

// vercel-composition-patterns: architecture-avoid-boolean-props
export type CalloutVariant = 'note' | 'info' | 'warning' | 'error' | 'success';

interface CalloutProps {
    variant?: CalloutVariant;
    title?: string;
    children: ReactNode;
}

export function Callout({ variant = 'note', title, children }: CalloutProps) {
    return (
        <div className="callout" style={{
            backgroundColor: 'var(--callout-info-bg)',
            borderLeft: '4px solid var(--text-primary)',
            padding: 'var(--space-sm) var(--space-md)',
            borderRadius: '4px',
            margin: 'var(--space-md) 0'
        }}>
            {title && <strong style={{ display: 'block', marginBottom: 'var(--space-sm)' }}>{title}</strong>}
            <div>{children}</div>
        </div>
    );
}
