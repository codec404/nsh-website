import {
  Component, Input, OnChanges, ElementRef, ViewChild, AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import ini from 'highlight.js/lib/languages/ini';
import xml from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('sh', bash);
hljs.registerLanguage('ini', ini);
hljs.registerLanguage('xml', xml);

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="code-wrapper">
      <div class="code-top-bar">
        <span class="lang-badge">{{ language || 'sh' }}</span>
        <button class="copy-btn" (click)="copy()" [class.copied]="copied">
          <span *ngIf="!copied">⎘ Copy</span>
          <span *ngIf="copied">✓ Copied!</span>
        </button>
      </div>
      <div class="scanlines"></div>
      <pre><code #codeEl class="hljs language-{{ language || 'sh' }}">{{ code }}</code></pre>
    </div>
  `,
  styles: [`
    .code-wrapper {
      position: relative;
      background: #050810;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      overflow: hidden;
      margin: 1rem 0;
    }
    .code-top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 1rem;
      background: #0a0d1a;
      border-bottom: 1px solid var(--border);
    }
    .lang-badge {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .copy-btn {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-muted);
      background: none;
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 0.2rem 0.6rem;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .copy-btn:hover {
      color: var(--accent);
      border-color: var(--accent);
    }
    .copy-btn.copied {
      color: var(--green);
      border-color: var(--green);
    }
    .scanlines {
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 229, 255, 0.015) 2px,
        rgba(0, 229, 255, 0.015) 4px
      );
      pointer-events: none;
      z-index: 1;
      top: 36px;
    }
    pre {
      margin: 0;
      padding: 1.25rem 1.5rem;
      overflow-x: auto;
      background: transparent;
      border: none;
      border-radius: 0;
      position: relative;
      z-index: 2;
    }
    code {
      font-family: var(--font-mono);
      font-size: 0.875rem;
      line-height: 1.7;
      background: none;
      border: none;
      padding: 0;
      border-radius: 0;
      color: var(--text);
    }
    /* highlight.js overrides */
    :host ::ng-deep .hljs-keyword { color: #7c3aed; }
    :host ::ng-deep .hljs-built_in { color: #00e5ff; }
    :host ::ng-deep .hljs-string { color: #ff9500; }
    :host ::ng-deep .hljs-comment { color: #4a5568; font-style: italic; }
    :host ::ng-deep .hljs-number { color: #00ff88; }
    :host ::ng-deep .hljs-variable { color: #e2e8f0; }
    :host ::ng-deep .hljs-params { color: #94a3b8; }
    :host ::ng-deep .hljs-attr { color: #00e5ff; }
    :host ::ng-deep .hljs-meta { color: #64748b; }
  `]
})
export class CodeBlockComponent implements OnChanges, AfterViewInit {
  @Input() code = '';
  @Input() language = 'sh';
  @ViewChild('codeEl') codeEl!: ElementRef<HTMLElement>;
  copied = false;

  ngAfterViewInit() { this.highlight(); }
  ngOnChanges() { if (this.codeEl) this.highlight(); }

  private highlight() {
    if (!this.codeEl) return;
    const el = this.codeEl.nativeElement;
    el.textContent = this.code;
    hljs.highlightElement(el);
  }

  copy() {
    navigator.clipboard.writeText(this.code).then(() => {
      this.copied = true;
      setTimeout(() => { this.copied = false; }, 2000);
    });
  }
}
