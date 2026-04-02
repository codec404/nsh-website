import {
  Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommandCardComponent } from '../../components/command-card/command-card.component';

interface TypingState {
  displayText: string;
  cursor: boolean;
  phase: 'typing' | 'holding' | 'erasing';
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CommandCardComponent],
  template: `
    <!-- NAV -->
    <nav class="site-nav">
      <div class="nav-inner">
        <a routerLink="/" class="nav-brand">
          <span class="brand-icon">◈</span>
          <span class="brand-name">nsh</span>
        </a>
        <ul class="nav-links">
          <li><a routerLink="/docs/overview">Docs</a></li>
          <li><a routerLink="/docs/commands">Commands</a></li>
          <li><a routerLink="/docs/scripting">Scripting</a></li>
          <li><a href="https://github.com/codec404/nsh" target="_blank" rel="noopener" class="nav-gh">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a></li>
        </ul>
      </div>
    </nav>

    <!-- HERO -->
    <section class="hero">
      <!-- Particle orbs -->
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <div class="orb orb-4"></div>
      <!-- Mesh gradient -->
      <div class="hero-mesh"></div>
      <!-- Grid overlay -->
      <div class="hero-grid"></div>

      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          New shell paradigm · Tables over text
        </div>
        <h1 class="hero-headline">
          A shell that<br>
          <span class="headline-accent">thinks in tables</span>
        </h1>
        <p class="hero-sub">
          nsh pipes structured data — not raw bytes. Filter, sort, and query
          your filesystem and history with SQL-like clarity.
        </p>
        <div class="hero-actions">
          <a routerLink="/docs/overview" class="btn btn-primary">
            <span>Read the Docs</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a routerLink="/docs/commands" class="btn btn-ghost">View Commands</a>
        </div>

        <!-- Terminal mockup -->
        <div class="hero-terminal terminal">
          <div class="terminal-bar">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
            <span class="terminal-title">nsh — ~/projects</span>
          </div>
          <div class="terminal-body">
            <div class="term-line">
              <span class="prompt">alice:~/projects (main) $&nbsp;</span><span class="cmd typed-cmd">{{ typingState.displayText }}</span><span class="cursor" [class.blink]="typingState.cursor">▋</span>
            </div>
            <!-- Output display commented out — typing animation only
            <div class="term-output" *ngIf="showOutput">
              <span class="output output-header">  name              size      modified             type</span>
              <span class="output output-sep">  ────────────────  ────────  ───────────────────  ────</span>
              <span class="output"><span class="highlight">  executor.c</span>        <span class="string-val"> 14.2 KB</span>   2024-11-03 14:30     file</span>
              <span class="output"><span class="highlight">  parser.c</span>          <span class="string-val">  8.1 KB</span>   2024-11-03 14:28     file</span>
              <span class="output"><span class="highlight">  main.c</span>            <span class="string-val">  4.2 KB</span>   2024-11-01 09:12     file</span>
              <span class="output output-count">  3 rows</span>
            </div>
            -->
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="section features-section" #featuresSection>
      <div class="container">
        <div class="section-header">
          <span class="section-label">Core concepts</span>
          <h2 class="section-title">Built differently</h2>
          <p class="section-sub">Every design decision flows from one idea: your shell should understand <em>structure</em>.</p>
        </div>
        <div class="features-grid animate-stagger">
          <div class="feature-card">
            <div class="feature-icon-wrap purple">
              <span class="feature-icon">⬡</span>
            </div>
            <h3>Typed Pipelines</h3>
            <p>Every command returns a table with named, typed columns. Pipe into <code>where</code>, <code>sort-by</code>, and <code>select</code> without touching <code>awk</code> or <code>sed</code>.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon-wrap cyan">
              <span class="feature-icon">▦</span>
            </div>
            <h3>Structured Output</h3>
            <p><code>ls</code>, <code>env</code>, <code>history</code>, and <code>jobs</code> all produce tables with consistent schemas — query them with the same operators.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon-wrap green">
              <span class="feature-icon">◉</span>
            </div>
            <h3>SQLite History</h3>
            <p>Command history is stored in SQLite — not a flat file. Filter by exit code, duration, time range, or directory. Never lose a command again.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon-wrap orange">
              <span class="feature-icon">◐</span>
            </div>
            <h3>ShellEnv</h3>
            <p>Per-directory <code>.shellenv</code> files auto-load on <code>cd</code>, auto-unload on leave. No <code>direnv</code> needed — it's built in.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon-wrap purple">
              <span class="feature-icon">&#123; &#125;</span>
            </div>
            <h3>Full Scripting</h3>
            <p>Variables, functions (<code>def</code>), <code>if&#47;else</code>, <code>for</code>, <code>while</code>, <code>break</code>, <code>return</code>. Same syntax in scripts as in the REPL.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon-wrap cyan">
              <span class="feature-icon">⟳</span>
            </div>
            <h3>Session Replay</h3>
            <p>Record every session. Replay any past session interactively or in dry-run mode. <code>replay --dry-run</code> previews before executing.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- QUICK EXAMPLE -->
    <section class="section example-section" #exampleSection>
      <div class="container">
        <div class="section-header">
          <span class="section-label">Side by side</span>
          <h2 class="section-title">nsh vs Bash</h2>
          <p class="section-sub">The same task. See the difference structured data makes.</p>
        </div>
        <div class="compare-grid">
          <div class="compare-card bash-card">
            <div class="compare-label">
              <span class="label-dot red-dot"></span>
              Bash
            </div>
            <div class="terminal">
              <div class="terminal-bar">
                <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
                <span class="terminal-title">bash</span>
              </div>
              <div class="terminal-body">
                <div class="term-line">
                  <span class="prompt">$ </span><span class="cmd">ls -la | sort -k5 -n -r | head -5 | awk '&#123;print $9, $5&#125;'</span>
                </div>
                <span class="output">executor.c 14567</span>
                <span class="output">parser.c 8312</span>
                <span class="output">main.c 4198</span>
                <span class="output">render.c 3891</span>
                <span class="output">lexer.c 3204</span>
              </div>
            </div>
            <div class="compare-issues">
              <span class="issue">⚠ Fragile column index <code>$5</code>, <code>$9</code></span>
              <span class="issue">⚠ <code>-k5 -n</code> magic flags for "numeric sort column 5"</span>
              <span class="issue">⚠ Breaks if filename contains spaces</span>
            </div>
          </div>

          <div class="compare-divider">
            <div class="vs-badge">VS</div>
          </div>

          <div class="compare-card nsh-card">
            <div class="compare-label">
              <span class="label-dot green-dot"></span>
              nsh
            </div>
            <div class="terminal">
              <div class="terminal-bar">
                <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
                <span class="terminal-title">nsh</span>
              </div>
              <div class="terminal-body">
                <div class="term-line">
                  <span class="prompt">$ </span>
                  <span class="cmd">ls | sort-by size --desc | first 5 | select name size</span>
                </div>
                <span class="output output-header">  name          size</span>
                <span class="output output-sep">  ────────────  ───────</span>
                <span class="output"><span class="highlight">  executor.c</span>    <span class="string-val">14.2 KB</span></span>
                <span class="output"><span class="highlight">  parser.c</span>      <span class="string-val"> 8.1 KB</span></span>
                <span class="output"><span class="highlight">  main.c</span>        <span class="string-val"> 4.2 KB</span></span>
                <span class="output"><span class="highlight">  render.c</span>      <span class="string-val"> 3.8 KB</span></span>
                <span class="output"><span class="highlight">  lexer.c</span>       <span class="string-val"> 3.2 KB</span></span>
              </div>
            </div>
            <div class="compare-wins">
              <span class="win">✓ Named columns — no index magic</span>
              <span class="win">✓ Human-readable sizes (KB, MB)</span>
              <span class="win">✓ Space-safe — data, not text</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- COMMANDS SHOWCASE -->
    <section class="section commands-section" #commandsSection>
      <div class="container">
        <div class="section-header">
          <span class="section-label">Quick reference</span>
          <h2 class="section-title">Key commands</h2>
        </div>
        <div class="cards-grid animate-stagger">
          <app-command-card
            *ngFor="let cmd of commands"
            [icon]="cmd.icon"
            [name]="cmd.name"
            [description]="cmd.description"
            [example]="cmd.example">
          </app-command-card>
        </div>
        <div class="see-all">
          <a routerLink="/docs/commands" class="btn btn-ghost">
            See all commands →
          </a>
        </div>
      </div>
    </section>

    <!-- INSTALL -->
    <section class="section install-section" #installSection>
      <div class="container">
        <div class="install-card">
          <div class="install-left">
            <span class="section-label">Get started</span>
            <h2>Install nsh</h2>
            <p>Native installer for Windows. Build from source on macOS and Linux — depends only on readline and SQLite.</p>
            <div class="install-ctas">
              <a routerLink="/docs/windows" class="btn btn-primary">Windows installer →</a>
              <a routerLink="/docs/overview" class="btn btn-ghost">Build from source →</a>
            </div>
          </div>
          <div class="install-right">
            <div class="install-tabs">
              <div class="install-tab">
                <div class="install-tab-label">
                  <span class="tab-os-icon">⊞</span> Windows
                </div>
                <div class="terminal">
                  <div class="terminal-bar">
                    <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
                    <span class="terminal-title">nsh-setup.exe</span>
                  </div>
                  <div class="terminal-body">
                    <span class="output">1. Download nsh-setup.exe from Releases</span>
                    <span class="output">2. Run the installer wizard</span>
                    <span class="output">3. Open <span class="highlight">nsh Terminal</span> from Start Menu</span>
                    <div class="term-line" style="margin-top:8px"><span class="prompt accent">nsh:/cygdrive/c/Users/you$&nbsp;</span><span class="cmd cursor-inline">▋</span></div>
                  </div>
                </div>
              </div>
              <div class="install-tab">
                <div class="install-tab-label">
                  <span class="tab-os-icon">⌘</span> macOS / Linux
                </div>
                <div class="terminal">
                  <div class="terminal-bar">
                    <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
                    <span class="terminal-title">terminal</span>
                  </div>
                  <div class="terminal-body">
                    <div class="term-line"><span class="prompt">$ </span><span class="cmd">brew install readline sqlite</span></div>
                    <div class="term-line" style="margin-top:8px"><span class="prompt">$ </span><span class="cmd">git clone https://github.com/codec404/nsh</span></div>
                    <div class="term-line"><span class="prompt">$ </span><span class="cmd">cd nsh && make && sudo make install</span></div>
                    <span class="output highlight">✓ build/nsh ready</span>
                    <div class="term-line" style="margin-top:8px"><span class="prompt accent">alice:~ $&nbsp;</span><span class="cmd cursor-inline">▋</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="site-footer">
      <div class="container">
        <div class="footer-inner">
          <div class="footer-brand">
            <span class="brand-icon">◈</span>
            <span class="brand-name">nsh</span>
            <p>A Unix shell that thinks in tables.</p>
          </div>
          <div class="footer-links">
            <div class="footer-col">
              <span class="footer-col-title">Documentation</span>
              <a routerLink="/docs/overview">Overview</a>
              <a routerLink="/docs/commands">Commands</a>
              <a routerLink="/docs/scripting">Scripting</a>
              <a routerLink="/docs/vs-bash">vs Bash</a>
              <a routerLink="/docs/config">Configuration</a>
              <a routerLink="/docs/shellenv">ShellEnv</a>
            </div>
            <div class="footer-col">
              <span class="footer-col-title">Project</span>
              <a href="https://github.com/codec404/nsh" target="_blank">GitHub</a>
              <a href="https://github.com/codec404/nsh/issues" target="_blank">Issues</a>
              <a href="https://github.com/codec404/nsh/releases" target="_blank">Releases</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>Built with nsh · MIT License</span>
          <span class="footer-tag">◈ nsh — pipes that think</span>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('featuresSection') featuresSection!: ElementRef;
  @ViewChild('exampleSection') exampleSection!: ElementRef;
  @ViewChild('commandsSection') commandsSection!: ElementRef;
  @ViewChild('installSection') installSection!: ElementRef;

  typingState: TypingState = { displayText: '', cursor: true, phase: 'typing' };
  showOutput = false;

  private commands_list = [
    'ls | sort-by size --desc | first 5',
    'history --since 1h | where exit_code != 0',
    'env | where name =~ "PATH" | get value',
    'ls | where type == "file" | count',
    'sessions | sort-by start --desc | first 3',
    'ls *.c | sort-by modified | last 3',
  ];
  private cmdIndex = 0;
  private charIndex = 0;
  private typingTimer: ReturnType<typeof setTimeout> | null = null;
  private observer: IntersectionObserver | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  commands = [
    { icon: '📂', name: 'ls',       description: 'List directory as a typed table with name, size, modified, type columns.', example: 'ls | where size > 10kb | sort-by size' },
    { icon: '⚙',  name: 'where',   description: 'Filter table rows by a condition. Supports ==, !=, >, <, =~ regex.', example: 'ls | where name =~ "\\.c$"' },
    { icon: '↕',  name: 'sort-by', description: 'Sort table rows by a named column, ascending or descending.', example: 'history | sort-by duration_ms --desc' },
    { icon: '🕐', name: 'history', description: 'Query SQLite-backed command history. Filter by time, exit code, directory.', example: 'history --since 2d --failed' },
    { icon: '◐',  name: 'shellenv',description: 'Manage per-directory .shellenv files. Auto-loaded on cd.', example: 'shellenv diff ~/other-project' },
    { icon: '↺',  name: 'replay',  description: 'Replay commands from any recorded session interactively or as dry-run.', example: 'replay --session 42 --dry-run' },
  ];

  ngOnInit() { this.startTyping(); }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.typingTimer) clearTimeout(this.typingTimer);
    if (this.observer) this.observer.disconnect();
  }

  private startTyping() {
    this.typingState.phase = 'typing';
    this.typingState.displayText = '';
    this.charIndex = 0;
    this.showOutput = false;
    this.typeNext();
  }

  private typeNext() {
    const target = this.commands_list[this.cmdIndex];
    if (this.typingState.phase === 'typing') {
      if (this.charIndex < target.length) {
        this.typingState.displayText = target.slice(0, ++this.charIndex);
        this.cdr.markForCheck();
        // Natural typing: slower at start of word, faster mid-word
        const delay = 45 + Math.random() * 40 + (target[this.charIndex - 1] === ' ' ? 60 : 0);
        this.typingTimer = setTimeout(() => this.typeNext(), delay);
      } else {
        this.typingState.phase = 'holding';
        this.showOutput = true;
        this.cdr.markForCheck();
        this.typingTimer = setTimeout(() => this.typeNext(), 2800);
      }
    } else if (this.typingState.phase === 'holding') {
      this.typingState.phase = 'erasing';
      this.showOutput = false;
      this.cdr.markForCheck();
      this.typingTimer = setTimeout(() => this.typeNext(), 100);
    } else {
      if (this.typingState.displayText.length > 0) {
        this.typingState.displayText = this.typingState.displayText.slice(0, -1);
        this.cdr.markForCheck();
        this.typingTimer = setTimeout(() => this.typeNext(), 22);
      } else {
        this.cmdIndex = (this.cmdIndex + 1) % this.commands_list.length;
        this.typingTimer = setTimeout(() => this.startTyping(), 400);
      }
    }
  }

  private setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add('in-view');
            // Stagger children
            const children = el.querySelectorAll<HTMLElement>('.feature-card, .compare-card, app-command-card');
            children.forEach((child, i) => {
              child.style.transitionDelay = `${i * 80}ms`;
              child.classList.add('in-view');
            });
            this.observer!.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    [this.featuresSection, this.exampleSection, this.commandsSection, this.installSection]
      .filter(r => r)
      .forEach(r => this.observer!.observe(r.nativeElement));
  }
}
