'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { NavTreeNode } from './SidebarNavigation';

const ChevronRight = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s ease' }}>
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);

const ChevronDown = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s ease' }}>
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

function TreeItem({ node, depth = 0 }: { node: NavTreeNode; depth?: number }) {
    const [isOpen, setIsOpen] = useState(true);
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div style={{ marginLeft: depth > 0 ? '1rem' : '0', marginTop: '0.25rem' }}>
            <div 
                style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                }}
            >
                {hasChildren ? (
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        style={{ 
                            background: 'none', 
                            border: 'none', 
                            cursor: 'pointer',
                            color: 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0
                        }}
                        aria-label="Toggle children"
                    >
                        {isOpen ? <ChevronDown /> : <ChevronRight />}
                    </button>
                ) : (
                    <span style={{ width: '14px', display: 'inline-block' }} /> 
                )}
                
                {node.href ? (
                    <Link 
                        href={node.href}
                        style={{ 
                            color: 'var(--text-primary)', 
                            textDecoration: 'none',
                            fontSize: '0.95rem',
                            flex: 1
                        }}
                    >
                        {node.title}
                    </Link>
                ) : (
                    <span style={{ 
                        color: 'var(--text-primary)', 
                        fontSize: '0.95rem', 
                        fontWeight: hasChildren ? 600 : 400,
                        cursor: hasChildren ? 'pointer' : 'default',
                        userSelect: 'none'
                    }}
                        onClick={() => hasChildren && setIsOpen(!isOpen)}
                    >
                        {node.title}
                    </span>
                )}
            </div>
            
            {hasChildren && isOpen && (
                <div style={{ paddingLeft: '0.5rem', borderLeft: '1px solid var(--border-color)', marginLeft: '12px' }}>
                    {node.children.map((child, idx) => (
                        <TreeItem key={`${child.title}-${idx}`} node={child} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}

export function SidebarTreeUI({ tree }: { tree: NavTreeNode[] }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {tree.map((node, idx) => (
                <TreeItem key={`${node.title}-${idx}`} node={node} />
            ))}
        </div>
    );
}
