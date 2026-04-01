import {
  Component, OnInit, OnDestroy, inject, ChangeDetectorRef, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { DocsService } from '../../services/docs.service';

@Component({
  selector: 'app-docs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Top nav -->
    <nav class="docs-nav">
      <div class="docs-nav-inner">
        <a routerLink="/" class="nav-brand">
          <span class="brand-icon">◈</span>
          <span class="brand-name">nsh</span>
          <span class="nav-sep">/</span>
          <span class="nav-docs">docs</span>
        </a>
        <div class="nav-right">
          <a routerLink="/" class="nav-link">Home</a>
          <a href="https://github.com/codec404/nsh" target="_blank" rel="noopener" class="nav-link nav-gh">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
        </div>
      </div>
    </nav>

    <div class="docs-layout">
      <!-- Sidebar -->
      <aside class="docs-sidebar">
        <div class="sidebar-inner">
          <div class="sidebar-section">
            <span class="sidebar-title">Documentation</span>
            <nav class="sidebar-nav">
              <a
                *ngFor="let s of sections"
                [routerLink]="['/docs', s.id]"
                class="sidebar-link"
                [class.active]="activeSection === s.id"
              >
                <span class="sidebar-icon">{{ s.icon }}</span>
                <span>{{ s.label }}</span>
              </a>
            </nav>
          </div>

          <div class="sidebar-footer">
            <div class="sidebar-meta">
              <span class="meta-item">◈ nsh docs</span>
              <span class="meta-item">v1.0</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main content -->
      <main class="docs-main">
        <!-- Loading state -->
        <div class="loading-state" *ngIf="loading">
          <div class="loader-ring"></div>
          <span>Loading...</span>
        </div>

        <!-- Error state -->
        <div class="error-state" *ngIf="error && !loading">
          <span class="error-icon">⚠</span>
          <h3>Failed to load document</h3>
          <p>{{ error }}</p>
          <button class="btn btn-ghost" (click)="retry()">Retry</button>
        </div>

        <!-- Content -->
        <article
          class="doc-content docs-article"
          *ngIf="!loading && !error && htmlContent"
          [class.fade-in]="!loading"
          [innerHTML]="htmlContent"
        ></article>

        <!-- No selection -->
        <div class="empty-state" *ngIf="!loading && !error && !htmlContent">
          <div class="empty-icon">◈</div>
          <h3>Select a section</h3>
          <p>Choose a documentation section from the sidebar.</p>
          <a routerLink="/docs/overview" class="btn btn-primary">Start with Overview</a>
        </div>
      </main>
    </div>
  `,
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private docsService = inject(DocsService);
  private sanitizer = inject(DomSanitizer);
  private cdr = inject(ChangeDetectorRef);

  sections = this.docsService.getSections();
  activeSection = 'overview';
  htmlContent: SafeHtml | null = null;
  loading = false;
  error: string | null = null;

  private subs = new Subscription();

  ngOnInit() {
    this.subs.add(
      this.route.paramMap.subscribe(params => {
        const section = params.get('section') || 'overview';
        this.activeSection = section;
        this.loadDoc(section);
      })
    );

    // If on /docs with no section, redirect to overview
    if (!this.route.snapshot.paramMap.get('section')) {
      this.router.navigate(['/docs', 'overview'], { replaceUrl: true });
    }
  }

  ngOnDestroy() { this.subs.unsubscribe(); }

  loadDoc(section: string) {
    this.loading = true;
    this.error = null;
    this.htmlContent = null;
    this.cdr.markForCheck();

    this.subs.add(
      this.docsService.getDoc(section).subscribe({
        next: html => {
          this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
          this.loading = false;
          this.cdr.markForCheck();
          // Scroll to top
          setTimeout(() => {
            const main = document.querySelector('.docs-main');
            if (main) main.scrollTop = 0;
          }, 0);
        },
        error: err => {
          this.loading = false;
          this.error = `Could not load /assets/docs/${section}.md — ${err.message || err.statusText || 'Network error'}`;
          this.cdr.markForCheck();
        }
      })
    );
  }

  retry() {
    this.loadDoc(this.activeSection);
  }
}
