import { getHighlighter } from 'shiki';
import { CopyButton } from './CopyButton';

// Highlighter 인스턴스 싱글톤 유지
let highlighter: any;

export async function CodeBlock(props: any) {
    const { children, className: preClassName } = props;
    
    // 1. Language 및 원본 코드 추출
    let codeNode: any = '';
    let className = preClassName || '';

    // next-mdx-remote에서 <pre> 내부에는 <code> 컴포넌트가 존재함
    if (children && children.props && children.props.children) {
        codeNode = children.props.children;
        className = children.props.className || className;
    } else if (typeof children === 'string') {
        codeNode = children;
    } else {
        codeNode = String(children);
    }

    const match = /language-(\w+)/.exec(className) || /([a-zA-Z0-9]+)/.exec(className);
    let lang = match ? match[1].toLowerCase() : 'text';
    
    // Alias 처리
    if (lang === 'js') lang = 'javascript';
    if (lang === 'ts') lang = 'typescript';
    if (lang === 'py') lang = 'python';
    if (lang === 'sh') lang = 'bash';

    // 2. 서버 사이드 Shiki 초기화
    if (!highlighter) {
        highlighter = await getHighlighter({
            themes: ['github-light', 'github-dark'],
            langs: [
                'javascript', 'typescript', 'tsx', 'jsx', 'bash', 
                'json', 'css', 'html', 'yaml', 'markdown', 'python', 'text'
            ], 
        });
    }

    const loadedLangs = highlighter.getLoadedLanguages();
    const safeLang = loadedLangs.includes(lang) ? lang : 'text';

    // 3. Shiki HTML 생성
    const rawCode = String(codeNode).trimEnd();
    let html = '';
    try {
        html = highlighter.codeToHtml(rawCode, {
            lang: safeLang,
            themes: { 
                light: 'github-light', 
                dark: 'github-dark' 
            }
        });
    } catch (e) {
        // Fallback for safety
        html = `<pre><code>${rawCode}</code></pre>`;
    }

    return (
        <figure 
            style={{
                position: 'relative',
                margin: '1.5rem 0',
                overflow: 'hidden',
                borderRadius: '0.5rem',
                border: '1px solid var(--border-color, #e1e4e8)',
                backgroundColor: 'var(--code-background, #f6f8fa)',
                color: 'var(--code-normal, #111)',
            }}
        >
            <div 
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'rgba(0,0,0,0.03)',
                    borderBottom: '1px solid inherit'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', textTransform: 'uppercase', opacity: 0.7 }}>
                        {lang !== 'text' ? lang : 'Code'}
                    </span>
                    {/* 디버그용 (필요시 삭제 가능) */}
                    <span style={{ fontSize: '0.6rem', opacity: 0.3 }} className="debug-lang">
                        ({lang})
                    </span>
                </div>
                <CopyButton text={rawCode} />
            </div>

            <div 
                style={{
                    overflowX: 'auto',
                    padding: '1rem',
                    fontSize: '0.9em',
                    fontFamily: 'monospace',
                    lineHeight: 1.45
                }}
                dangerouslySetInnerHTML={{ __html: html }} 
            />
        </figure>
    );
}
