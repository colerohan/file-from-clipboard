import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs/promises';

export function activate(ctx: vscode.ExtensionContext) {
  const cmd = vscode.commands.registerCommand(
    'fileFromClipboard.create',
    async (uri: vscode.Uri) => {
      const clip = await vscode.env.clipboard.readText();
      if (!clip) {
        return vscode.window.showWarningMessage('Clipboard is empty.');
      }

      // 1. Try header-comment naming
      const extracted = extractName(clip);

      // 2. Decide filename & preview it like Xcode does
      let fileName: string | undefined;

      if (extracted) {
        // Show a QuickPick to confirm the derived name
        const choice = await vscode.window.showQuickPick(
          [`Create ${extracted}`],
          { placeHolder: 'Confirm new file name' }
        );
        if (!choice) { return; }      // user cancelled
        fileName = extracted;
      } else {
        // No header comment → prompt with heuristic default
        fileName = await vscode.window.showInputBox({
          prompt: 'New file name',
          value: guessName(clip),
          validateInput: t => t.trim() ? null : 'Name required'
        });
        if (!fileName) { return; }    // user cancelled
      }

      // 3. Write file (strip header if it matched)
      const target = path.join(uri.fsPath, fileName);
      const body = (extracted && fileName === extracted)
        ? clip.split(/\r?\n/).slice(1).join('\n')   // remove first line
        : clip;

      await fs.writeFile(target, body, { encoding: 'utf8', flag: 'wx' });

      const doc = await vscode.workspace.openTextDocument(target);
      vscode.window.showTextDocument(doc);
    }
  );
  ctx.subscriptions.push(cmd);
}

function extractName(text: string): string | null {
  const first = text.split(/\r?\n/, 1)[0];
  const m = first.match(/^\s*(?:#|\/\/|--|;)\s*([\w.\-]+\.[\w]+)/);
  return m ? m[1] : null;
}

function guessName(txt: string): string {
  if (/^\s*<(!doctype )?html/i.test(txt)) return 'index.html';
  if (/^\s*#\!\/usr\/bin\/env node/.test(txt)) return 'script.js';
  if (/^\s*{\s*"/.test(txt))              return 'data.json';
  return 'untitled.txt';
}

export function deactivate() {}