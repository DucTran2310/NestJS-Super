# Hướng dẫn cấu hình dự án NestJS chuẩn hóa với Prettier, ESLint, TypeScript, Nodemon

## 1. Cài đặt các package cần thiết

Cài đặt các package sau để chuẩn hóa code, hỗ trợ build và phát triển:

- **prettier**: Trình định dạng mã nguồn (code formatter) chính.
- **eslint-config-prettier**: Cấu hình ESLint để tránh xung đột với Prettier.
- **eslint-plugin-prettier**: Thêm các rule của Prettier vào ESLint.
- **tsx**: Chạy trực tiếp file TypeScript mà không cần build.
- **tsc-alias**: Xử lý alias khi build với TypeScript.
- **rimraf**: Xóa thư mục `dist` trước khi build lại.
- **nodemon**: Tự động restart server khi code thay đổi.

**Cài đặt bằng lệnh:**

```sh
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier tsx tsc-alias rimraf nodemon
```

---

## 2. Cấu hình TypeScript (`tsconfig.json`)

Tạo file `tsconfig.json` ở thư mục gốc dự án. Nội dung mẫu:

```json
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "target": "ES2023",
    "outDir": "dist",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    }
  },
  "files": ["src/type.d.ts"],
  "include": ["src/**/*"]
}
```

**Giải thích:**

- `module`, `moduleResolution`: Chuẩn module cho Node.js hiện đại.
- `target`: Chuẩn ECMAScript cho code output.
- `outDir`: Thư mục chứa file build.
- `baseUrl`, `paths`: Thiết lập alias cho import.
- `files`: Định nghĩa các file type global.
- `include`: Chỉ định các file cần build.

---

## 3. Cấu hình ESLint (`eslint.config.mjs`)

**Bước 1:** Import plugin Prettier vào đầu file:

```js
import eslintPluginPrettier from 'eslint-plugin-prettier'
```

**Bước 2:** Thêm cấu hình sau vào array export default:

```js
{
  plugins: {
    prettier: eslintPluginPrettier
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: false,
        trailingComma: 'none',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 120,
        jsxSingleQuote: true
      }
    ]
  },
  ignores: ['**/node_modules/', '**/dist/']
}
```

**Giải thích:**

- Cảnh báo khi dùng `any` hoặc biến không dùng.
- Rule Prettier đồng bộ với file `.prettierrc`.
- Bỏ qua thư mục `node_modules` và `dist`.

---

## 4. Cấu hình Prettier

### Tạo file `.prettierrc` ở thư mục gốc

```json
{
  "arrowParens": "always",
  "semi": false,
  "trailingComma": "none",
  "tabWidth": 2,
  "endOfLine": "auto",
  "useTabs": false,
  "singleQuote": true,
  "printWidth": 120,
  "jsxSingleQuote": true
}
```

### Tạo file `.prettierignore` ở thư mục gốc

```
node_modules/
dist/
```

**Giải thích:** Bỏ qua các file/thư mục không cần format.

---

## 5. Cấu hình Editor (`.editorconfig`)

Tạo file `.editorconfig` ở thư mục gốc:

```
[*]
indent_size = 2
indent_style = space
```

**Lưu ý:** Cài extension [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) để VS Code nhận diện file này.

---

## 6. Cấu hình Git (`.gitignore`)

Tạo file `.gitignore` ở thư mục gốc:

```
node_modules/
dist/
```

**Giải thích:** Không đẩy các file build và thư viện lên git.

---

## 7. Cấu hình Nodemon (`nodemon.json`)

Tạo file `nodemon.json` ở thư mục gốc:

```json
{
  "watch": ["src", ".env"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "tsx ./src/index.ts"
}
```

**Giải thích:** Tự động restart server khi thay đổi file trong `src` hoặc `.env`.

---

## 8. Cấu hình script trong `package.json`

Thêm vào phần `"scripts"` trong `package.json`:

```json
"scripts": {
  "dev": "npx nodemon",
  "build": "rimraf ./dist && tsc && tsc-alias",
  "start": "node dist/index.js",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "prettier": "prettier --check .",
  "prettier:fix": "prettier --write ."
}
```

**Giải thích:**

- `dev`: Chạy server ở chế độ phát triển.
- `build`: Xóa dist, build lại, xử lý alias.
- `start`: Chạy file build.
- `lint`, `lint:fix`: Kiểm tra và sửa lỗi lint.
- `prettier`, `prettier:fix`: Kiểm tra và sửa format code.

---

## 9. Tạo file type global (`src/type.d.ts`)

Tạo file `type.d.ts` trong thư mục `src`. Hiện tại có thể để trống, dùng để định nghĩa các kiểu dữ liệu global cho dự án.

---

## 10. Tạo file khởi động (`src/index.ts`)

Tạo file `index.ts` trong thư mục `src` với nội dung mẫu:

```ts
const name: string = 'AdStar-Tran'
console.log(name)
```

---

## Tổng kết

Sau khi hoàn thành các bước trên, dự án của bạn đã được chuẩn hóa về cấu trúc, code style, lint, format và quy trình build. Đảm bảo code sạch, dễ bảo trì và đồng bộ giữa các thành viên trong team.
