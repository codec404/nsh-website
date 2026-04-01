import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { marked } from 'marked';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DocsService {
  private http = inject(HttpClient);
  private cache = new Map<string, Observable<string>>();

  getDoc(section: string): Observable<string> {
    if (this.cache.has(section)) return this.cache.get(section)!;
    const obs = this.http
      .get(`/assets/docs/${section}.md`, { responseType: 'text' })
      .pipe(
        map(md => marked(md) as string),
        shareReplay(1)
      );
    this.cache.set(section, obs);
    return obs;
  }

  getSections() {
    return [
      { id: 'overview',  label: 'Overview',       icon: '◈' },
      { id: 'commands',  label: 'Commands',        icon: '▶' },
      { id: 'scripting', label: 'Scripting',       icon: '{ }' },
      { id: 'vs-bash',   label: 'vs Bash',         icon: '⚡' },
      { id: 'config',    label: 'Configuration',   icon: '⚙' },
      { id: 'shellenv',  label: 'ShellEnv',        icon: '◐' },
    ];
  }
}
