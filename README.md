# File from Clipboard - Spend less time copying and pasting

| Copy From LLM | Creates Named File WITH Content All in One Go |
|---------|-------------|
| ![File_From_Clip_Demo_OG_FILE](https://github.com/user-attachments/assets/d14e4348-187c-414d-b458-bb4e646961da) | ![Demo_Pasting](https://github.com/user-attachments/assets/86c99bce-e83b-45bf-9ca6-8f60a4d04abb) |

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Paste as New File…** | Right‑click any folder and choose **Paste as New File…**. |
| Auto‑**filename** from header comment | Clipboard starts with `# hello.py` → file auto‑named **hello.py** (header line stripped). |
| Heuristic name + prompt | No header? A filename prompt appears with a smart default (`index.html`, `script.js`, …). |
| Xcode‑style preview | When auto‑naming, a QuickPick shows **“Create hello.py”** for one‑click confirmation. |
| Opens instantly | File is created, opened, and ready to edit—no extra clicks. |

---

## 🚀 Installation

```bash
# download the latest VSIX or clone the repo
code --install-extension file-from-clipboard-<version>.vsix
# or drag‑drop the VSIX onto the Extensions view
```

Reload VS Code / Cursor.  
> Requires **VS Code 1.89+** (Cursor uses the same engine).

---

## 🛠️ Usage

1. **Copy** any text to your clipboard.  
   *Tip:* Put a header comment on the first line, e.g.*

   ```py
   # smoke_test.py
   print("hello clipboard")
   ```

2. In the Explorer sidebar, **right‑click** the target folder → **Paste as New File…**.

   * Header comment present ⇒ QuickPick preview **“Create smoke_test.py”**.  
   * No header ⇒ filename prompt pre‑filled with a heuristic like `untitled.txt`.

3. File is created and opened; start editing.

---

## 🚦 Quick smoke‑test (dev‑host)

```bash
git clone https://github.com/colerohan/file-from-clipboard.git
cd file-from-clipboard
npm install
npm run compile
code . --extensionDevelopmentPath=.   # launches Extension Dev Host
```

In the Dev‑Host window perform the three usage steps above; verify file creation works.

---

## ⚙️ Extension Settings (planned)

| Setting | Default | Purpose |
|---------|---------|---------|
| `fileFromClipboard.removeHeader` | `true` | Strip the header comment from pasted content. |
| `fileFromClipboard.defaultExtension` | `txt` | Fallback extension when no heuristic match. |

---

## 🐞 Known Issues

* Errors if a file with the same name already exists (overwrite logic coming).

---

## 📓 Release Notes

### 0.0.1 — Initial release
* **Paste as New File…** command
* Header comment auto‑naming + Xcode‑style preview
* Heuristic filename + prompt fallback

---

## Contributing

Pull requests welcome!  
Issues & ideas → <https://github.com/colerohan/file-from-clipboard>.

---

**Enjoy!** 🎉
