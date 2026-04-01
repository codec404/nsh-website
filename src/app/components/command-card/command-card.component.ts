import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-command-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="card-header">
        <span class="card-icon">{{ icon }}</span>
        <code class="card-name">{{ name }}</code>
      </div>
      <p class="card-desc">{{ description }}</p>
      <div class="card-example" *ngIf="example">
        <pre><code>{{ example }}</code></pre>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 1.25rem;
      transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
      cursor: default;
    }
    .card:hover {
      transform: translateY(-4px);
      border-color: var(--accent);
      box-shadow: 0 8px 32px rgba(0, 229, 255, 0.12), 0 0 0 1px rgba(0, 229, 255, 0.08);
    }
    .card-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.6rem;
    }
    .card-icon {
      font-size: 1.2rem;
      color: var(--accent);
      flex-shrink: 0;
    }
    .card-name {
      font-family: var(--font-mono);
      font-size: 1rem;
      font-weight: 700;
      color: var(--accent);
      background: var(--accent-dim);
      border: 1px solid rgba(0, 229, 255, 0.2);
      border-radius: 4px;
      padding: 0.15em 0.5em;
    }
    .card-desc {
      color: var(--text-dim);
      font-size: 0.9rem;
      line-height: 1.5;
      margin-bottom: 0.75rem;
    }
    .card-example pre {
      background: #050810;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 0.75rem 1rem;
      margin: 0;
      overflow-x: auto;
    }
    .card-example code {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--green);
      background: none;
      border: none;
      padding: 0;
    }
  `]
})
export class CommandCardComponent {
  @Input() icon = '▶';
  @Input() name = '';
  @Input() description = '';
  @Input() example = '';
}
