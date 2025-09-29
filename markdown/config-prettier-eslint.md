Dưới đây là cấu hình Prettier đầy đủ và được trình bày đẹp mắt bằng Markdown:

# 🎨 Prettier Configuration

```json
{
  "arrowParens": "always",
  "bracketSpacing": true,
  "endOfLine": "lf",
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxBracketSameLine": false,
  "jsxSingleQuote": false,
  "printWidth": 80,
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false,
  "vueIndentScriptAndStyle": false
}
```

## 📋 Giải thích chi tiết các tùy chọn

### 🏹 **Arrow Functions**

```json
"arrowParens": "always"
```

- `"always"`: Luôn sử dụng dấu ngoặc đơn `(x) => x`
- `"avoid"`: Bỏ ngoặc đơn khi có một tham số `x => x`

### 📐 **Định dạng Tab & Khoảng cách**

```json
{
  "useTabs": false,
  "tabWidth": 2,
  "bracketSpacing": true
}
```

- **`useTabs: false`**: Sử dụng dấu cách thay vì tab
- **`tabWidth: 2`**: Số khoảng trắng cho mỗi tab
- **`bracketSpacing: true`**: Thêm khoảng trắng giữa các dấu ngoặc `{ foo: bar }`

### 📏 **Độ dài dòng & Xuống dòng**

```json
{
  "printWidth": 80,
  "proseWrap": "preserve"
}
```

- **`printWidth: 80`**: Giới hạn độ dài dòng để cải thiện khả năng đọc
- **`proseWrap`**: Xử lý xuống dòng cho Markdown

### 🔤 **Định dạng Chuỗi**

```json
{
  "singleQuote": true,
  "jsxSingleQuote": false,
  "semi": true
}
```

- **`singleQuote: true`**: Sử dụng dấu nháy đơn thay vì nháy kép
- **`semi: true`**: Thêm dấu chấm phẩy cuối dòng

### 📁 **Files & Line Endings**

```json
{
  "endOfLine": "lf",
  "insertPragma": false,
  "requirePragma": false
}
```

- **`endOfLine: "lf"`**: Giúp tránh các vấn đề liên quan đến kết thúc dòng khác nhau trên các hệ điều hành
- **`endOfLine` options**: `"lf"` (Unix), `"crlf"` (Windows), `"cr"` (Mac), `"auto"`

### 🔄 **Dấu phẩy cuối**

```json
"trailingComma": "es5"
```

- `"es5"`: Dấu phẩy cuối ở nơi hợp lệ trong ES5
- `"all"`: Dấu phẩy cuối bất cứ khi nào có thể
- `"none"`: Không sử dụng dấu phẩy cuối

## 🚀 **Cài đặt & Sử dụng**

### 1. Cài đặt Prettier

```bash
npm install --save-dev prettier
# hoặc
yarn add --dev prettier
```

### 2. Tạo file cấu hình

```bash
# Tạo file .prettierrc
echo '{ "singleQuote": true, "semi": false }' > .prettierrc

# Hoặc tạo file .prettierrc.json
```

### 3. Chạy Prettier

```bash
# Format tất cả files
npx prettier --write .

# Format specific file
npx prettier --write src/app.js

# Kiểm tra format
npx prettier --check .
```

## 💡 **Mẹo sử dụng**

- Sử dụng với **ESLint** thông qua `eslint-config-prettier`
- Tích hợp với **VS Code** extension để format tự động
- Thêm script vào `package.json`:

```json
{
  "scripts": {
    "format": "prettier --write .",
    "check-format": "prettier --check ."
  }
}
```

Cấu hình này sẽ giúp code của bạn luôn nhất quán và dễ đọc! ✨
