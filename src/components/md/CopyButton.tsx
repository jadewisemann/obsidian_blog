'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
    text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // 2초 뒤 원 상태 복구
        } catch (err) {
            console.error('Failed to copy text', err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '1.5rem',
                height: '1.5rem',
                color: isCopied ? '#4ade80' : 'var(--text-muted, #999)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s'
            }}
            aria-label="Copy code to clipboard"
        >
            {isCopied ? (
                <Check style={{ width: '1rem', height: '1rem' }} />
            ) : (
                <Copy style={{ width: '1rem', height: '1rem' }} />
            )}
        </button>
    );
}
